import React, { useState } from 'react'
import { Modal, Button, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { KeyedMutator } from 'swr'
import { Todo } from '../App'

const AddTodo = ({mutate}: {mutate : KeyedMutator<Todo[]>}) => {
  const [open, setOpen] = useState(false)
  const form = useForm({
    initialValues: {
       name: "",
       description: ""
    }
  })

  // 
  const createTodo = async (values: { name: string }) => {
    const updated = await fetch('http://localhost:8080/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    }).then((r) => r.json());

    mutate(updated);
    form.reset();
  };


  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Authentication">
      <form action="" onSubmit={form.onSubmit(createTodo)} >
            <TextInput required mb={12} label="Todo" placeholder="What do you want to do?" 
            {...form.getInputProps("name")}/>
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