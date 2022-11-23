import { useDispatch, useSelector } from "react-redux"
import { updateFollowers } from "../../redux/actions"
import { openProfileModalAction } from "../../redux/actions/profile"
import { AvatarElement } from "../04-elements/AvatarElement"
import { ButtonElement } from "../04-elements/ButtonElement"
import { EditIconElement } from "../04-elements/EditIconElement"

export const ProfileBioComponent = ({data}) => {
    const dispatch = useDispatch()
    const { isUserLogged } = useSelector(state => state.LoggedReducer)
    const { uuid: currentUUID } = useSelector(state => state.UserReducer)
    const { avatar, uuid, name, followers, uuidDoc } = data

    const setFollowers = () => {
        let getFollower

        if(!followers.includes(currentUUID)) getFollower = [...followers, currentUUID]
        else getFollower = followers.filter( follow => follow !== currentUUID)

        dispatch(updateFollowers({getFollower, uuidDoc, uuid }))
    }

    return (
        <div className="profile-header__bio">
            <AvatarElement avatar={avatar} big name={name}/>
            <div className="profile-header__info">
                <h2 className="profile-header__info-username">{uuid}</h2>
                <h1 className="profile-header__info-name">{name}</h1>
                {
                    (isUserLogged && currentUUID == uuid ) ?
                        <ButtonElement onMyClick={()=>dispatch(openProfileModalAction())} ><EditIconElement />Edit profile</ButtonElement> :
                
                    (isUserLogged && !followers.includes(currentUUID) || !isUserLogged) ?
                        <ButtonElement cta onMyClick={setFollowers}>Follow</ButtonElement> :
                        <ButtonElement onMyClick={setFollowers}>Unfollow</ButtonElement>                    
                }
            </div>
        </div>
    )
}
