import { useDispatch, useSelector } from 'react-redux'
import { likePost } from '../../redux/actions'
import { openAuthModalAction } from '../../redux/actions/auth'
// 
import { HeaderIconElement } from "../04-elements/HeaderIconElement"
import { CommentIconElement } from "../04-elements/CommentIconElement"
import { HeartLikeIconElement } from "../04-elements/HeartLikeIconElement"
import { HeartUnlikeIconElement } from '../04-elements/HeartUnlikeIconElement'

export const ModalStatsComponent = ({data}) => {
    const dispatch = useDispatch()
    const { isUserLogged } = useSelector(state => state.LoggedReducer)
    const { uuid: uuidCurrentUsername } = useSelector(state => state.UserReducer)
    const { likes, comments, uuidDoc, uuidUsername } = data

    const likeCurrentPost = () => {
        let isLiked = []

        if(!likes.includes(uuidCurrentUsername)) isLiked = [...likes, uuidCurrentUsername]
        else isLiked = likes.filter( r => r !== uuidCurrentUsername) 
        dispatch(likePost({isLiked, uuidDoc}))
    }

    return (
        <div className="modal__stats">
            {
                !isUserLogged ?
                (
                    <a className="header-actions__item" onClick={()=>dispatch(openAuthModalAction())}>
                        <><HeartLikeIconElement /><span>{likes.length}</span></>
                    </a>
                )
                :
                (
                    <a className="header-actions__item" onClick={()=>likeCurrentPost()}>
                        {
                            !likes.includes(uuidCurrentUsername) ?
                            <><HeartLikeIconElement /><span>{likes.length}</span></> :
                            <><HeartUnlikeIconElement /><span>{likes.length}</span></>
                        }
                    </a>
                )
            }

            <HeaderIconElement>
                <CommentIconElement /><span>{comments.length}</span>
            </HeaderIconElement>
        </div>
    )
}
