/* app imports */
import { API_BASE_URL } from "../shared/index.js";
import { TRandomEmoji, TAPIResponse } from "../types/index.js";

/* types */ 
type TRandomEmojiResponse = TAPIResponse & { payload: null | TRandomEmoji };

/* module */ 
async function getRandomEmoji(): Promise<TRandomEmojiResponse> {
    try {
        /* setup and fetch */
        const API_URL = `${API_BASE_URL}/api/random`;
        const response = await fetch(API_URL);

        /* check and return */
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const emoji = await response.json();
            return {
                code: "api-ok",
                message: "No errors encountered",
                payload: emoji
            }
        }
    } catch (error) {
        console.error(error);
        return {
            code: "api-fail",
            message: "Get Random Emoji: Encountered Error!",
            payload: null
        }
    }
}

/* exports */ 
export type { TRandomEmojiResponse };
export { getRandomEmoji };