import { header } from '../../UIData/header'
import { getAuth } from "firebase/auth"
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from "react-router-dom"
import parse from 'html-react-parser'
import { getUserPosts, closeSession, getCurrentProfile } from '../../redux/actions'

import { ButtonElement } from '../04-elements/ButtonElement'
import { PlusIconElement } from '../04-elements/PlusIconElement'
import { HeaderIconElement } from "../04-elements/HeaderIconElement"
import { AvatarElement } from '../04-elements/AvatarElement'
import { LogoutIconElement } from '../04-elements/LogoutIconElement'

export const HeaderActionsComponent = () => {
    const { uuid, avatar, name } = useSelector( state => state.UserReducer)
    const dispatch = useDispatch()
	const navigate = useNavigate()

    const getProfile = () => {
        const auth = getAuth()
        dispatch(getCurrentProfile(auth.currentUser.uid))
        dispatch(getUserPosts(uuid))
        navigate(`/${uuid}`)
    }

    return (
        <div className="header-actions">
            <NavLink to="/upload" className="header-actions__item">
                <ButtonElement><PlusIconElement />Upload</ButtonElement>
            </NavLink>
          
            { 
                header.map( item => 
                    <HeaderIconElement key={item.uuid}>{ parse(item.icon) }</HeaderIconElement> 
                ) 
            }
            <button className="avatar-element" onClick={getProfile}><AvatarElement avatar={avatar} name={name} /></button>
            <button onClick={()=>dispatch(closeSession())}><LogoutIconElement /></button>
        </div>
    )
}
