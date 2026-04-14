import { connectDB } from "@/lib/db";
import Comment from "@/models/Comment";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      await connectDB();
  
      const session: any = await getSession();
  
      if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
  
      const { text, productId } = await req.json();
  
      const comment = await Comment.create({
        text,
        product: productId,
        user: session.id,
      });
  
      return NextResponse.json(comment);
    } catch {
      return NextResponse.json({ message: "Error" }, { status: 500 });
    }
  }
  export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");
  
    await connectDB();
  
    const comments = await Comment.find({ product: productId })
      .populate("user", "name email");
  
    return NextResponse.json(comments);
  }