import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getTour } from '../../features/tours/tourSlice'
import icons from '../../assets/img/icons.svg'
import HeaderSec from './components/HeaderSec';
import DescSec from './components/DescSec';
import PictSec from './components/PictSec';
import MapSec from './components/MapSec';
import ReviewSec from './components/ReviewSec';
import CtaSec from './components/CtaSec';

const SingleTour = () => {
  const { tourId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTour(tourId));
  },[]);

  const { tour } = useSelector((state) => state.tour);
  if(JSON.stringify(tour) !== '{}') {
    return (
      <>
        <HeaderSec tour={tour} icons={icons} />
        <DescSec tour={tour}/>
        <PictSec tour={tour}/>
        <MapSec tour={tour} />
        <ReviewSec tour={tour}/>
        <CtaSec tour={tour} />
      </>
    )
  }
}

export default SingleTour;
