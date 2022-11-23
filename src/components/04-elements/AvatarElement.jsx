import defaultAvatar from '../../assets/images/default.jpg'

export const AvatarElement = ({avatar, name, big, medium, onMyClick}) => {
    return (
        <a className={`avatar-element ${big ? 'avatar-element--big' : ''} ${medium ? 'avatar-element--medium' : ''}`} onClick={onMyClick}>
            { avatar ? 
                <img src={avatar} alt={name?.substring(0,1)} onError={ e => e.currentTarget.src = defaultAvatar}/> : 
                <span className="avatar-text">{name?.substring(0,1)}</span> 
            }
        </a>
    )
}
