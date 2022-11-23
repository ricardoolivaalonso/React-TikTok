import { useDispatch } from "react-redux"
import { openPost } from "../../redux/actions"
import { getCurrentPostAction } from "../../redux/actions/posts"
// 
import { PlayIconElement } from "../04-elements/PlayIconElement"
import { ParagraphElement } from "../04-elements/ParagraphElement"
import { MediaElement } from "../04-elements/MediaElement"
import { MuteIconElement } from "../04-elements/MuteIconElement"

export const ProfileCardComponent = ({data}) => {
    const dispatch = useDispatch()

    const openModal = async() => {
        dispatch(openPost(data, data.uuidDoc))
        dispatch(getCurrentPostAction(data.uuidDoc))
    }

    return (
        <a className="profile-videos__item" onClick={() => openModal()}>
            <div className="profile-videos__wrapper-p">
                <div className="profile-videos__picture"> 
                    <div className="profile-videos__bg">
                        <MediaElement media={data.media} />
                        <PlayIconElement views={data.views}/>
                    </div>
                </div>
                <ParagraphElement>{data.description}</ParagraphElement>
            </div>
        </a>   
    )
}
