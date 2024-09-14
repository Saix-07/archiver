import type { Media, PostAuthor } from '@prisma/client';

export const ArchiverTypes = {
  TWITTER: 'TWITTER',
  BLUESKY: 'BLUESKY',
  MASTODON: 'MASTODON',
} as const;

export type ArchiverType = (typeof ArchiverTypes)[keyof typeof ArchiverTypes];

export interface ArchiverResult {
  service: ArchiverType;

  media: (Pick<Media, 'mediaType'> & {
    resourceUrl: string;
  })[];

  author: Pick<PostAuthor, 'name'> & {
    authorUrl: string;
  };
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
