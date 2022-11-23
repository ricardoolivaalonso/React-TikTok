import { useSelector, useDispatch } from "react-redux"
import { openAuthModalAction } from "../../redux/actions/auth"
import { deleteComment, likeComment } from "../../redux/actions"
// 
import { AvatarElement } from "../04-elements/AvatarElement"
import { UsernameElement } from "../04-elements/UsernameElement"
import { ParagraphFluidElement } from "../04-elements/ParagraphFluidElement"
import { SettingsIconElement } from "../04-elements/SettingsIconElement"
import { UnlikedIconElement } from "../04-elements/UnlikedIconElement"
import { CounterElement } from "../04-elements/CounterElement"
import { LikeIconElement } from "../04-elements/LikeIconElement"

export const ModalCardCommentComponent = ({comment, data}) => {
    const dispatch = useDispatch()
    const { isUserLogged } = useSelector(state => state.LoggedReducer)
    const { name, content, likes, avatar, uuidComment} = comment
    const { uuidDoc, comments, uuidUsername } = data
    const { uuid: uuidCurrentUsername  } = useSelector( state => state.UserReducer)


    const likeCurrentComment = () => {
        let isLiked

        if(!likes.includes(uuidCurrentUsername)) isLiked = [...likes, uuidCurrentUsername]
        else isLiked = likes.filter( like => like !== uuidCurrentUsername) 

        const udpateComment = { ...comment, likes: isLiked }
      
        let getComments = comments.filter( cmt => cmt.uuidComment !== comment.uuidComment)
        getComments.push(udpateComment)
        getComments.sort( (a, b) => a.timestamp - b.timestamp)
      
        dispatch(likeComment({getComments, uuidDoc}))
    }

    const deleteCurrentComment = () => {
        const getComments = comments.filter( cmt => cmt.uuidComment !== uuidComment )
        dispatch(deleteComment({getComments, uuidDoc}))
    }

    return (
        <>
            <div className="modal-card">
                <AvatarElement avatar={avatar} name={name}/>
                <div className="modal-card__info">
                    <UsernameElement>{name}</UsernameElement>
                    <ParagraphFluidElement>{content}</ParagraphFluidElement>
                </div>
            
                <div className="modal-card__actions">
                    <div className="modal-card__action">
                        {
                            !isUserLogged ? 
                            <a className="header-actions__item" onClick={()=>dispatch(openAuthModalAction())}>
                                <UnlikedIconElement />
                            </a>
                            :
                            <a className="header-actions__item" onClick={()=>likeCurrentComment()}>
                                { !comment.likes.includes(uuidCurrentUsername) ? <UnlikedIconElement /> : <LikeIconElement /> }
                            </a>
                        }
                        <CounterElement likes={likes.length}/>
                    </div>
                    { (comment.uuidUsername == uuidCurrentUsername) && <SettingsIconElement onMyClick={()=>deleteCurrentComment()}/> }
                </div>
            </div>
        </>
    )
}
