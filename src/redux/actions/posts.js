import { 
    GET_CURRENT_POST, 
    GET_USER_POSTS, 
    GET_ALL_POSTS,
    CREATE_POST 
} from "../types"


export const getUserPostsAction = (post) => ({
    type: GET_USER_POSTS,
    payload: post
})

export const createPostAction = (post) => ({
    type: CREATE_POST,
    payload: post
})

export const getAllPostsAction = (post) => ({
    type: GET_ALL_POSTS,
    payload: post
})

export const getCurrentPostAction = (id) => ({
    type: GET_CURRENT_POST,
    payload: id
})
