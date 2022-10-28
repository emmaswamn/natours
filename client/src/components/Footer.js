
const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__logo'>
                <img src={require('../assets/img/logo-green.png')} alt='Natours logo' />
            </div>
            <ul className='footer__nav'>
                <li>
                    <a href='https://github.com/emmaswamn'>About us</a>
                </li>
                <li>
                    <a href='https://github.com/emmaswamn'>Download apps</a>
                </li>
                <li>
                    <a href='https://github.com/emmaswamn'>Become a guide</a>
                </li>
                <li>
                    <a href='https://github.com/emmaswamn'>Careers</a>
                </li>
                <li>
                    <a href='https://github.com/emmaswamn'>Contact</a>
                </li>
            </ul>
            <p className='footer__copyright'>&copy; by Emma Han. This is an interview project.</p>
        </footer>
    )
};



export default Footer;