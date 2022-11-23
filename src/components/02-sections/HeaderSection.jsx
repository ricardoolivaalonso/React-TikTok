import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { openAuthModalAction } from '../../redux/actions/auth'

import { LogoElement } from '../04-elements/LogoElement'
import { LogoMobileElement } from '../04-elements/LogoMobileElement'
import { HeaderFormComponent } from '../03-components/HeaderFormComponent'
import { HeaderActionsComponent } from '../03-components/HeaderActionsComponent'
import { ButtonElement } from '../04-elements/ButtonElement'

export const HeaderSection = () => {
    const dispatch = useDispatch()
	const navigate = useNavigate()
    const { isUserLogged } = useSelector(state => state.LoggedReducer)
    const data = useSelector(state => state.UserReducer)

    return (
        <header className='header'>
            <button className='header-logos' onClick={()=>navigate(`/foryou`)}>
                <LogoElement data={data}/>
                <LogoMobileElement />
            </button>
            
            <HeaderFormComponent />

            { 
                isUserLogged ? 
                    <HeaderActionsComponent data={data}/> : 
                    <ButtonElement cta onMyClick={()=>dispatch(openAuthModalAction())}>Log in</ButtonElement> 
            }
        </header>
    )
}
