import { useEffect } from 'react'
import { NavLink } from "react-router-dom"
import { menu } from '../../UIData/aside'
import parse from 'html-react-parser'

export const AsideMenuComponent = () => {
    const defaultQueries = (e) => {
        const link = document.querySelector('.main-menu__link--active')
        link ?
            document.documentElement.style.setProperty("--max-width", "1145px") :
            document.documentElement.style.setProperty("--max-width", "100%")
    }

    useEffect(()=>{
        defaultQueries()
    },[])

    return (
        <nav className='main-menu'>
            <ul className='main-menu__list'>
                {
                    menu.map( item => 
                        <li className='main-menu__item' key={item.uuid}>
                            <NavLink to={item.link} className={({isActive})=> isActive ? 'main-menu__link main-menu__link--active' : 'main-menu__link' }>
                                { parse(item.icon) }
                                <h2 className="main-menu__title is-hidden-mobile">{item.title}</h2>
                            </NavLink>
                        </li>
                    )
                }
            </ul>
        </nav>
    )
}
