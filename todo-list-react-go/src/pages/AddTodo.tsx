import React, { useState } from 'react'
import { Modal, Button, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { KeyedMutator } from 'swr'
import { Todo } from '../Todo'
import { v4 as uuid} from 'uuid'
import useSWR from 'swr'

const AddTodo = () => {
  const fetcher = (url:string) => fetch(url).then((res) => res.json());
  const { data, mutate, error } = useSWR<Todo[]>("http://localhost:8080", fetcher);

  const [open, setOpen] = useState(false)
  const form = useForm({
    initialValues: {
       todo: "",
       description: ""
    }
  })
  // 
  const createTodo = async (values: { todo: string, description: string }) => {

    const requestBody = {
        id: uuid(),
        todo: values.todo,
        description: values.description,
        done: false
      };    

    const updated = await fetch('http://localhost:8080/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    }).then((r) => r.json());

    mutate(updated);
    form.reset();
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
      <div>
      {data ? (
        data.map((todo) => (
          <div>
            <p>{todo.description}</p>
            <p>{todo.todo}</p>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>

      <Modal opened={open} onClose={() => setOpen(false)} title="Authentication">
      <form action="" onSubmit={form.onSubmit(createTodo)} >
            <TextInput required mb={12} label="Todo" placeholder="What do you want to do?" 
            {...form.getInputProps("todo")}/>
            <Textarea required mb={12} label="Description" placeholder="Description" 
            {...form.getInputProps("description")}/>
            <div className='flex justify-center'>
                <Button onClick={() => setOpen(false)} type="submit">Create project</Button>
            </div>
        </form>
      </Modal>

      <Button type="submit" onClick={() => setOpen(true)}>Open modal</Button>
    </>
  )
}

export default AddTodo