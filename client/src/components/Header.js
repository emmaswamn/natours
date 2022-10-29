import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { useDispatch } from "react-redux";
import {userLogout} from '../features/auth/authSlice';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


const Header = () => {
    
    const { isLoggedIn } = useSelector((store) => store.auth);
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
                {isLoggedIn && username && <Logout username={username} photo={photo}/>}
                {!isLoggedIn && !username && <Login />}
            </nav>
        </header>
    )
};

const Logout = ({photo, username}) => {
    const [isload, setIsload] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        setIsload(true);
        dispatch(userLogout());
        setTimeout(() => {
            navigate('/');
        }, 1500);
        setIsload(false);
    };
    return (
        <>
            <button className='nav__el nav__el--logout' disabled={isload} onClick={handleLogout}>
                Log out
            </button>
            <Link className='nav__el' to='/me'>
                <img className='nav__user-img' src={require(`../assets/img/users/${photo}`)} alt={`${username}`} />
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