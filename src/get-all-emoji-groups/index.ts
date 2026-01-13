/* app imports */
import { TAPIResponse} from "../types/index.js";
import {API_BASE_URL} from "../shared/index.js";

/* types */
type TGetAllEmojiGroupsResponse = TAPIResponse & {
    payload: null | {
        groups: string[]
    };
};

/* module */
async function getAllEmojiGroups(): Promise<TGetAllEmojiGroupsResponse> {
    try { 
        /* setup and fetch */
        const API_URL = `${API_BASE_URL}/api/groups`;
        const response = await fetch(API_URL);

        if (! response.ok) {
            throw new Error(`HTTP error! status: ${
                response.status
            }`);
        } else {
            const emojiGroups = await response.json();
            return {
                code: "api-ok",
                message: "No errors encountered",
                payload: {
                    groups: emojiGroups
                }
            };
        }
    } catch (error) {
        console.error(error)
        return {code: "api-fail", message: "Get All Emoji Groups: Encountered Error", payload: null};
    }
}

/* export */
export { getAllEmojiGroups };
export type {TGetAllEmojiGroupsResponse};
