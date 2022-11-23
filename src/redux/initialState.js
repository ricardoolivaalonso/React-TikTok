export const initialLogged = { isUserLogged: false }

export const InitialUser = {
    uuid: '',
    name: '',
    avatar: '',
    bio: '',
    following: [],
    followers: [],
    likes: 0,
    uuidFirebase: null
}

export const initialModal = { 
    isOpen: false, 
    user: {
        uuidDoc: null,
        uuidUsername: null,
        uuidPost: null,
        name: null,
        media: '',
        description: '',
        comments: [],
        likes: [],
        views: 0,
        timestamp: null,
    }    
}
export const initialAuth = { isOpen: false }
export const initialProfile = { isOpen: false }

export const initialUserPosts = { posts: [] }
export const initialCurrentUser = { uuid: null }

export const initialCurrentProfile = { 
    uuid: '',
    name: '',
    avatar: '',
    bio: '',
    following: [],
    followers: [],
    likes: 0,
    uuidFirebase: ''
}

export const initialUsers = { following: [] }
export const initialAllPosts = { posts: [] }

export const initialCurrentPost = { uuid: null }
export const initialSearch = { wordToSearch: null }
















