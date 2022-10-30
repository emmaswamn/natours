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
  // 问题1，使用useeffect， 它会在所有外部代码运行完之后，再运行
  // 所以，每次刷新非首页，都会回到首页，因为一瞬间isloggedin为false了
  // 但如果写在外面，那么login 和 logout会造成header rerender
  // 因为login 的Protected route, logout的navigate，都会回到首页
  // 重新load app，导致
  // if(!isLoggedIn) dispatch(getLogStatu());
  // 要么选择 1.每次刷新后回到首页 2.出warning

  // 转移到home失败，必须要在app中完成，也不能使用useEffect
  // 只能从login和 logout里想办法了，login 已经被!isloggedin拦住
  // 只剩下logout, 如何使dispatch进入useEffect
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
