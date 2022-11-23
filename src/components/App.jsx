import { useEffect } from "react"
import { useSelector, useDispatch  } from "react-redux"
import { Routes, Route, Navigate } from "react-router-dom"
// 
import { HeaderSection } from './02-sections/HeaderSection'
import { HomePage } from "./01-pages/HomePage"
import { ForYouPage } from "./01-pages/ForYouPage"
import { FollowingPage } from "./01-pages/FollowingPage"
import { UploadPage } from "./01-pages/UploadPage"
import { ModalSection } from "./02-sections/ModalSection"
import { AuthSection } from "./02-sections/AuthSection"

import { getSession, getUsers} from "../redux/actions"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	const dispatch = useDispatch()

	const { isUserLogged } = useSelector(state => state.LoggedReducer)
	const isModalOpen = useSelector(state => state.ModalReducer.isOpen)
	const isAuthOpen = useSelector(state => state.AuthReducer.isOpen)

	useEffect(() => {
		dispatch(getSession())
		dispatch(getUsers())
	}, [])

	return (
		<div className="wrapper">
			<ToastContainer position="top-center" autoClose={2000} pauseOnHover={false} pauseOnFocusLoss={false}/>
			<HeaderSection />
			<Routes>
				<Route path="/" element={<Navigate to="/foryou" replace />}  />
				<Route path="/:uuid" element={<HomePage />} />
				<Route path="foryou" element={<ForYouPage />} />
				<Route path="following" element={<FollowingPage />} />
				{
					!isUserLogged ? 
					<Route path="upload" element={<Navigate to="/" replace />} /> :
					<Route path="upload" element={<UploadPage />} />
				}
			</Routes>
			{ isModalOpen && <ModalSection />}
			{ isAuthOpen && <AuthSection />}
		</div>
	)
}

export default App