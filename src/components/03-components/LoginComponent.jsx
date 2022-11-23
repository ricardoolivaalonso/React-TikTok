import { useState } from 'react'
import { useDispatch } from "react-redux"
import { loginUser } from '../../redux/actions'

export const LoginComponent = ({setLogin}) => {
    const dispatch = useDispatch()
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const Login = async(e) => {
        e.preventDefault()
		dispatch(loginUser(email, password))
	}

    return (
        <>
            <form className="auth-form" onSubmit={(e)=>Login(e)}>
                <p className="auth-title">Log in</p>
                <input className="auth-input" type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="auth-button" type="submit">Log in</button>
            </form>

            <div className="auth-actions">
                <span>Don’t have an account?</span> 
                <button type="button" onClick={()=>setLogin(false)}>Sign up</button>
            </div>
        </>
    )
}
