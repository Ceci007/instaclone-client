import React, { useState } from 'react';
import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";

import Auth from "./pages/Auth/index";

import './App.scss';

function App() {
  const [auth, setAuth] = useState(undefined);

  return (
    <ApolloProvider client={client}>
        { !auth ? <Auth /> : <div>Estas loggeado</div>}
    </ApolloProvider>
  );
}

export default App;
