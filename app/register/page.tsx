"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
const page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("api/auth/register" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
      })
      
      if(response.ok){
        console.log("Registered successfully");
        router.push("/login")
        
        alert("Registered successfully")
      }else{
        console.log("Registration failed");
        alert("Registration failed")
      }

    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div>
      <h1>Register</h1>
      <form  onSubmit={handleSubmit}>
        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} name="email" placeholder='Email' required />
        <input type="password" onChange={(e)=>{setPassword(e.target.value)}}  name="password" placeholder='Password' required />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default page