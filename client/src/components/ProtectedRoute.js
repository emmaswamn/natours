import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedin }) => {
    console.log('protect', isLoggedin);
    // 1. login and false => children
    // 2. other false => '/'
    // 3. login and true => '/'
    if(!isLoggedin && children.type.name === 'Login') {
        return children;
    }

    if(!isLoggedin && children.type.name === 'Signup') {
        return children;
    }

    if (!isLoggedin) {
      return <Navigate to='/notfound' />;
    }

    if(isLoggedin && children.type.name === 'Login') {
      console.log('2');
      return <Navigate to='/' />;
    }

    if(isLoggedin && children.type.name === 'Signup') {
      return <Navigate to='/' />;
    }

  return children;
};

export default ProtectedRoute;