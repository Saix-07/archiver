import { getVaults } from '$lib/server/prisma/vaults';
import type { PageServerLoad } from './$types';
import { Bluesky, getPost } from '$lib/server/archiver/bluesky';
import { createPost } from '$lib/server/prisma/posts';

export const load = (() => {
  return {
    vaults: getVaults(),
    post: Bluesky.fetchPostMetadata('https://bsky.app/profile/bigstinky.dog/post/3l5sp52ohzy2f/'),
  };
}) satisfies PageServerLoad;

export const createPostFromBskyURL = async (postUrl: string) => {
  const { author, media, post, service } = await Bluesky.fetchPostMetadata(postUrl);

  await createPost({
    postBody: post.postBody,
    postSpoiler: post.postSpoiler,
    author: {
      connect: {
        id: 1,
      },
    },
    vault: {
      connect: {
        id: 1,
      },
    },
  });
};
