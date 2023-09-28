import React from 'react';
import { User } from '../User';
import useSWR from 'swr';
import { Todo } from '../Todo';
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Typography } from '@material-tailwind/react';

export const Home = ({todos}: {todos: Todo[]}) => {
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
    <div className='p-10 w-full h-screen'>
      {data ? (
        <div>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {todos ? (
          todos.map((todo) => (
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-[275px]">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{todo.todo}</h2>
                <p className="text-gray-600">{todo.description}</p>
                <div className='flex gap-2'>
                  <Chip className='w-min mt-5' color="blue" value={todo.priority} />
                  <Chip className='w-min mt-5' color="green" value={todo.category} />
                </div>
              </div>
              <div className="bg-gray-100 p-4 flex justify-between items-center">
                <button className="text-sm font-semibold text-blue-600 hover:underline">Edit</button>
                <button className="text-sm font-semibold text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
    </div>
  </>
);

};
