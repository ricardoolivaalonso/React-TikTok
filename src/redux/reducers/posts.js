import { initialCurrentPost, initialUserPosts, initialAllPosts } from "../initialState"
import { CREATE_POST, GET_USER_POSTS, GET_ALL_POSTS, GET_CURRENT_POST } from "../types"

export const PostsReducer = (state = initialUserPosts, action) => {
    switch (action.type) {
        case GET_USER_POSTS: 
            return { 
                ...state,
                posts: action.payload 
            }

        case CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }

        default:
            return state
    }
}

export const AllPostsReducer = (state = initialAllPosts, action) => {
    switch (action.type) {
        case GET_ALL_POSTS: 
            return { 
                ...state,
                posts: action.payload 
            }
            
        default:
            return state
    }
}


export const CurrentPostReducer = (state = initialCurrentPost, action) => {
    switch (action.type) {
        case GET_CURRENT_POST:
            return {
                uuid: action.payload
            }

        default:
            return state
    }
}