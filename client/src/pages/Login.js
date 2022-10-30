import { useState } from "react";
import {userLogin} from '../features/auth/authSlice';
import { useDispatch } from "react-redux";
import { useSelector} from 'react-redux';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isload, setIsload] = useState(false);
    const { isLoggedIn } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsload(true);
        dispatch(userLogin({email,password}));
        // console.log('1');
        if (!isLoggedIn){ 
            setIsload(false)
        };
    };
    return (
        <main className='main'>
            <div className='login-form'>
                <h2 className='heading-secondary ma-bt-lg'>
                    Log into your account
                </h2>
                <form className='form' id='form--login' onSubmit={handleSubmit}>
                    <div className='form__group'>
                        <label className='form__label' htmlFor='email'>
                            Email address
                        </label>
                        <input 
                            type='email' placeholder='you@example.com' required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='form__input' id='email'
                        />
                    </div>
                    <div className='form__group'>
                        <label className='form__label' htmlFor='password'>
                            Password
                        </label>
                        <input 
                            type='password' placeholder='••••••••' required minLength='8'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='form__input' id='password'
                        />
                    </div>
                    <div className='form__group'>
                        <button className='btn btn--green' disabled={isload}>{isload ? 'isLoading' :'Login'}</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login;