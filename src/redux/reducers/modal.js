import { initialModal } from "../initialState"
import { OPEN_MEDIA_MODAL, CLOSE_MEDIA_MODAL } from "../types"

export const ModalReducer = (state = initialModal, action) => {
    switch (action.type) {
        case OPEN_MEDIA_MODAL: 
            return {
                isOpen: true,
                user: action.payload
            }
     
        case CLOSE_MEDIA_MODAL:
            return {
                ...state,
                isOpen: false
            }

        default:
            return state
    }
}