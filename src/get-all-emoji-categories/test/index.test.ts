/// <reference types="jest" />
import { getAllEmojiCategories } from '../index.js';

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe('Get All Emoji Categories', () => {
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
      json: jest.fn().mockResolvedValue([]),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);
    console.error = jest.fn();

    await expect(getAllEmojiCategories()).resolves.toEqual({
      code: 'api-fail',
      message: 'Get All Emoji Categories: Encountered Error!',
      payload: null,
    });
  });

  /* #2 */
  test('returns payload when response ok', async () => {
    const mockPayload = ['smileys', 'animals-and-nature'];
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockPayload),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getAllEmojiCategories()).resolves.toEqual({
      code: 'api-ok',
      message: 'No errors encountered',
      payload: { categories: mockPayload },
    });
  });

  /* #3 */
  test('targets the emoji categories endpoint', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue([]),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getAllEmojiCategories();
    expect((global as any).fetch).toHaveBeenCalledWith(
      'https://emojihub.yurace.pro/api/categories',
    );
  });
});
