import { ArchiverTypes, type Archiver } from './archiver';

export const Bluesky = {
  type: ArchiverTypes.BLUESKY,
  urlPatterns: ['bsky.app', 'vxsky.app'],

  async fetchPostMetadata(postUrl) {
    return {
      service: ArchiverTypes.BLUESKY,
      media: [],
      author: {
        name: 'asdf',
        authorUrl: postUrl,
      },
    };
  },
} satisfies Archiver;
