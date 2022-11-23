import { useSelector } from "react-redux"
import { AsideMenuComponent } from "../03-components/AsideMenuComponent"
import { SubtitleAsideElement } from "../04-elements/SubtitleAsideElement"
import { AsideCardComponent } from "../03-components/AsideCardComponent"
import { FooterSection } from "./FooterSection"

export const AsideSection = () => {
    const { uuid } = useSelector( state => state.UserReducer )
    const { following } = useSelector( state => state.UsersReducer )

    return (
        <aside className='aside'>
            <AsideMenuComponent />

            <section className="following">
                <SubtitleAsideElement>Following accounts</SubtitleAsideElement>
                { 
                    following.slice(0, 9).map( user => {
                        if( uuid !== user.uuid) return <AsideCardComponent key={ user.uuid } data={ user }/>
                    }) 
                }
                <SubtitleAsideElement cta>See more</SubtitleAsideElement>
            </section>
            
           <FooterSection />
        </aside>
    )
}
