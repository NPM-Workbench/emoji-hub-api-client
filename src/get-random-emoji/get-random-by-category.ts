/* app imports */
import { API_BASE_URL } from "../shared/index.js";
import { TEmoji, TAPIResponse } from "../types/index.js";

/* types */ 
type TRandomEmojiByCategory = TAPIResponse & { payload: null | TEmoji };  
type TInput = { category: string };

/* module */
async function getRandomEmojiByCategory(props: TInput): Promise<TRandomEmojiByCategory> {
    try {
        /* props - destruct */ 
        const { category } = props;
        
        /* setup and fetch */
        const API_URL = `${API_BASE_URL}/api/random/category/${category}`;
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
            message: "Get Random Emoji By Category: Encountered Error!",
            payload: null
        }
    }
}

/* exports */ 
export type { TRandomEmojiByCategory };
export { getRandomEmojiByCategory };