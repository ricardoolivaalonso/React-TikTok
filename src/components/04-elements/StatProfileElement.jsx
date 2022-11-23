export const StatProfileElement = ({counter, category}) => {
    return (
        <div className="profile-header__stats-item">
            <strong className="profile-header__stats-counter">{counter}</strong>
            <span className="profile-header__stats-category">{category}</span>
        </div>
    )
}
