import { StatProfileElement } from "../04-elements/StatProfileElement"

export const ProfileStatsComponent = ({data}) => {
    const { following, followers, likes } = data
    
    return (
        <div className="profile-header__stats">
            <StatProfileElement counter={following.length} category={'following'}/>
            <StatProfileElement counter={followers.length} category={'followers'}/>
            <StatProfileElement counter={likes} category={'likes'}/>
        </div>
    )
}
