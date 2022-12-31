import PropTypes from 'prop-types'

const Header = ({ username }) => {
    return (
        <div>
            <header>
                <h3>{username}, welcome to </h3>
                <h1>Anime Guessing Game!</h1>
            </header>
        </div>
    )
}

Header.defaultProps = {
    username: 'Unknown',
}

Header.propTypes = {
    username: PropTypes.string.isRequired,
}


export default Header