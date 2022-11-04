import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'



const MapSec = ({tour}) => {
    // console.log(tour.locations);
    const loc1 = tour.locations[0].coordinates;
    return (
        <section className='section-map'>
            <MapContainer center={[loc1[1], loc1[0]]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {tour.locations.map((loc) => {
                    // console.log([loc.coordinates[1], loc.coordinates[0]]);
                    return (
                        <Marker position={[loc.coordinates[1], loc.coordinates[0]]} key={loc._id}>
                            <Popup>
                                <div>
                                    <p>Day {loc.day}: {loc.description}</p>
                                </div>
                            </Popup>
                        </Marker>
                    )
                })}
                {/* <Marker position={[51.417611, -116.214531]} key={'67898'}>
                    <Popup>
                        My popup.
                    </Popup>
                </Marker> */}
            </MapContainer>
        </section>

    )
};

export default MapSec;