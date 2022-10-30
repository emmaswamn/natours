import icons from '../../../assets/img/icons.svg'

const ReviewSec = ({tour}) => {
    console.log(tour.reviews);
    return (
        <section className='section-reviews'>
            <div className="reviews">
                {tour.reviews.map((review) => {
                    return <ReviewCard review={review}key={review.id} />
                })}
            </div>
        </section>
    )
};


const ReviewCard = ({review}) => {
    return (
        <div className='reviews__card'>
            <div className="reviews__avatar">
                <img className='reviews__avatar-img' src={require(`../../../assets/img/users/${review.user.photo}`)}  alt={review.user.name} />
                <h6 className='reviews__user'>{review.user.name}</h6>
            </div>
            <p className="reviews__text">{review.review}</p>
            <div className="reviews__rating">
                {[1, 2, 3, 4, 5].map((star,i) => {
                    return (
                        <svg 
                            className={`reviews__star reviews__star--${review.rating >= star ? 'active' : 'inactive'}`}
                            xmlns='http://www.w3.org/2000/svg'
                            xmlnsXlink='http://www.w3.org/1999/xlink'
                            key={i}
                        >
                            <use xlinkHref={`${icons}#icon-star`}></use>
                        </svg>
                    )
                })}
            </div>
        </div>
    )
}

export default ReviewSec;