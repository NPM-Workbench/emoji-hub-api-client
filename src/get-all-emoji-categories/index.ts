/* app imports */
import { API_BASE_URL } from "../shared/index.js";
import { TAPIResponse } from "../types/index.js";

/* types */ 
type TEmojiCategoryResponse = TAPIResponse & {
    payload: { categories: string[] } | null;
};

/* module */ 
async function getAllEmojiCategories(): Promise<TEmojiCategoryResponse> {
    try {
        /* setup and fetch */
        const API_URL = `${API_BASE_URL}/api/categories`;
        const response = await fetch(API_URL);

        /* check and return */
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const categories = await response.json();
            return {
                code: "api-ok",
                message: "No errors encountered",
                payload: { categories }
            }
        }
    } catch (error) {
        console.error(error);
        return {
            code: "api-fail",
            message: "Get All Emoji Categories: Encountered Error!",
            payload: null
        }
    }
}

/* exports */
export type { TEmojiCategoryResponse };
export { getAllEmojiCategories };