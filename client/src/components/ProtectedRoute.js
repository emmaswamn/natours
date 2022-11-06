import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedin, path }) => {
    // console.log('protect', isLoggedin);
    // 1. login and false => children
    // 2. other false => '/'
    // 3. login and true => '/'
    // console.log('buildin');
    // console.log('path',path);
    if(!isLoggedin && path === 'login') {

        return children;
    }

    if(!isLoggedin && path === 'signup') {
        return children;
    }

    if (!isLoggedin) {
      return <Navigate to='/notfound' />;
    }

    if(isLoggedin && path === 'login') {
      // console.log('2');
      return <Navigate to='/' />;
    }

    if(isLoggedin && path === 'signup') {
      return <Navigate to='/' />;
    }


  return children;
};

export default ProtectedRoute;