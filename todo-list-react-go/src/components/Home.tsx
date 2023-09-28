import React from 'react';
import { User } from '../User';
import useSWR from 'swr';
import { Todo } from '../Todo';
import { Chip } from '@material-tailwind/react';
import { Button } from '@mantine/core';

export const Home = ({todosData}: {todosData: Todo[]}) => {

  // Add a console.log statement here to inspect the data
  // console.log(data);

   return (
  <>
    <div className='p-10 w-full h-screen'>
      <div>
      <div className="flex flex-wrap gap-6">
        {todosData ? (
          todosData.map((todo) => (
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-[275px]">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{todo.todo}</h2>
                <p className="text-gray-600 overflow-clip">{todo.description}</p>
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
