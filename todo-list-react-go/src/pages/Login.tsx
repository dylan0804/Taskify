import React from 'react'
import { Modal, Button, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'

const Login = () => {
    const form = useForm({
        initialValues: {
           email: "",
           password: ""
        }
    })

    const loginUser = async (values: {email: string, password: string}) => {
      const requestBody = {
          email: values.email,
          password: values.password,
        };    
  
      const updated = await fetch('http://localhost:8080/api/login', {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          credentials: 'include',
          body: JSON.stringify(requestBody)
      }).then((r) => r.json());
      
      console.log(updated)
  }
  return (
   <>
          <form action="" onSubmit={form.onSubmit(loginUser)} >
            <TextInput required mb={12} label="Email" placeholder="Input your email"
            {...form.getInputProps("email")}/>
            <Textarea required mb={12} label="Password" placeholder="Input your password" 
            {...form.getInputProps("password")}/>
            <div className='flex justify-center'>
                <Button type="submit">Login</Button>
            </div>
        </form>
   </>
  )
}

export default Login