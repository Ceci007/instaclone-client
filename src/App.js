import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";

import './App.scss';

function App() {
  return (
    <ApolloProvider client={client}>
        <div>
          Hello world
        </div>
    </ApolloProvider>
  );
}

export default App;
