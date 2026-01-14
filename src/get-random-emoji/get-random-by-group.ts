/* app imports */
import { API_BASE_URL } from "../shared/index.js";
import { TEmoji, TAPIResponse } from "../types/index.js";

/* types */ 
type TRandomEmojiByGroup = TAPIResponse & { payload: null | TEmoji };  
type TInput = { group: string };

/* module */
async function getRandomEmojiByGroup(props: TInput): Promise<TRandomEmojiByGroup> {
    try {
        /* props - destruct */ 
        const { group } = props;
        
        /* setup and fetch */
        const API_URL = `${API_BASE_URL}/api/random/group/${group}`;
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
            message: "Get Random Emoji By Group: Encountered Error!",
            payload: null
        }
    }
}

/* exports */ 
export type { TRandomEmojiByGroup };
export { getRandomEmojiByGroup };