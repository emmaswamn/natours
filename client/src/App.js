import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import SharedLayout from './pages/SharedLayout';
import ProtectedRoute from './components/ProtectedRoute';
import SingleTour from './pages/tour/SingleTour';
import NotFound from './pages/NotFound';
import { useSelector, useDispatch} from 'react-redux';
import { getLogStatu } from './features/auth/authSlice'
// import { useEffect } from 'react';
import { useMemo } from 'react';

function App() {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((store) => store.auth);

  const getLog = () => {
    if(!isLoggedIn) {
      console.count('app');
      dispatch(getLogStatu())
    };
  };

  const getLog2 = useMemo(() => getLog(), [isLoggedIn]);
 
  console.log('aoolog',isLoggedIn);
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path='login' element={
            <ProtectedRoute isLoggedin={isLoggedIn}>
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
        {/* <Route path='tour/:tourId' element={

              <SingleTour />
 
          } 
        /> */}
        <Route path='notfound' element={<NotFound />} />
      </Route>
      {/* <Route
        path="*"
        element={<Navigate to="/notfound" replace />}
      /> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
