import React, { useState } from 'react';
import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";

import Auth from "./pages/Auth/index";

import './App.scss';

function App() {
  const [auth, setAuth] = useState(undefined);
 
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
