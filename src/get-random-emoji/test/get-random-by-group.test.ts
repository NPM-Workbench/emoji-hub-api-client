/// <reference types="jest" />
import { getRandomEmojiByGroup } from '../get-random-by-group.js';

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe('Get Random Emoji By Group', () => {
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
      getRandomEmojiByGroup({ group: 'face-smiling' }),
    ).resolves.toEqual({
      code: 'api-fail',
      message: 'Get Random Emoji By Group: Encountered Error!',
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
      getRandomEmojiByGroup({ group: 'face-smiling' }),
    ).resolves.toEqual({
      code: 'api-ok',
      message: 'No errors encountered',
      payload: mockPayload,
    });
  });

  /* #3 */
  test('targets the random emoji by group endpoint', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getRandomEmojiByGroup({ group: 'face-smiling' });
    expect((global as any).fetch).toHaveBeenCalledWith(
      'https://emojihub.yurace.pro/api/random/group/face-smiling',
    );
  });
});
