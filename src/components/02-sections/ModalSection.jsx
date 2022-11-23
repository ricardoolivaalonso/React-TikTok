import { useSelector, useDispatch } from "react-redux"
import { useLayoutEffect, useRef, useState } from "react"
import { deletePost } from "../../redux/actions"
import { closeMediaModalAction } from "../../redux/actions/modal"
// 
import { CloseModalIconElement } from "../04-elements/CloseModalIconElement"
import { ModalInfoComponent } from "../03-components/ModalInfoComponent"
import { ModalStatsComponent } from "../03-components/ModalStatsComponent"
import { ModalFormComponent } from "../03-components/ModalFormComponent"
import { ModalCardCommentComponent } from "../03-components/ModalCardCommentComponent"
import { UsernameElement } from "../04-elements/UsernameElement"
import { DeleteIconElement } from "../04-elements/DeleteIconElement"
import { MuteIconElement } from "../04-elements/MuteIconElement"
import { UnmuteIconElement } from "../04-elements/UnmuteIconElement"

export const ModalSection = () => {
    const dispatch = useDispatch()
    const [commentsHeight, setCommentsHeight] = useState(0)
    const [ muted, setMuted ] = useState(false)

    const { isUserLogged } = useSelector(state => state.LoggedReducer)
    const { uuid } = useSelector( state => state.UserReducer)
    const posts = useSelector( state => state.AllPostsReducer.posts)
    const uuidPost = useSelector( state => state.CurrentPostReducer.uuid)
    const modal = posts.find( post => post.uuidDoc == uuidPost )

    const modalRef = useRef(0)
    const statsRef = useRef(0)
    const commentsRef = useRef(0)
    const videoRef = useRef(null)

    const getHeight = () => {
        const modal = modalRef.current.offsetHeight
        const stats = statsRef.current.offsetHeight
        const footer = 150
        setCommentsHeight(modal - (stats + footer))
    }

    const deleteCurrentPost = () => {
        dispatch(deletePost({uuid: modal.uuidDoc}))
        dispatch(closeMediaModalAction())
    }

    const muteVideo = () => {
        setMuted(!muted)
        muted ? videoRef.current.muted = false : videoRef.current.muted = true
    }

    useLayoutEffect(() => {
        getHeight()
        window.addEventListener('resize', getHeight)

        return () => window.removeEventListener('resize', getHeight)
    },[])

    return (
        <div className="modal" ref={modalRef}>
            <CloseModalIconElement  />

            <div className="modal__wrapper">
                <div className="modal-media">
                    <div className="modal-media__element"><video ref={videoRef} src={modal?.media} loop autoPlay/></div>
                    <button className="profile-videos__mute" onClick={muteVideo}>
                        { !muted ? <MuteIconElement/> : <UnmuteIconElement />}
                    </button>
                </div>

                <div className="modal__description">
                    { (modal.uuidUsername == uuid) && <DeleteIconElement onMyClick={()=>deleteCurrentPost()}/> }
                    <div className="modal__ref" ref={statsRef}>
                        <ModalInfoComponent data={modal}/>
                        <ModalStatsComponent data={modal}/>
                    </div>
                    <div className="modal-comments" ref={commentsRef} style={{height: commentsHeight}}>
                        <div className="modal-comments__scroll">
                            { modal.comments.map( comment => <ModalCardCommentComponent key={comment.uuidComment} comment={comment} data={modal}/>)}
                        </div>
                    </div>
                    { 
                        isUserLogged ? 
                        <ModalFormComponent uuidDoc={modal.uuidDoc}/> : 
                        <div className="modal-form">
                            <UsernameElement>Please Login to comment</UsernameElement>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
