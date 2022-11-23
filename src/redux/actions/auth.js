import { 
    OPEN_AUTH_MODAL, 
    CLOSE_AUTH_MODAL,
    LOGIN_USER,
    IS_USER_LOGGED 
} from "../types"

export const isUserLoggedAction = (logged) => ({
    type: IS_USER_LOGGED,
    payload: logged
})

export const loginUserAction = (user) => ({
    type: LOGIN_USER,
    payload: user
})

export const openAuthModalAction = () => ({
    type: OPEN_AUTH_MODAL,
})

export const closeAuthModalAction = () => ({
    type: CLOSE_AUTH_MODAL,
})