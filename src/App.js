import React, { useState, useEffect, useMemo } from 'react';
import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";

import Auth from "./pages/Auth/index";
import { getToken, decodeToken } from "./utils/token";
import AuthContext from './context/AuthContext';
import AppRouter from './routes/AppRouter';

function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    const token = getToken();
    
    if(!token) {
      setAuth(null);
    } else {
      setAuth(decodeToken(token));
    }
  }, []);

  const logout = () => {
    console.log("Logged out");
  }

  const setUser = (user) => {
    setAuth(user);
  }

  const authData = useMemo(
    () => ({
      auth, 
      logout,
      setUser
    }), 
    [auth]
  );

  if(auth === undefined) return null;
 
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
          { !auth ? <Auth /> : <AppRouter /> }
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
