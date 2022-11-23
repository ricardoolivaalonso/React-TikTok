import { useSelector, useDispatch } from "react-redux"
import { likePost, openPost } from '../../redux/actions'
import { getCurrentPostAction } from '../../redux/actions/posts'
import { openAuthModalAction } from "../../redux/actions/auth"
import { refreshCurrentProfile, getUserPosts } from "../../redux/actions"
import { useNavigate  } from 'react-router-dom'
import { formatDistanceStrict } from 'date-fns'
// 
import { AvatarElement } from '../04-elements/AvatarElement'
import { NameElement } from '../04-elements/NameElement'
import { ParagraphFluidElement } from '../04-elements/ParagraphFluidElement'
import { UsernameElement } from '../04-elements/UsernameElement'
import { HeartLikeIconElement } from '../04-elements/HeartLikeIconElement'
import { HeartUnlikeIconElement } from '../04-elements/HeartUnlikeIconElement'
import { CommentIconElement } from "../04-elements/CommentIconElement"

export const TimelineCardComponent = ({data}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isUserLogged } = useSelector(state => state.LoggedReducer)
    const { uuid } = useSelector(state => state.CurrentUserReducer)
    const { uuidUsername, name, timestamp, description, media, likes, comments, uuidDoc, avatar } = data

    const openModal = async() => {
        dispatch(openPost(data, data.uuidDoc))
        dispatch(getCurrentPostAction(data.uuidDoc))
    }
    
    const likeVideo = () => {
        let isLiked = []

        if(!likes.includes(uuid)) isLiked = [...likes, uuid]
        else isLiked = likes.filter( r => r !== uuid) 
        dispatch(likePost({isLiked, uuidDoc}))
    }

    const getProfile = () => {
        dispatch(refreshCurrentProfile(uuidUsername))
        dispatch(getUserPosts(uuidUsername))
        navigate(`/${uuidUsername}`)
    }

    return (
        <article className='timeline-item'>
            <AvatarElement medium avatar={avatar} name={name} onMyClick={()=>getProfile()}/>

            <div className='timeline-item__description'>
                <div className='timeline-item__info'>
                    <UsernameElement>{uuidUsername}</UsernameElement>
                    <NameElement>{name}<time>{formatDistanceStrict(timestamp, new Date())}</time></NameElement>
                </div>
                <ParagraphFluidElement>{description}</ParagraphFluidElement>

                <div className="timeline-item__media">
                    <a className="timeline-item__video" onClick={() => openModal()}>
                        <video src={media} loop />
                    </a>
                    <div className='timeline-item__stats'>
                        {
                            !isUserLogged ?
                            (
                                <a className='timeline-item__icon' onClick={()=>dispatch(openAuthModalAction())}>
                                    { <><HeartLikeIconElement /><span>{likes.length}</span></> }
                                </a>
                            )
                            :
                            (
                                <a className='timeline-item__icon' onClick={()=>likeVideo()}>
                                {
                                    !likes.includes(uuid) ?
                                    <><HeartLikeIconElement /><span>{likes.length}</span></>
                                    :
                                    <><HeartUnlikeIconElement /><span>{likes.length}</span></>
                                }
                                </a>
                            )
                        }
                        
                        <a className='timeline-item__icon'>
                            <CommentIconElement /><span>{comments.length}</span>
                        </a>
                    </div>
                </div>
            </div>
        </article>
    )
}
