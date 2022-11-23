import { SEARCH_POST } from "../types"

export const searchPostAction = (word) => ({
    type: SEARCH_POST,
    payload: word
})