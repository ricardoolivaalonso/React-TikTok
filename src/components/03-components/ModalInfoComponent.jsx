import { ModalCardComponent } from "../03-components/ModalCardComponent"
import { ParagraphFluidElement } from "../04-elements/ParagraphFluidElement"

export const ModalInfoComponent = ({data}) => {
    return (
        <div className="modal__info">
            <ModalCardComponent data={data}/>
            <ParagraphFluidElement>{data.description}</ParagraphFluidElement>
        </div>
    )
}
