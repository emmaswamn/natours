import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const {username, photo} = useSelector((store) => store.user);
    return (
        <header className='header'>
            <nav className='nav nav--tours'>
                <Link className='nav__el' to='/'>All tours</Link>
            </nav>
            <div className='header__logo'>
                <img src={require('../assets/img/logo-white.png')} alt='Natours logo' />
            </div>
            <nav className='nav nav--user'>
                {username && <Logout username={username} photo={photo}/>}
                {!username && <Login />}
            </nav>
        </header>
    )
};

const Logout = ({photo, username}) => {
    return (
        <>
            <button className='nav__el nav__el--logout'>
                Log out
            </button>
            <Link className='nav__el' to='/me'>
                <img className='nav__user-img' src={photo} alt={`${username}`} />
                <span>{`${username.split(' ')[0]}`}</span>
            </Link>
        </>
    )
};

const Login = () => {
    return (
        <>
            <Link className='nav__el' to='/login'>Log in</Link>
            <Link className='nav__el nav__el--cta' to='/signup'>Sign up</Link>
        </>
    )
}

export default Header;