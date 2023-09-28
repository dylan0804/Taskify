import { Button, Card, CardBody, Input, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react';
import React from 'react'
import { useState } from 'react';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const requestBody = {
          email: email,
          password: password,
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

      localStorage.setItem("currentEmail", requestBody.email)
      console.log(localStorage.getItem("currentEmail"))
  }
  return (
   <>
        <div className="w-1/2 m-auto">
        <Card className="mt-6 w-full">
          <div className='p-4'>
            <Typography variant='h5' color='blue-gray' className='text-center' >
              Login
            </Typography>
                  <CardBody>
                    <form onSubmit={(e) => loginUser(e)}>
                      <div className="mb-4 flex flex-col gap-6">
                        <Input size="lg" label="Email" crossOrigin={undefined} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input size="lg" label="Password" crossOrigin={undefined} value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <Button type="submit" className="mt-6" fullWidth>
                        Login
                      </Button>
                  </form>
                </CardBody>
          </div>
    </Card>
    </div>
   </>
  )
}

export default Login