const PictSec = ({tour}) => {
    // console.log(tour.images);
    return (
        <section className='section-pictures'>
            {tour.images.map((img, index) => {
                return (
                    <div className='picture-box' key={index}>
                        <img 
                            className={`picture-box__img picture-box__img--${index + 1}`}
                            src={require(`../../../assets/img/tours/${img}`)} 
                            alt={`${tour.name} ${index + 1}`} 
                        />
                    </div>
                )
            })}
        </section>

    )
};

export default PictSec;