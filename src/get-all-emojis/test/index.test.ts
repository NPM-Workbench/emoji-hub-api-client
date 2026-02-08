/// <reference types="jest" />
import { getAllEmojis } from '../index.js';

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe('Get All Emojis', () => {
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

    await expect(getAllEmojis()).resolves.toEqual({
      code: 'api-fail',
      message: 'Get All Emoji: Encountered Error!',
      payload: null,
    });
  });

  /* #2 */
  test('returns payload when response ok', async () => {
    const mockPayload = [
      { name: 'grinning face', category: 'smileys', group: 'face-smiling' },
      {
        name: 'thumbs up',
        category: 'people-body',
        group: 'hand-fingers-closed',
      },
      { name: 'red heart', category: 'smileys', group: 'emotion' },
    ];
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockPayload),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getAllEmojis()).resolves.toEqual({
      code: 'api-ok',
      message: 'No errors encountered',
      payload: mockPayload,
    });
  });

  /* #3 */
  test('targets the emoji all endpoint', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue([]),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getAllEmojis();
    expect((global as any).fetch).toHaveBeenCalledWith(
      'https://emojihub.yurace.pro/api/all',
    );
  });
});
