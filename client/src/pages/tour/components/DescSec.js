import icons from '../../../assets/img/icons.svg'

const DescSec = ({tour}) => {

    const date = new Date(tour.startDates[0]);
    const options = {month: 'long', year: 'numeric'};
    const firstStartDate = Intl.DateTimeFormat('en-us',options).format(date);
    const paragraphs = tour.description.split('\n');
    return (
        <section className='section-description'>
            <div className="overview-box">
                <div>
                    <div className="overview-box__group">
                        <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                        <OverviewBox  label={'Next date'} text={firstStartDate} icon={'calendar'}/>
                        <OverviewBox  label={'Difficulty'} text={tour.difficulty} icon={'trending-up'}/>
                        <OverviewBox  label={'Participants'} text={`${tour.maxGroupSize} people`} icon={'user'}/>
                        <OverviewBox  label={'Rating'} text={tour.ratingsAverage} icon={'star'}/>
                    </div>
                    <div className="overview-box__group">
                        <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
                        {tour.guides.map((guide) => {
                            return <GuideOverview guide={guide} key={guide._id}/>
                        })}
                    </div>
                </div>
            </div>
            <div className="description-box">
                <h2 className="heading-secondary ma-bt-lg">{`${tour.name} tour`}</h2>
                {paragraphs.map((p, i) => {
                    return <p className='description__text' key={i}>{p}</p>
                })}
            </div>
        </section>

    )
 
};

const OverviewBox = ({label, text, icon}) => {
    return (
        <div className='overview-box__detail'>
            <svg className="overview-box__icon"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <use xlinkHref={`${icons}#icon-${icon}`}></use>
            </svg>
            <span className="overview-box__label">{label}</span>
            <span className="overview-box__text">{text}</span>
        </div>
    )
};

const GuideOverview = ({guide}) => {
    let role;
    if (guide.role === 'lead-guide') {
        role = 'Lead guide';
    }
    if(guide.role === 'guide') {
        role = 'Tour guide';
    }
    return (
        <div className='overview-box__detail'>
            <img className='overview-box__img' src={require(`../../../assets/img/users/${guide.photo}`)} alt={guide.name} />
            <span className="overview-box__label">{role}</span>
            <span className="overview-box__text">{guide.name}</span>
        </div>
    )
}

export default DescSec;