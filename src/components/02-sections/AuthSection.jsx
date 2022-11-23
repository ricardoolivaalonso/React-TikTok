import { useState } from "react"
import { useDispatch } from "react-redux"
import { closeAuthModalAction } from "../../redux/actions/auth"

import { LoginComponent } from "../03-components/LoginComponent"
import { SignupComponent } from "../03-components/SignupComponent"

export const AuthSection = () => {
    const dispatch = useDispatch()
    const [login, setLogin] = useState(true)

    return (
        <section className="auth" >
            <div className="auth-modal">
                <div className="auth-settings"> 
                    <button onClick={()=>dispatch(closeAuthModalAction())}>+</button>
                </div>
                { login ? <LoginComponent setLogin={setLogin}/> : <SignupComponent setLogin={setLogin} />}
            </div>
        </section>
    )
}
