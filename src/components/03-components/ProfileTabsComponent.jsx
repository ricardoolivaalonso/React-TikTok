import { useState } from "react"

export const ProfileTabsComponent = () => {
    const [position, setPosition] = useState(50)
    const switchIndicator = (e) => setPosition(e)

    return (
        <div className="profile-videos__tabs">
            <div className="profile-videos__wrapper-b">
                <div className="profile-videos__buttons">
                    <button className="profile-videos__button" onClick={()=>switchIndicator(0)}>Videos</button>
                    <button className="profile-videos__button" onClick={()=>switchIndicator(50)}>Liked</button>
                </div>
                <div className="profile-videos__indicator" style={{left: `${position}%`}}></div>
            </div>
        </div>
    )
}
