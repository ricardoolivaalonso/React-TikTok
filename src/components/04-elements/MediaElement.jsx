export const MediaElement = ({media}) => {
    return (
        <video 
            className="profile-videos__video" 
            loop  
            mute="true"
            onMouseOver={ (e) => e.target.play() }
            onMouseOut={ (e) => e.target.pause() }
            src={media}
        />
    )
}
