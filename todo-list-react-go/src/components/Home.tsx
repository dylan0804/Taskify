import React from 'react';
import { User } from '../User';
import useSWR from 'swr';

export const Home = () => {
  const { data } = useSWR<User>("http://localhost:8080/api/user", async (url) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies if necessary for authentication
    });
    return response.json();
  });

  // Add a console.log statement here to inspect the data
  console.log(data);

   return (
  <>
    <div>
      {data ? (
        <div>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  </>
);

};
