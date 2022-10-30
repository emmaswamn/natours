const MapSec = ({tour}) => {
    return (
        <section className='section-map'>
            <div id='map' datalocations={`${JSON.stringify(tour.locations)}`}></div>
        </section>

    )
};

export default MapSec;