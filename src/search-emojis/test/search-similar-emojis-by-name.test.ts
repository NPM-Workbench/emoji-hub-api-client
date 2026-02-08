/// <reference types="jest" />
import { searchSimilarEmojisByName } from '../search-similar-emojis-by-name.js';

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe('Search Similar Emojis By Name', () => {
  const originalFetch = (global as any).fetch;
  const originalConsoleError = console.error;

  afterEach(() => {
    if (originalFetch) (global as any).fetch = originalFetch;
    else delete (global as any).fetch;
    console.error = originalConsoleError;
    jest.restoreAllMocks();
  });

  /* #1 */
  test('returns api-fail when query is empty', async () => {
    console.error = jest.fn();

    await expect(searchSimilarEmojisByName({ query: '' })).resolves.toEqual({
      code: 'api-fail',
      message: 'Search Similar Emoji(s) By Name: Encountered Error!',
      payload: null,
    });
  });

  /* #2 */
  test('returns api-fail when fetch response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue([]),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);
    console.error = jest.fn();

    await expect(
      searchSimilarEmojisByName({ query: 'smile' }),
    ).resolves.toEqual({
      code: 'api-fail',
      message: 'Search Similar Emoji(s) By Name: Encountered Error!',
      payload: null,
    });
  });

  /* #3 */
  test('returns payload when response ok', async () => {
    const mockPayload = [
      { name: 'grinning face', category: 'smileys', group: 'face-smiling' },
      { name: 'smiling face', category: 'smileys', group: 'face-smiling' },
    ];
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockPayload),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      searchSimilarEmojisByName({ query: 'smile' }),
    ).resolves.toEqual({
      code: 'api-ok',
      message: 'No errors encountered',
      payload: {
        results: mockPayload,
        totalResults: mockPayload.length,
      },
    });
  });

  /* #4 */
  test('targets the emoji similar search endpoint with encoded query', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue([]),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await searchSimilarEmojisByName({ query: 'smile face' });
    expect((global as any).fetch).toHaveBeenCalledWith(
      'https://emojihub.yurace.pro/api/similar/smile%20face',
    );
  });
});
