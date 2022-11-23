import { footer } from "../../UIData/footer"
import { FooterLinkComponent } from "../03-components/FooterLinkComponent"

export const FooterSection = () => {
    return (
        <footer className="footer is-hidden-mobile">
            {
                footer.map( (array, i) =>  
                    <div className="footer__group" key={i}>
                        { 
                            array.map( item => 
                                <FooterLinkComponent key={item.title}>
                                    {item.title}
                                </FooterLinkComponent> ) 
                        }
                    </div>    
                )
            }
        </footer>
    )
}
