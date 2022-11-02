import { useState } from "react";
import { useDispatch,  useSelector} from "react-redux";
import { userSignup } from '../features/auth/authSlice'

const Signup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isSame, setIsSame] = useState(true);
    const [isload, setIsload] = useState(false);

    const { isLoggedIn } = useSelector((store) => store.auth);

    const dispatch = useDispatch();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsSame(true);
        if(password !== passwordConfirm) {
            setIsSame(false);
            return;
        }
        setIsload(true);
        const name = firstname + ' ' + lastname;
        dispatch(userSignup({name, email,password, passwordConfirm}));
        console.log('Signup');
        if (!isLoggedIn){ 
            setIsload(false)
        };
    };

    return (
        <main className='main'>
            <div className='signup-form'>
                <h2 className='heading-secondary ma-bt-lg'>
                    Create your account
                </h2>
                <form className='form' id='form--signup' onSubmit={handleSubmit}>
                    <div className='form__group'>
                        <label htmlFor='firstname' className='form__label' >Firstname</label>
                        <input type='text' id='firstname' 
                            value={firstname} onChange={(e) => setFirstname(e.target.value)}
                            className='form__input' placeholder='Enter your firstname' required 
                        />
                    </div>
                    <div className='form__group'>
                        <label htmlFor='lastname' className='form__label'>Lastname</label>
                        <input type='text' id='lastname'
                            value={lastname} onChange={(e) => setLastname(e.target.value)}
                            className='form__input' placeholder='Enter your lastname' required
                        />
                    </div>
                    <div className='form__group'>
                        <label htmlFor='email' className='form__label'>Email address</label>
                        <input type='email' id='email' 
                            value={email} onChange={(e) => setEmail(e.target.value)}                            
                            className='form__input' placeholder='Enter your email' required
                         />
                    </div>
                    <div className='form__group'>
                        <label htmlFor='password' className='form__label'>Password</label>
                        <input type='password' id='password'
                            value={password} onChange={(e) => setPassword(e.target.value)} 
                            className='form__input'  placeholder='••••••••'  required  minLength='8' 
                        />
                    </div>
                    <div className='form__group'>
                        <label htmlFor='password-confirm' className='form__label'>Confirm Password</label>
                        <input type='password' id='password-confirm' 
                            value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} 
                            className='form__input' placeholder='••••••••'  required  minLength='8' 
                        />
                        {!isSame && <p style={{color: 'red'}}>Password confirm is not the same.</p>}
                    </div>
                    <div className='form__group'>
                        <button className='btn btn--green btn--create' disabled={isload}>Create</button>
                    </div>
                </form>
            </div>
        </main>
    )
};

export default Signup;