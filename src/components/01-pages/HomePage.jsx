import { useSelector } from 'react-redux'
import { useLocation  } from 'react-router-dom'
import { AsideSection } from '../02-sections/AsideSection'
import { ProfileSection } from '../02-sections/ProfileSection'

export const HomePage = () => {
    const { pathname } = useLocation()
    const { following } = useSelector(state => state.UsersReducer )
    const currentUser = following.find(user => user.uuid ==  pathname.split('/')[1])

    return (
        <main className='main-content'>
			<AsideSection />
            <ProfileSection currentUser={currentUser}/>
        </main>
    )
}
