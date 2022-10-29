import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedin }) => {
    console.log('islogin', isLoggedin);
    // 1. login and false => children
    // 2. other false => '/'
    // 3. login and true => '/'
    if(!isLoggedin && children.type.name === 'Login') {
        return children;
    }

    if (!isLoggedin) {
        return <Navigate to='/' />;
    }

    if(isLoggedin && children.type.name === 'Login') {
      return <Navigate to='/' />;
    }

  return children;
};

export default ProtectedRoute;