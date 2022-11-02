import { useState } from "react";
import { useDispatch} from "react-redux";
import { updatePassword } from '../../features/user/userSlice'


const UpdatePass = () => {
    const [passwordCurrent, setPasswordCurrent] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [isSame, setIsSame] = useState(true);
    const [isload, setIsload] = useState(false);


    const dispatch = useDispatch();

    const handleSubmit = (e) =>{
        e.preventDefault();
        setIsSame(true);
        if(password !== passwordConfirm) {
            setIsSame(false);
            return;
        }
        setIsload(true);
        dispatch(updatePassword({ passwordCurrent, password, passwordConfirm}));
        setPasswordCurrent('');
        setPassword('');
        setPasswordConfirm('');
        setIsload(false);
    }

    return (
        <>
            <h2 className="heading-secondary ma-bt-md">Password change</h2>
            <form className="form" id="form--password" onSubmit={handleSubmit}>
                <div className="form__group">
                    <label htmlFor="password-current" className="form__label">Current password</label>
                    <input type="password" id="password-current" className="form__input" 
                        placeholder='••••••••'  required  minLength='8'
                        value={passwordCurrent}
                        onChange={(e) => {setPasswordCurrent(e.target.value)}}
                    />
                </div>
                <div className="form__group">
                    <label htmlFor="password" className="form__label">New password</label>
                    <input type="password" id="password" className="form__input" 
                        placeholder='••••••••'  required  minLength='8'
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                </div>
                <div className="form__group ma-bt-lg">
                    <label htmlFor="password-confirm" className="form__label">Confirm password</label>
                    <input type="password" id="password-confirm" className="form__input" 
                        placeholder='••••••••'  required  minLength='8'
                        value={passwordConfirm}
                        onChange={(e) => {setPasswordConfirm(e.target.value)}}
                    />
                    {!isSame && <p style={{color: 'red'}}>Password confirm is not the same.</p>}
                </div>
                <div className="form__group right">
                    <button className="btn btn--small btn--green btn--save-password" disabled={isload}>
                        {isload ? 'Updating...' :'Save password'}
                    </button>
                </div>
            </form>
        </>
    )
};

export default UpdatePass;