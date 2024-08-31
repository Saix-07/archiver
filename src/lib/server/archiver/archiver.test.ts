import { describe, it, expect } from 'vitest';
import { selectArchiver } from './archiver';

const TestArchiver = {
  type: 'TWITTER' as const,
  fetchPostMetadata: async () => {
    return {
      service: 'TWITTER' as const,
      media: [],
      author: {
        name: 'asdf',
        authorUrl: '',
      },
    };
  },
};

describe('selectArchiver tests', () => {
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
        urlPatterns: /twit.*\.com/,
      },
    ]);

    expect(archiver?.type).not.toBeUndefined();
  });

  it('Should work for an array of strings and RegExps', async () => {
    const archiver = await selectArchiver('https://twitter.com/test/post', [
      {
        ...TestArchiver,
        urlPatterns: ['twitter.com', /this shouldnt match/],
      },
    ]);

    expect(archiver?.type).not.toBeUndefined();
  });
});
