import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getTour } from '../../features/tours/tourSlice'

const SingleTour = () => {
  const { tourId } = useParams();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getTour(tourId));
  // },[]);

  const { tour } = useSelector((state) => state.tour);
  // console.log(tour);
  return (
    <div>
      singletour
    </div>
  )
}

export default SingleTour;
