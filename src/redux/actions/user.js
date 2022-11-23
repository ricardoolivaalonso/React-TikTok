import { 
    GET_CURRENT_USER,
    GET_CURRENT_PROFILE, 
    GET_ALL_USERS 
} from "../types"

export const getCurrentUserAction = (id) => ({
    type: GET_CURRENT_USER,
    payload: id
})

export const getAllUsersAction = (users) => ({
    type: GET_ALL_USERS,
    payload: users
})

export const getCurrentProfileAction = (user) => ({
    type: GET_CURRENT_PROFILE,
    payload: user
})


