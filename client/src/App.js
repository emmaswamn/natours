import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import SharedLayout from './pages/SharedLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector, useDispatch} from 'react-redux';
import { getLogStatu } from './features/auth/authSlice'
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  // console.log(dispatch);
  useEffect(() => {
    dispatch(getLogStatu());
    console.count('app');
  },[])
  const { isLoggedIn } = useSelector((store) => store.auth);
  console.log(isLoggedIn);
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
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
