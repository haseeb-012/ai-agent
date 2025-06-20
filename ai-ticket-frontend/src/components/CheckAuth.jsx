import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function CheckAuth({children, protected: isProtected}) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if(isProtected){
      // Protected route - requires authentication
      if(!token){
        navigate('/login');
      } else {
        setLoading(false);
      }
    } else {
      // Non-protected route - accessible when logged out
      if(token){
        navigate('/');
      } else {
        setLoading(false);
      }
    }
  }, [navigate, isProtected]);
  
  if(loading) {
    return <div>Loading...</div>
  }
  
  return children;
}

export default CheckAuth