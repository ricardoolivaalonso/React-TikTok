export const SubtitleAsideElement = ({children, cta}) => {
    return (
        <a className={`subtitle-aside is-hidden-mobile ${cta ? 'subtitle-aside--cta': ''}`}>{children}</a>
    )
}
