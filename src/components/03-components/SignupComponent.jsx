import { useState } from 'react'
import { useDispatch } from "react-redux"
import { signUpUser } from "../../redux/actions"

export const SignupComponent = ({setLogin}) => {
    const dispatch = useDispatch()
    const [ form, setForm ] = useState({ email: '', name: '', password: '' })

    const getInfo = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value 
        })
    }

    const Signup = async(e) => {
        e.preventDefault()
		dispatch(signUpUser(form.email, form.name, form.password))
	}

    return (
        <>
            <form className="auth-form" onSubmit={(e)=>Signup(e)}>
                <p className="auth-title">Sign up</p>
                <input className="auth-input" type="text" placeholder="Email address" name="email" value={form.email} onChange={(e)=>getInfo(e)}/>
                <input className="auth-input" type="text" placeholder="Your name" name="name" value={form.name} onChange={(e)=>getInfo(e)}/>
                <input className="auth-input" type="password" placeholder="Password 6-digit" name="password" value={form.password} onChange={(e)=>getInfo(e)}/>
                <button className="auth-button" type="submit">Create account</button>
            </form>

            <div className="auth-actions">
                <span>Already have an account?</span> 
                <button type="button" onClick={()=>setLogin(true)}>Log in</button>
            </div>
        </>
    )
}
