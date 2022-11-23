import { OPEN_MEDIA_MODAL, CLOSE_MEDIA_MODAL } from "../types"

export const openMediaModalAction = (post) => ({
    type: OPEN_MEDIA_MODAL,
    payload: post
})
export const closeMediaModalAction = () => ({
    type: CLOSE_MEDIA_MODAL,
})