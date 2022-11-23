import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation  } from 'react-router-dom'
import { getUserPosts, refreshCurrentProfile } from "../../redux/actions"
// 
import { ProfileBioComponent } from "../03-components/ProfileBioComponent"
import { ProfileStatsComponent } from "../03-components/ProfileStatsComponent"
import { ProfileTabsComponent } from "../03-components/ProfileTabsComponent"
import { ParagraphElement } from "../04-elements/ParagraphElement"
import { ProfileCardComponent } from "../03-components/ProfileCardComponent"
import { EmptyElement } from "../04-elements/EmptyElement"
import { UpdateProfileSection } from "./UpdateProfileSection"

export const ProfileSection = () => {
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const { isOpen } = useSelector( state => state.UpdateProfileReducer )
    const info = useSelector(state => state.CurrentProfileReducer)
    const { posts } = useSelector( state => state.PostsReducer )
    posts.sort((a, b) => b.timestamp - a.timestamp)

    useEffect(()=>{
        dispatch(refreshCurrentProfile(pathname.split('/')[1]))
        dispatch(getUserPosts(pathname.split('/')[1]))
    },[dispatch])   
    
    return (
        <section className='profile'>
            { isOpen &&  <UpdateProfileSection /> }
            <section className="profile-header">
                <ProfileBioComponent data={info}/>
                <ProfileStatsComponent data={info}/>
                <ParagraphElement>{info.bio}</ParagraphElement>
            </section>
            <section className="profile-videos">
                <ProfileTabsComponent />
                {
                    posts.length > 0 ? 
                    <div className="profile-videos__list">
                        { posts.map( (post,i) => <ProfileCardComponent key={i+post.uuidDoc} data={post}/> ) }
                    </div>
                    :
                    <EmptyElement>No post yet ...</EmptyElement>
                }
            </section>
        </section>
    )
}
