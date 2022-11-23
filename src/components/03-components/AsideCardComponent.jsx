import { useDispatch } from "react-redux"
import { useNavigate  } from 'react-router-dom'
import { getCurrentProfile, getUserPosts } from "../../redux/actions"
import { AvatarElement } from "../04-elements/AvatarElement"

export const AsideCardComponent = ({data}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { uuid, uuidDoc, name, avatar } = data

    const getProfile = () => {
        dispatch(getCurrentProfile(uuidDoc))
        dispatch(getUserPosts(uuid))
        navigate(`/${uuid}`)
    }

    return (
        <article className="following-card" onClick={()=>getProfile()}>
            <AvatarElement avatar={ avatar } name={name}/>
            <a className="following-card__info is-hidden-mobile">
                <h4 className="following-card__username">{ uuid }</h4>
                <p className="following-card__name">{ name }</p>
            </a>
        </article>
        
    )
}
