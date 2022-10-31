const Signup = () => {
    return (
        <main className='main'>
            <div className='signup-form'>
                <h2 className='heading-secondary ma-bt-lg'>
                    Create your account
                </h2>
                <form className='form' id='form--signup'>
                    <div className='form__group'>
                        <label htmlFor='firstname' className='form__label' >Firstname</label>
                        <input type='text' id='firstname' className='form__input' placeholder='Enter your firstname' required />
                    </div>
                    <div className='form__group'>
                        <label htmlFor='lastname' className='form__label'>Lastname</label>
                        <input type='text' id='lastname' className='form__input' placeholder='Enter your lastname' required/>
                    </div>
                    <div className='form__group'>
                        <label htmlFor='email' className='form__label'>Email address</label>
                        <input type='email' id='email' className='form__input' placeholder='Enter your email' required />
                    </div>
                    <div className='form__group'>
                        <label htmlFor='password' className='form__label'>Password</label>
                        <input type='password' id='password' className='form__input'  placeholder='••••••••'  required  minLength='8' />
                    </div>
                    <div className='form__group'>
                        <label htmlFor='password-confirm' className='form__label'>Confirm Password</label>
                        <input type='text' id='password-confirm' className='form__input' placeholder='••••••••'  required  minLength='8' />
                    </div>
                    <div className='form__group'>
                        <button className='btn btn--green btn--create'>Create</button>
                    </div>
                </form>
            </div>
        </main>
    )
};

export default Signup;