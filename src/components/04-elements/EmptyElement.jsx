import { UsernameElement } from "../04-elements/UsernameElement"

export const EmptyElement = ({children}) => {
    return (
        <div className="empty-element">
            <UsernameElement>{children}</UsernameElement>
        </div>
    )
}
