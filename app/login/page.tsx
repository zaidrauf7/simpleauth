"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("api/auth/login" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
      })
      if(response.ok){
        console.log("Logged in successfully");
        alert("Logged in successfully")
        router.push("/dashboard")
      }else{
        console.log("Login failed");
        alert("Login failed")
      }

    }catch(error){
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Login Page</h1>
      <form action="" onSubmit={handleSubmit}>
      <input type="email" onChange={(e)=>{setEmail(e.target.value)}} name="email" placeholder='Email' required />
      <input type="password" onChange={(e)=>{setPassword(e.target.value)}}  name="password" placeholder='Password' required />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default page