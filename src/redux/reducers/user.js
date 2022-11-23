import { initialCurrentProfile, initialCurrentUser, InitialUser, initialUsers } from "../initialState"
import { LOGIN_USER, GET_CURRENT_USER, GET_ALL_USERS, GET_CURRENT_PROFILE } from "../types"

export const UserReducer = (state = InitialUser, action) => {
    switch (action.type) {
        case LOGIN_USER: 
            return {
                ...action.payload
            }
    
        default:
            return state

    }
}

export const CurrentUserReducer = (state = initialCurrentUser, action) => {
    switch (action.type) {
        case GET_CURRENT_USER:
            return {
                uuid: action.payload
            }

        default:
            return state
    }
}

export const UsersReducer = (state = initialUsers, action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                following: action.payload
            }

        default:
            return state
    }
}

export const CurrentProfileReducer = (state = initialCurrentProfile, action) => {
    switch (action.type) {
        
        case GET_CURRENT_PROFILE:
            return {
                ...action.payload
            }

        default:
            return state
    }
}
