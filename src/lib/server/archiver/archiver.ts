import type { Prisma, Post, Media, PostAuthor } from '@prisma/client';
import { prismaClient } from '../prisma';
import { getPostAuthorIdFromHandle } from '../prisma/post-authors';

export const ArchiverTypes = {
  TWITTER: 'TWITTER',
  BLUESKY: 'BLUESKY',
  MASTODON: 'MASTODON',
} as const;

export type ArchiverType = (typeof ArchiverTypes)[keyof typeof ArchiverTypes];

type PostResult = Pick<Post, 'sourceUrl' | 'postBody' | 'postSpoiler'>;
type MediaResult = Pick<Media, 'mediaType'> & {
  resourceUrl: string;
};
type AuthorResult = Pick<PostAuthor, 'name'> & {
  handle: string;
  authorUrl: string;
};

export interface ArchiverResult {
  service: ArchiverType;
  author: AuthorResult;
  post?: PostResult;
  media?: MediaResult[];
}

export type ArchiverMediaResult = Pick<Media, 'fileSlug' | 'mediaType'>;

export interface Archiver {
  type: ArchiverType;

  urlPatterns?: string | RegExp | (string | RegExp)[];
  canArchiveUrl?: (url: string) => Promise<boolean> | boolean;

  fetchPostMetadata: (url: string) => Promise<ArchiverResult>;
  downloadPostMedia?: (metadata: ArchiverResult) => Promise<ArchiverMediaResult[]>;
}

export const DEFAULT_ARCHIVERS: Archiver[] = [];

export async function selectArchiver(
  postUrl: string,
  archiverOptions = DEFAULT_ARCHIVERS,
): Promise<Archiver | undefined> {
  for (const archiver of archiverOptions) {
    if (Array.isArray(archiver.urlPatterns)) {
      for (const pattern of archiver.urlPatterns) {
        if (typeof pattern === 'string') {
          // TODO
        } else if (pattern instanceof RegExp && pattern.test(postUrl)) {
          return archiver;
        }
      }
    } else if (typeof archiver.urlPatterns === 'string') {
      // TODO
    } else if (archiver.urlPatterns instanceof RegExp && archiver.urlPatterns.test(postUrl)) {
      return archiver;
    }

    if (await archiver.canArchiveUrl?.(postUrl)) {
      return archiver;
    }
  }

  return undefined;
}

async function archivePost(postUrl: string, archivers = DEFAULT_ARCHIVERS) {
  const archiver = await selectArchiver(postUrl, archivers);
  if (!archiver) {
    throw new Error('Could not resolve service from the provided URL!');
  }

  const { author, service, media, post } = await archiver.fetchPostMetadata(postUrl);
  const postAuthorId = (await getPostAuthorIdFromHandle(author.handle))?.id;

  if (!postAuthorId) {
    throw new Error('Unknown author information!');
  }

  await prismaClient.post.create({
    data: {
      vaultId: 1,
      postBody: post?.postBody,
      postSpoiler: post?.postSpoiler,
      sourceUrl: post?.sourceUrl,
      postAuthorId,
    },
  });
}
