import React, { useState, useEffect } from 'react';
import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";

import Auth from "./pages/Auth/index";
import { getToken } from "./utils/token";

import './App.scss';

function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    const token = getToken();
    
    if(!token) {
      setAuth(null);
    } else {
      setAuth(token);
    }
  }, []);
 
  return (
    <ApolloProvider client={client}>
        { !auth ? <Auth /> : <div>Estas loggeado</div>}
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
    </ApolloProvider>
  );
}

export default App;
