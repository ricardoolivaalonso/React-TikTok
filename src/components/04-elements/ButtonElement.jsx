export const ButtonElement = ({children, cta, big, type, onMyClick}) => {
    return (
        <button 
            type={`${type ? type : 'button'}`} 
            className={`button-element ${cta ? 'button-element--cta': ''} ${big ? 'button-element--big': ''}`}
            onClick={onMyClick}
        >
            {children}
        </button>  
    )
}
