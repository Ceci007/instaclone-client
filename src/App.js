import React, { useState, useEffect, useMemo } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";

import { getToken, decodeToken } from "./utils/token";
import AuthContext from './context/AuthContext';

import RegisterPage from './pages/Auth/RegisterPage';
import LoginPage from './pages/Auth/LoginPage';
import HomePage from './pages/Home/HomePage';
import UserPage from './pages/UserPage';
import BasicLayout from './layouts/BasicLayout';

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
          <Routes>
            {!auth && (
              <>
                 <Route
                  path="/register"
                  element={<RegisterPage />}
                />
                <Route
                  path="/login"
                  element={<LoginPage />}
                />
              </>
            )}

            {auth && (
              <>
                <Route
                  path="/"
                  element={
                    <BasicLayout>
                      <HomePage />
                    </BasicLayout>
                  }
                />
                <Route path="/:username" element={
                  <BasicLayout>
                    <UserPage />
                  </BasicLayout>
                  } 
                />
              </>
            )}
            <Route path="*" element={<Navigate to={auth ? "/" : "/login"} />} />
          </Routes>
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
