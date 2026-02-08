/// <reference types="jest" />
import { getRandomEmojiByCategory } from '../get-random-by-category.js';

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe('Get Random Emoji By Category', () => {
  const originalFetch = (global as any).fetch;
  const originalConsoleError = console.error;

  afterEach(() => {
    if (originalFetch) (global as any).fetch = originalFetch;
    else delete (global as any).fetch;
    console.error = originalConsoleError;
    jest.restoreAllMocks();
  });

  /* #1 */
  test('returns api-fail when fetch response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue({}),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);
    console.error = jest.fn();

    await expect(
      getRandomEmojiByCategory({ category: 'smileys' }),
    ).resolves.toEqual({
      code: 'api-fail',
      message: 'Get Random Emoji By Category: Encountered Error!',
      payload: null,
    });
  });

  /* #2 */
  test('returns payload when response ok', async () => {
    const mockPayload = {
      name: 'grinning face',
      category: 'smileys',
      group: 'face-smiling',
    };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockPayload),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      getRandomEmojiByCategory({ category: 'smileys' }),
    ).resolves.toEqual({
      code: 'api-ok',
      message: 'No errors encountered',
      payload: mockPayload,
    });
  });

  /* #3 */
  test('targets the random emoji by category endpoint', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getRandomEmojiByCategory({ category: 'smileys' });
    expect((global as any).fetch).toHaveBeenCalledWith(
      'https://emojihub.yurace.pro/api/random/category/smileys',
    );
  });
});
