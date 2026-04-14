import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      await connectDB();
  
      const session: any = await getSession();
  
      if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
  
      const body = await req.json();
  
      const product = await Product.create({
        ...body,
        user: session.id, // from JWT
      });
  
      return NextResponse.json(product);
    } catch (error) {
      return NextResponse.json({ message: "Error" }, { status: 500 });
    }
  }
  export async function GET() {
    try {
      await connectDB();
  
      const session = await getSession();
  
      if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
  
      const products = await Product.find()
        .populate("user", "name email");
  
      return NextResponse.json(products);
    } catch {
      return NextResponse.json({ message: "Error" }, { status: 500 });
    }
  }