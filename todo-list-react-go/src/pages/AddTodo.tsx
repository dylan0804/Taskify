import React, { useState } from 'react'
import { KeyedMutator } from 'swr'
import { Todo } from '../Todo'
import { v4 as uuid} from 'uuid'
import useSWR from 'swr'


import {
  Input,
  Button,
  Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    ListItemPrefix,
    Radio,
    List,
    ListItem,
    Select,
    Option
} from "@material-tailwind/react";

const AddTodo = ({mutate}: {mutate: KeyedMutator<Todo[]>}) => {

  const [todo, setTodo] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [category, setCategory] = useState('')

  // 
  const createTodo = async () => {

    const requestBody = {
        id: uuid(),
        todo: todo,
        description: description,
        done: false,
        priority: priority,
        category: category,
        user_email: localStorage.getItem("currentEmail")
      };
    
    setTodo('')
    setDescription('')

    const updated = await fetch('http://localhost:8080/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    }).then((r) => r.json());

    mutate(updated);
    console.log('hey')
  };

  const updateTodo = async (todoId:string) => {
    const request = {
      done: true,
    };

    const updated = await fetch(`http://localhost:8080/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }).then((r) => r.json());
    mutate(updated);
  }


  return (
    <>
      {/* <div>
      {data ? (
        data.map((todo) => (
          <div>
            <p>{todo.description}</p>
            <p>{todo.todo}</p>
            <p>{todo.priority}</p>
            <p>{todo.category}</p>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div> */}

    <div className="w-1/2 m-auto">
        <Card className="mt-6 w-full">
          <div className='p-4'>
            <Typography variant='h5' color='blue-gray' className='text-center' >
              Create new task
            </Typography>
                  <CardBody>
                    <form onSubmit={createTodo}>
                      <div className="mb-4 flex flex-col gap-6">
                        <Input size="lg" label="Task" crossOrigin={undefined} value={todo} onChange={(e) => setTodo(e.target.value)} />
                        <Input size="lg" label="Description" crossOrigin={undefined} value={description} onChange={(e) => setDescription(e.target.value)} />
                      </div>
                      <Typography variant='h6'>Priority</Typography>
                      <Card className='w-1/2'>
                      <List className="flex-row">
        <ListItem className="p-0">
          <label
            htmlFor="horizontal-list-react"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                            name="horizontal-list"
                            id="horizontal-list-react"
                            ripple={false}
                            className="hover:before:opacity-0"
                            containerProps={{
                              className: "p-0",
                            }} crossOrigin={undefined}
                            onClick={() => setPriority('high')}             />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              High
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="horizontal-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                            name="horizontal-list"
                            id="horizontal-list-vue"
                            ripple={false}
                            className="hover:before:opacity-0"
                            containerProps={{
                              className: "p-0",
                            }} crossOrigin={undefined}
                            onClick={() => setPriority('medium')}              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              Medium
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="horizontal-list-svelte"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                            name="horizontal-list"
                            id="horizontal-list-svelte"
                            ripple={false}
                            className="hover:before:opacity-0"
                            containerProps={{
                              className: "p-0",
                            }} crossOrigin={undefined}             
                            onClick={() => setPriority('low')} />
            </ListItemPrefix>
                      <Typography color="blue-gray" className="font-medium">
                        Low
                      </Typography>
                    </label>
                  </ListItem>
                </List>
                      </Card>
                      <div className=" w-5 mt-5">
                        <Select label="Category/Tag">
                          <Option onClick={() => setCategory('work')}>Work</Option>
                          <Option onClick={() => setCategory('personal')}>Personal</Option>
                        </Select>
                      </div>
                      <Button type="submit" className="mt-6" fullWidth>
                        Create Todo
                      </Button>
                  </form>
                </CardBody>
          </div>
    </Card>
    </div>
    </>
  )
}

export default AddTodo