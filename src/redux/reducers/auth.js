import { initialAuth, initialLogged } from "../initialState"
import { OPEN_AUTH_MODAL, CLOSE_AUTH_MODAL, IS_USER_LOGGED } from "../types"

export const LoggedReducer = (state = initialLogged, action) => {
    switch (action.type) {
        case IS_USER_LOGGED: 
            return {
                isUserLogged: action.payload,
            }
  
        default:
            return state
    }
}

export const AuthReducer = (state = initialAuth, action) => {
    switch (action.type) {
        case OPEN_AUTH_MODAL: 
            return {
                isOpen: true,
            }
     
        case CLOSE_AUTH_MODAL:
            return {
                isOpen: false
            }

        default:
            return state
    }
}