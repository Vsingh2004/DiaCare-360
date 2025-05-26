import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      try {
        // Split the JWT token (header.payload.signature) and decode the payload
        const base64Url = userToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          window
            .atob(base64)
            .split('')
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
        );
        
        const decoded = JSON.parse(jsonPayload);
        console.log('Decoded Token:', decoded);

        // Set the userId, you can replace this with the correct property
        setUserId(decoded._id || decoded.id); 
      } catch (error) {
        console.error('Invalid token:', error.message);
        setUserId(null);
      }
    } else {
      setUserId(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userId }}>
      {children}
    </AuthContext.Provider>
  );
};
