import { initialSearch } from "../initialState"
import { SEARCH_POST } from "../types"

export const SearchReducer = (state = initialSearch, action) => {
    switch(action.type){
        case SEARCH_POST:
            return {
                wordToSearch: action.payload
            }
    
        default:
            return state
    }
}