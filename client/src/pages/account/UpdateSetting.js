import { useSelector } from 'react-redux'
import { useState } from 'react';

const UpdateSetting = () => {
    const {username, email, photo} = useSelector((store) => store.user);
    const [userName, setUserName] = useState(username);
    const [userEmail, setUserEmail] = useState(email);
    const [userPhoto, setUserPhoto] = useState('');


    const handleUpload = (e) => {
        console.log(e.target.files[0]);
        setUserPhoto(e.target.files[0]);
    }

    return (
        <>
            <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
            <form className="form form-user-data" id="form--update">
                <div className="form__group">
                    <label htmlFor="name" className="form__label">Name</label>
                    <input type="text" required id="name" className="form__input"
                        value={userName} onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="form__group ma-bt-md">
                    <label htmlFor="email" className="form__label">Email address</label>
                    <input type="text" id="email" className="form__input" 
                        value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                    />
                </div>
                <div className="form__group form__photo-upload">
                    {photo && <img src={require(`../../assets/img/users/${photo}`)} alt="" className="form__user-photo" />}
                    <input type="file" accepet='image/*' className="form__upload" id='photo' name='photo'
                        onChange={handleUpload}
                    />
                    <label htmlFor="photo">Choose new photo</label>
                </div>
                <div className="form__group right">
                    <button className="btn btn--small btn--green">Save settings</button>
                </div>
            </form>
        </>
    )
    
};

export default UpdateSetting;