import React from 'react'
import { User } from '../User'
import { KeyedMutator } from 'swr'

const Register = () => {
    

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

        localStorage.setItem("currentEmail", requestBody.email)
        console.log(localStorage.getItem("currentEmail"))
    }

  return (
   <>
         <div>hey</div>
   </>
  )
}

export default Register