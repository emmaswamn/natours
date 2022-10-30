import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CtaSec = ({tour}) => {
    const {isLoggedIn} = useSelector((state) => state.auth);
    // console.log(tour.images);
    return (
        <section className='section-cta'>
            <div className='cta'>
                <div className='cta__img cta__img--logo'>
                    <img src={require('../../../assets/img/logo-white.png')} alt='Natours logo' />
                </div>
                <img src={require(`../../../assets/img/tours/${tour.images[1]}`)} alt='' className='cta__img cta__img--2' />
                <img src={require(`../../../assets/img/tours/${tour.images[2]}`)} alt='' className='cta__img cta__img--1' />
                <div className='cta__content'>
                    <h2 className="heading-secondary">
                        What are you waiting for?
                    </h2>
                    <p className="cta__text">{`${tour.duration} days. 1 adventure. Infinite memories. Make it yours today!`}</p>
                    {isLoggedIn ? <BookBtn tour={tour} /> : <LoginLink /> }
                </div>
            </div>
        </section>

    )
};

const BookBtn = ({tour}) => {
    return( 
        <button className='btn btn--green span-all-rows' id='book-tour' datatourid={`${tour.id}`}>
            Book tour now!
        </button>
    )
};

const LoginLink = () => {
    return <Link className='btn btn--green span-all-rows' to='/login'>Log in to book tour</Link>
}

export default CtaSec;