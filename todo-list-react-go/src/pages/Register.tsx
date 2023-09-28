import React, { useState } from 'react'
import { User } from '../User'
import { KeyedMutator } from 'swr'
import { Button, Card, CardBody, Input, Typography } from '@material-tailwind/react'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const requestBody = {
            name: name,
            email: email,
            password: password,
          };    
    
        const updated = await fetch('http://localhost:8080/api/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
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
              Register
            </Typography>
                  <CardBody>
                    <form onSubmit={(e) => registerUser(e)}>
                      <div className="mb-4 flex flex-col gap-6">
                        <Input size="lg" label="Name" crossOrigin={undefined} value={name} onChange={(e) => setName(e.target.value)} />
                        <Input size="lg" label="Email" crossOrigin={undefined} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input size="lg" label="Password" crossOrigin={undefined} value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <Button type="submit" className="mt-6" fullWidth>
                        Register
                      </Button>
                  </form>
                </CardBody>
          </div>
    </Card>
    </div>
   </>
  )
}

export default Register