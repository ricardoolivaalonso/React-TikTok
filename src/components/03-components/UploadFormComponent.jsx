import { v4 as uuidv4 } from 'uuid'
import { getAuth } from "firebase/auth"
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getCurrentProfile, sendPost } from '../../redux/actions'
import { ButtonElement } from "../04-elements/ButtonElement"
import { CloudIconElement } from "../04-elements/CloudIconElement"

export const UploadFormComponent = () => {
    const auth = getAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const videoRef = useRef()
    const playerRef = useRef()
    const { uuid, name, avatar } = useSelector(state => state.UserReducer )
    const [ caption, setCaption ] = useState('')
    const [ isLoaded, setIsLoaded ] = useState(false)

    const playVideo = () => {
        const file = videoRef.current.files[0]
        playerRef.current.src = URL.createObjectURL(file)
        setIsLoaded(true)
    }

    const createPost = async(e) => {
        e.preventDefault()

        const post =  {
            uuidPost: uuidv4(),
            uuidUsername: uuid,
            name: name,
            media: '',
            description: caption,
            views: 0,
            likes: [],
            timestamp: Date.now(),
            comments: [],
            avatar: avatar
        }

        if(!caption && !isLoaded ){
            toast.info("Video and caption are required!")
            return
        }

        setCaption('')
        setIsLoaded(false)
        dispatch(sendPost(post, videoRef, playerRef))
        dispatch(getCurrentProfile(auth.currentUser.uid))
        toast.info("Uploading...!")
     
    }

    return (
        <form className="upload-wrapper" onSubmit={(e)=>createPost(e)}>
            <div className={`upload-media ${isLoaded ? 'is-video-loaded' : ''}`}>
                <div className="upload-drag">
                    <CloudIconElement />
                    <p className="upload-drag__title">Select video to upload</p>
                    <p className="upload-drag__subtitle">MP4 o WebM</p>
                    <label htmlFor="upl-file" className='button-element button-element--cta'>Select file</label>
                    <input type="file" id="upl-file" capture="environment" accept="video/mp4" ref={videoRef} onChange={playVideo}/>
                </div>
            </div>

            <div className="upload-player" >
                <video ref={playerRef} autoPlay loop />
            </div>

            <div className="upload-form">
                <div className="upload-form__group">
                    <label className="upload-form__label" htmlFor="input-caption">Caption</label>
                    <input className="upload-form__input" type="text" id="input-caption" value={caption} onChange={(e)=>setCaption(e.target.value)}/>
                </div>
                <div className="upload-form__group upload-form__group--column">
                    <ButtonElement big type="button" onMyClick={()=>navigate(-1)}>Discard</ButtonElement>
                    <ButtonElement big cta type="submit">Post</ButtonElement>
                </div>
            </div>
        </form>
    )
}
