import { CLOSE_PROFILE_MODAL, OPEN_PROFILE_MODAL } from "../types";

export const openProfileModalAction = () => ({
    type: OPEN_PROFILE_MODAL
})

export const closeProfileModalAction = () => ({
    type: CLOSE_PROFILE_MODAL
})