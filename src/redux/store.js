import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { AuthReducer, LoggedReducer } from './reducers/auth'
import { UserReducer, UsersReducer, CurrentUserReducer, CurrentProfileReducer } from './reducers/user'
import { PostsReducer, AllPostsReducer, CurrentPostReducer, } from './reducers/posts.js'
import { ModalReducer } from './reducers/modal.js'
import { SearchReducer } from './reducers/search.js'
import { UpdateProfileReducer } from './reducers/profile.js'

const rootReducers = combineReducers({
    AuthReducer,
    LoggedReducer,
    UserReducer,
    UsersReducer,
    CurrentUserReducer,
    PostsReducer,
    AllPostsReducer,
    CurrentPostReducer,
    CurrentProfileReducer,
    ModalReducer,
    SearchReducer,
    UpdateProfileReducer,
})

export const store = createStore(
    rootReducers,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)