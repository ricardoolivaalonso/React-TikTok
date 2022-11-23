import { initialProfile } from "../initialState";
import { CLOSE_PROFILE_MODAL, OPEN_PROFILE_MODAL } from "../types";

export const UpdateProfileReducer = (state = initialProfile, action) => {
    switch (action.type) {
        case OPEN_PROFILE_MODAL:
            return { isOpen: true }
        
        case CLOSE_PROFILE_MODAL:
            return { isOpen: false }

    
        default:
            return state
    }
}