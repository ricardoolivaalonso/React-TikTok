import { AvatarElement } from "../04-elements/AvatarElement"
import { UsernameElement } from "../04-elements/UsernameElement"
import { NameElement } from "../04-elements/NameElement"
import { formatDistanceStrict } from 'date-fns'

export const ModalCardComponent = ({data}) => {
    return (
        <div className="modal-card">
            <AvatarElement avatar={data.avatar} name={data.uuidUsername} />
            <div className="modal-card__info">
                <UsernameElement>{data.uuidUsername}</UsernameElement>
                <NameElement>{data.name}<time>{formatDistanceStrict(data.timestamp, new Date())}</time></NameElement>
            </div>
        </div>
    )
}
