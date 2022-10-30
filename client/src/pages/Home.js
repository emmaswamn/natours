import Tour from './tour/Tour'
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { getAllTours } from '../features/tours/tourSlice'



const Home = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    // console.count('home');
    dispatch(getAllTours());
  },[])
  const {allTours} = useSelector((store) => store.tour);
  return (
    <main className='main'>
      <div className='card-container'>
        {allTours.map((tour) => {
          return <Tour {...tour} key={tour.id}/>
        })}
      </div>
    </main>
  );
};
export default Home;