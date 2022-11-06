import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <main className='main'>
            <div className="error">
                <div className="error__title">
                    <h2 className="heading-secondary heading-secondary--error">Uh oh! Something went wrong!</h2>
                    <h2 className="error__emoji">😢 🤯</h2>
                </div>
                <div className="error__msg"> Go back to <Link className='back__el' to='/'>HomePage</Link></div>
            </div>
        </main>
    )
};

export default NotFound;