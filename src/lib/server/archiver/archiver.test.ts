import { describe, expect, it } from 'vitest';
import { type Archiver, selectArchiver } from './archiver';

const TestArchiver = {
  type: 'TWITTER' as const,
  fetchPostMetadata: async () => {
    return {
      service: 'TWITTER' as const,
      media: [],
      post: {
        postBody: '',
        postSpoiler: '',
        sourceUrl: '',
      },
      author: {
        name: 'asdf',
        authorUrl: '',
        handle: '',
      },
    };
  },
} satisfies Omit<Archiver, 'urlPatterns'>;

const twitStar = /twit.*\.com/;
const thisShouldntMatch = /this shouldnt match/;

describe.skip('selectArchiver tests', () => {
  it('Should work for a single string', async () => {
    const archiver = await selectArchiver('https://twitter.com/test/post', [
      {
        ...TestArchiver,
        urlPatterns: 'twitter.com',
      },
    ]);

    expect(archiver?.type).not.toBeUndefined();
  });

  it('Should work for a single RegExp', async () => {
    const archiver = await selectArchiver('https://twitter.com/test/post', [
      {
        ...TestArchiver,
        urlPatterns: twitStar,
      },
    ]);

    expect(archiver?.type).not.toBeUndefined();
  });

  it('Should work for an array of strings and RegExps', async () => {
    const archiver = await selectArchiver('https://twitter.com/test/post', [
      {
        ...TestArchiver,
        urlPatterns: ['twitter.com', thisShouldntMatch],
      },
    ]);

    expect(archiver?.type).not.toBeUndefined();
  });
});
