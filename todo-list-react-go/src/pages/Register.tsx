import React from 'react'
import { Modal, Button, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { User } from '../User'
import { KeyedMutator } from 'swr'

const Register = () => {
    const form = useForm({
        initialValues: {
           name: "",
           email: "",
           password: ""
        }
    })

    const registerUser = async (values: {name: string, email: string, password: string}) => {
        const requestBody = {
            name: values.name,
            email: values.email,
            password: values.password,
          };    
    
        const updated = await fetch('http://localhost:8080/api/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        }).then((r) => r.json());
        
        console.log(updated)
    }

  return (
   <>
          <form action="" onSubmit={form.onSubmit(registerUser)} >
          <TextInput required mb={12} label="Name" placeholder="Input your name"
            {...form.getInputProps("name")}/>
            <TextInput required mb={12} label="Email" placeholder="Input your email"
            {...form.getInputProps("email")}/>
            <Textarea required mb={12} label="Password" placeholder="Input your password" 
            {...form.getInputProps("password")}/>
            <div className='flex justify-center'>
                <Button type="submit">Register</Button>
            </div>
        </form>
   </>
  )
}

export default Register