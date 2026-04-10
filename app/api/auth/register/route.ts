import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(req: Request ){
    await connectDB();
    const {email , password } = await req.json();
    const hashedPassword = await bcrypt.hash(password , 10)
    const newUser = new User({email , password: hashedPassword})
    await newUser.save()
    try{
        return NextResponse.json({message: "Registered"},{status: 201})
    }catch(err){
        return NextResponse.json({message: "Error registering user"},{status: 500})
    }
}