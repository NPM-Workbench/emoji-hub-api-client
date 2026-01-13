/* app imports */
import { API_BASE_URL } from "../shared/index.js";
import { TEmoji, TAPIResponse } from "../types/index.js";

/* types */ 
type TAllEmojisResponse = TAPIResponse & { payload: null | TEmoji[] };

/* module */ 
async function getAllEmojis(): Promise<TAllEmojisResponse> {
    try {
        /* setup and fetch */
        const API_URL = `${API_BASE_URL}/api/all`;
        const response = await fetch(API_URL);

        /* check and return */
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const emojis = await response.json();
            return {
                code: "api-ok",
                message: "No errors encountered",
                payload: emojis
            };
        }
    } catch (error) {
        console.error(error);
        return {
            code: "api-fail",
            message: "Get All Emoji: Encountered Error!",
            payload: null
        }
    }
}

/* export */ 
export { getAllEmojis };
export type { TAllEmojisResponse };