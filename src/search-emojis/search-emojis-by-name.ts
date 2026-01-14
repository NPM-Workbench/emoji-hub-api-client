/* app imports */
import { API_BASE_URL } from "../shared/index.js";
import { TEmoji, TAPIResponse } from "../types/index.js";

/* types */
type TEmojiSearchResponse = TAPIResponse & { 
    payload: null | {
        totalResults: number,
        results: TEmoji[],
    }
};  
type TInput = { query: string };

/* module */ 
async function searchEmojisByName(props: TInput): Promise<TEmojiSearchResponse> {
    try {
        /* props - destruct */
        const { query } = props;

        if (query.length <= 0) {
            throw new Error("Emoji Search: Query must be at least 1 character long!");
        } else {
            /* setup and fetch */
            const encoded = encodeURIComponent(query);
            const API_URL = `${API_BASE_URL}/api/search?q=${encoded}`;
            const response = await fetch(API_URL);

            /* check and return */
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const results = await response.json();
                return {
                    code: "api-ok",
                    message: "No errors encountered",
                    payload: {
                        results: results,
                        totalResults: results.length
                    }
                }
            }
        }
    } catch (error) {
        console.error(error);
        return {
            code: "api-fail",
            message: "Search Emoji(s) By Name: Encountered Error!",
            payload: null
        }
    }
}

/* exports */ 
export type { TEmojiSearchResponse };
export { searchEmojisByName };