/* app imports */
import { API_BASE_URL } from "../shared/index.js";
import { TEmoji, TAPIResponse } from "../types/index.js";

/* types */
type TEmojiSimilarSearchResponse = TAPIResponse & { 
    payload: null | {
        totalResults: number,
        results: TEmoji[],
    }
};  
type TInput = { query: string };

/* module */ 
async function searchSimilarEmojisByName(props: TInput): Promise<TEmojiSimilarSearchResponse> {
    try {
        /* props - destruct */
        const { query } = props;

        if (query.length <= 0) {
            throw new Error("Emoji Similar Search: Query must be at least 1 character long!");
        } else {
            /* setup and fetch */
            const encoded = encodeURIComponent(query);
            const API_URL = `${API_BASE_URL}/api/similar/${encoded}`;
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
            message: "Search Similar Emoji(s) By Name: Encountered Error!",
            payload: null
        }
    }
}

/* exports */ 
export type { TEmojiSimilarSearchResponse };
export { searchSimilarEmojisByName };