import jwt from "jsonwebtoken"
import {cookies} from "next/headers"
//! means I know for a fact that this value is not null or undefined right now, so don't give me a type error.
const SECRET = process.env.JWT_SECRET!;

// This function is used during Login or Signup.
export function createToken(payload: any) {
    return jwt.sign(payload, SECRET, { expiresIn: "1d" });
  }
  // expiresIn: "1d": The token will automatically become invalid after 24 hours, forcing the user to log in again for security.


  // This is an asynchronous function used to check if a user is currently "logged in" when they visit a page or call an API.
export async function getSession(){
    const cookiesStore = await cookies()
    const token = cookiesStore.get("token")?.value
    if(!token) return null

    try {
        return jwt.verify(token, SECRET);
      } catch (error) {
        return null;
      }
}
