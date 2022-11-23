import { UploadFormComponent } from "../03-components/UploadFormComponent"

export const UploadSection = () => {
    return (
        <section className="upload">
            <div className="upload-header">
                <p className="upload-header__title">Upload video</p>
                <p className="upload-header__subtitle">Post a video to your account</p>
            </div>
            <UploadFormComponent /> 
        </section>
    )
}
