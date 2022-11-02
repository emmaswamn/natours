import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { useDispatch } from "react-redux";
import {userLogout} from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
// import { getLogStatu } from '../features/auth/authSlice';
// import { useEffect } from 'react';
// import { useState } from 'react';


const Header = () => {
    // const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((store) => store.auth);
    const {username, photo} = useSelector((store) => store.user);
    // console.log(username);
    // useEffect(() => {
    //     dispatch(getLogStatu());
    //     console.count('header');
    //   },[])

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
                {!isLoggedIn && !username  && <Login />}
            </nav>
        </header>
    )
};

const Logout = ({photo, username}) => {


    const dispatch = useDispatch();
    // let navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();

        console.log('logout');
        dispatch(userLogout());

    };

    
    return (
        <>
            <button className='nav__el nav__el--logout' onClick={handleLogout}>
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