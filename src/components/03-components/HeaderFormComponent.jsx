import { useState } from 'react'
import { useDispatch  } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { searchPostAction } from '../../redux/actions/search'
import { ClearInputIconElement } from '../04-elements/ClearInputIconElement'

export const HeaderFormComponent = () => {
    const dispatch = useDispatch()
	const navigate = useNavigate()
    const [isButtonVisible, setIsButtonVisible] = useState(false)
    const [input, setInput] = useState('')

    const userIsTyping = (value) => {
        let typing 
        setInput(value)

        if (value) {
            typing = true
            dispatch(searchPostAction(input))
        } else {
            typing = false
            dispatch(searchPostAction(null))
        }
        
        setIsButtonVisible(typing)
        navigate(`/foryou`)
    }

    const clearInput = () => {
        setInput('')
        setIsButtonVisible(false)
        dispatch(searchPostAction(null))
    }

    return (
        <form className="header-form" tabIndex={0} onSubmit={ e => e.preventDefault()}>
            <input className='header-form__input' type="text" placeholder="Searh account and videos"
                value={input}
                onChange={(e)=>userIsTyping(e.target.value.toLowerCase())}
            />
            <div className='header-form__group'>
                {
                    isButtonVisible && 
                    <button className='header-form__close' type="button" onClick={clearInput}> 
                        <ClearInputIconElement/> 
                    </button>
                }
            </div>
        </form>
    )
}
