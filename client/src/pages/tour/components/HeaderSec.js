const HeaderSec = ({tour, icons}) => {


    return (
        <section className='section-header'>
        <div className='header__hero'>
            <div className="header__hero-overlay">&nbsp;</div>
            <img src={`/img/tours/${tour.imageCover}`} alt={`${tour.name}`} className="header__hero-img" />
        </div>
        <div className='heading-box'>
            <h1 className="heading-primary">
            <span>{`${tour.name} tour`}</span>
            </h1>
            <div className="heading-box__group">
            <div className="heading-box__detail">
                <svg className="heading-box__icon"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                <use xlinkHref={`${icons}#icon-clock`}></use>
                </svg>
                <span className="heading-box__text">
                {`${tour.duration} days`}
                </span>
            </div>
            <div className="heading-box__detail">
                <svg className="heading-box__icon"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                <use xlinkHref={`${icons}#icon-map-pin`}></use>
                </svg>
                <span className="heading-box__text">
                {tour.startLocation.description}
                </span>
            </div>
            </div>
        </div>
        </section>
    )
   
};

export default HeaderSec;