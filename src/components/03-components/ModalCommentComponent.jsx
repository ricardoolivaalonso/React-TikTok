import { ModalCardComponent } from "../03-components/ModalCardComponent"

export const ModalCommentComponent = ({data}) => {
    return (
        <div className="modal-comments">
            <div className="modal-comments__scroll">
                <ModalCardComponent comment data={data}/>
            </div>
        </div>
    )
}
