import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../../redux/actions'
import { toast } from 'react-toastify'

export const ModalFormComponent = ({uuidDoc}) => {
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const { uuid, name, avatar } = useSelector( state => state.UserReducer )
    const avatarDefault = 'https://firebasestorage.googleapis.com/v0/b/roa-03.appspot.com/o/avatars%2Fdefault.jpg?alt=media&token=1fda0c3b-ad35-4815-b508-beaf2cb91b86'

    const sendComment = async(e) => {    
        e.preventDefault()

        const comment = {
            uuidComment: uuidv4(),
            uuidUsername: uuid,
            name: name,
            content: content,
            likes: [],
            timestamp: Date.now(),
            avatar: avatar,
            avatarDefault: avatarDefault
        }
        
        if(!content){
            toast.info("You forgot the message?") 
            return 
        }
        
        dispatch(sendMessage(comment, uuidDoc))
        setContent('') 
    }

    return (
        <form className="modal-form" onSubmit={(e)=>sendComment(e)}>
            <input className="modal-form__input" type="text" placeholder="Add comment..." 
                value={content} 
                onChange={(e)=>setContent(e.target.value)}
            />
            <button className="modal-form__button" type="submit">Post</button>
        </form>
    )
}
