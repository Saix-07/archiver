import { AtpAgent } from '@atproto/api';
import { z } from 'zod';
import { type Archiver, ArchiverTypes } from './archiver';

const atpAgent = new AtpAgent({
  service: new URL('https://public.api.bsky.app/'),
});

class BlueskyError extends Error {
  override name = 'BlueskyError';
}

export const Bluesky = {
  type: ArchiverTypes.BLUESKY,
  urlPatterns: ['bsky.app', 'vxsky.app'],

  async fetchPostMetadata(postUrl) {
    const post = await getPost(postUrl);

    const { did: authorHandle } = parsePostUrl(postUrl);
    const author = await getAuthorInfo(authorHandle);

    return {
      service: ArchiverTypes.BLUESKY,
      media: [],
      post: {
        postSpoiler: null, // Not supported in bsky
        postBody: post.value.text,
        sourceUrl: postUrl,
      },
      author: {
        name: author.displayName ?? '',
        handle: author.handle,
        authorUrl: `https://bsky.app/profile/${author.handle}`,
      },
    };
  },
} satisfies Archiver;

/**
 * Most posts on Bluesky are public, but if you want to archive a post that has
 * limited visibility, you need to authenticate using an app password.
 *
 * TODO: Add OAuth functionality as well
 */
export async function blueskyLogin(
  input: Pick<Parameters<AtpAgent['login']>[0], 'password' | 'identifier'>,
  agent = atpAgent,
) {
  await agent.login(input);
}

function parsePostUrl(urlString: string): { did: string; rkey: string } {
  // BSKY Urls: https://bsky.app/profile/<DID>/post/<RKEY>
  const bskyUrlSchema = z
    .string()
    .transform(urlStr => new URL(urlStr))
    .refine(url => /^\/profile\/[a-zA-Z0-9.]+(?!ad)\/post\/[a-zA-Z0-9]+\/?$/g.test(url.pathname), {
      message: 'Not a valid Bsky URL!',
    })
    .transform(url => url.pathname.split('/').slice(1, 5) as ['profile', string, 'post', string]);

  const [, did, , rkey] = bskyUrlSchema.parse(urlString);

  return {
    did,
    rkey,
  };
}

export async function getPost(url: string, agent = atpAgent) {
  const { did, rkey } = parsePostUrl(url);

  const post = await agent.getPost({
    repo: did,
    rkey,
  });

  console.log(post);
  return post;
}

async function getAuthorInfo(actor: string, agent = atpAgent) {
  const response = await agent.getProfile({
    actor,
  });

  if (!response.success) {
    throw new BlueskyError("Can't resolve author from post!");
  }

  console.log(response.data);

  return response.data;
}
