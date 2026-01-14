import { TEmoji, TAPIResponse } from "./index.js";

export type TRandomEmojiResponse = TAPIResponse & { payload: null | TEmoji };
