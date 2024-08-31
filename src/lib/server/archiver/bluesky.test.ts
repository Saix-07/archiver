import { describe, it, expect } from 'vitest';
import { Bluesky } from './bluesky';
import { selectArchiver } from './archiver';

describe('Archiver: Bluesky', () => {
  it('Should recognize valid Bluesky URLs', async () => {
    const maybeBluesky = await selectArchiver('https://bsky.app/awdawdaw', [Bluesky]);
    expect(maybeBluesky?.type).toEqual(Bluesky.type);
  });

  it('Should work for vxsky URLs', async () => {
    const maybeBluesky = await selectArchiver('https://vxsky.app/adad', [Bluesky]);
    expect(maybeBluesky?.type).toEqual(Bluesky.type);
  });

  it('Should not match non-bluesky URLs', async () => {
    const shouldntBeBluesky = await selectArchiver('https://theskyisblue.app', [Bluesky]);
    expect(shouldntBeBluesky?.type).toBe(undefined);

    const shouldntBeBluesky2 = await selectArchiver('https://vxtwitter.com/adawdawd', [Bluesky]);
    expect(shouldntBeBluesky2?.type).toBe(undefined);
  });
});
