import React, { useState } from "react";
import { ApolloProvider, useQuery } from "@apollo/client";
import client from "./apolloClient";
import { GET_DOMAINS, GET_SINGLE_DOMAIN } from "./queries";

function DomainsList() {
  const { loading, error, data, refetch } = useQuery(GET_DOMAINS, {
    variables: { nameFilter: "%" },
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    refetch({ nameFilter: `%${term}%` });
    setSearchTerm(term);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search ENS domains..."
      />
      <ul>
        {data.domains.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>ENS Domains</h1>
        <DomainsList />
      </div>
    </ApolloProvider>
  );
}

export default App;
