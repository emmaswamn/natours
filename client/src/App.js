import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import SharedLayout from './pages/SharedLayout';
import ProtectedRoute from './components/ProtectedRoute';
import SingleTour from './pages/tour/SingleTour';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Me from './pages/Me'
import Booking from './pages/booking/Booking';
import MyBook from './pages/booking/MyBook';
import { useSelector, useDispatch} from 'react-redux';
import { getLogStatu, trunOfffirst } from './features/auth/authSlice'
import { useEffect } from 'react';
// import { useMemo } from 'react';

function App() {
  const dispatch = useDispatch();

  const { firstLoad } = useSelector((store) => store.auth);
  
  if(firstLoad) {
    // console.count('first');
    dispatch(getLogStatu());
    
    dispatch(trunOfffirst());
  };

  const { isLoggedIn } = useSelector((store) => store.auth);

  useEffect(() => {
    if(!isLoggedIn) {
      // console.count('app');
      dispatch(getLogStatu());
    };
  })

  // const getLog = () => {
  //   if(!isLoggedIn) {
  //     console.count('app');
  //     dispatch(getLogStatu())
  //   };
  // };

  // const getLog2 = useMemo(() => getLog(), [isLoggedIn]);
 
  // console.log('aoolog',isLoggedIn);
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path='login' element={
            <ProtectedRoute isLoggedin={isLoggedIn} path={'login'}>
              <Login />
            </ProtectedRoute>
          } 
        />
        <Route path='tour/:tourId' element={
            <ProtectedRoute isLoggedin={isLoggedIn}>
              <SingleTour />
            </ProtectedRoute>
          } 
        />
        <Route path='signup' element={
            <ProtectedRoute isLoggedin={isLoggedIn} path={'signup'}>
              <Signup />
            </ProtectedRoute>
          } 
        />
        <Route path='me' element={
            <ProtectedRoute isLoggedin={isLoggedIn}>
              <Me />
            </ProtectedRoute>
          } 
        />

        <Route path='booking/:tourId' element={
            <ProtectedRoute isLoggedin={isLoggedIn}>
              <Booking />
            </ProtectedRoute>
          } 
        />
        <Route path='my-tours' element={
            <ProtectedRoute isLoggedin={isLoggedIn}>
              <MyBook />
            </ProtectedRoute>
          } 
        />

        <Route path='notfound' element={<NotFound />} />
      </Route>
      <Route
        path="*"
        element={<Navigate to="/notfound" replace />}
      />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
