import icons from '../../assets/img/icons.svg'
import { Link } from 'react-router-dom';
const Tour = (tour) => {
    const date = new Date(tour.startDates[0]);
    const options = {month: 'long', year: 'numeric'};
    const firstStartDate = Intl.DateTimeFormat('en-us',options).format(date);
    return (
        <div className='card'>
            <div className='card__header'>
                <div className='card__picture-overlay'>&nbsp;</div>
                <img className='card__picture-img' src={require(`../../assets/img/tours/${tour.imageCover}`)} 
                    alt={tour.name} />
                <h3 className='heading-tertirary'>
                    <span>{tour.name}</span>
                </h3>
            </div>
            <div className='card__details'>
                <h4 className='card__sub-heading'>{`${tour.difficulty} ${tour.duration}-day tour`}</h4>
                <p className='card__text'>{tour.summary}</p>
                <div className='card__data'>
                    <svg 
                        className='card__icon'      
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        {/* <use xlinkHref={require('../../assets/img/icons.svg#icon-map-pin')}></use> */}
                        <use xlinkHref={`${icons}#icon-map-pin`}></use>
                    </svg>
                    <span>{tour.startLocation.description}</span>
                </div>
                <div className='card__data'>
                    <svg 
                        className='card__icon'      
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        {/* <use xlinkHref={require('../../assets/img/icons.svg#icon-map-pin')}></use> */}
                        <use xlinkHref={`${icons}#icon-calendar`}></use>
                    </svg>
                    <span>{firstStartDate}</span>
                </div>
                <div className='card__data'>
                    <svg 
                        className='card__icon'      
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        {/* <use xlinkHref={require('../../assets/img/icons.svg#icon-map-pin')}></use> */}
                        <use xlinkHref={`${icons}#icon-flag`}></use>
                    </svg>
                    <span>{`${tour.locations.length} stops`}</span>
                </div>
                <div className='card__data'>
                    <svg 
                        className='card__icon'      
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        {/* <use xlinkHref={require('../../assets/img/icons.svg#icon-map-pin')}></use> */}
                        <use xlinkHref={`${icons}#icon-user`}></use>
                    </svg>
                    <span>{`${tour.maxGroupSize} people`}</span>
                </div>
            </div>
            <div className='card__footer'>
                <p>
                    <span className='card__footer-value'>{`$${tour.price}`}</span>
                    <span className='card__footer-text'> per person</span>
                </p>
                <p className='card__ratings'>
                    <span className='card__footer-value'>{tour.ratingsAverage}</span>
                    <span className='card__footer-text'> {`rating (${tour.ratingsQuantity})`}</span>
                </p>
                <Link className='btn btn--green btn--small' to={`/tour/${tour.slug}`}>Details</Link>
            </div>
        </div>
    );
};
export default Tour;