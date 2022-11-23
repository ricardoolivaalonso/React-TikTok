import defaultAvatar from '../../assets/images/default.jpg'
import { getAuth } from "firebase/auth"
import { useDispatch, useSelector } from "react-redux"
import { useState, useRef } from 'react'
import { getCurrentProfile, updateUserProfile } from "../../redux/actions"
import { UsernameElement } from "../04-elements/UsernameElement"
import { ButtonElement } from "../04-elements/ButtonElement"
import { closeProfileModalAction } from "../../redux/actions/profile"
import { toast } from 'react-toastify'

export const UpdateProfileSection = () => {
    const dispatch = useDispatch()
    const auth = getAuth()
    const { name, bio, avatar } = useSelector(state => state.UserReducer)
    const inputRef = useRef()
    const pictureRef = useRef()
    const [ updatedName, setUpdatedName ] = useState(name)
    const [ updatedBio, setUpdatedBio ] = useState(bio)

    const getImage = () => {
        const file = inputRef.current.files[0]
        pictureRef.current.src = URL.createObjectURL(file)
    }
    
    const updateData = () => {
        dispatch(updateUserProfile(updatedName, updatedBio, inputRef))
        dispatch(getCurrentProfile(auth.currentUser.uid))
        toast.info("Updating profile!")
    }

    return (
        <section className="update-profile">
            <form className="update-profile__modal">
                <div className="update-profile__row">
                    <UsernameElement>Profile photo</UsernameElement>
                    <div className="update-profile__group">
                        {
                            avatar ? 
                                <img className="update-profile__avatar" ref={pictureRef} src={avatar} onError={ e => e.currentTarget.src = defaultAvatar}/>:
                                <span className="avatar-text">{name.substring(0,1)}</span>
                        }
                        <label htmlFor="photo-file" className='button-element button-element--cta'>Select photo</label>
                        <input type="file" id="photo-file" accept="image/*" onChange={getImage} ref={inputRef}/>
                    </div>
                </div>
                <div className="update-profile__row">
                    <p className="update-profile__text">Name</p>
                    <input type="text" className="update-profile__input" value={updatedName} onChange={(e)=>setUpdatedName(e.target.value)}/>
                </div>
                <div className="update-profile__row">
                    <p className="update-profile__text">Bio</p>
                    <textarea cols="30" rows="10" className="update-profile__textarea" value={updatedBio} onChange={(e)=>setUpdatedBio(e.target.value)}></textarea>
                </div>
                <div className="update-profile__actions">
                    <ButtonElement onMyClick={()=>dispatch(closeProfileModalAction())}>Cancel</ButtonElement>
                    <ButtonElement cta onMyClick={ updateData }>Save</ButtonElement>
                </div>
            </form>
        </section>
    )
}
