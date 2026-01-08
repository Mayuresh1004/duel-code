"use server"
import db from "@/lib/db"
import {currentUser, EmailAddress} from "@clerk/nextjs/server"
import { email, success } from "zod"


export const onBoardUser = async ()=>{
    try {
        
        
        
        const user = await currentUser()
        
        if(!user){
            return {
                success:false,
                status: 401,
                error:"No suthenticated user found"
            }
        }
        
        const {id, firstName, lastName, imageUrl, emailAddresses}:any = user
        
        const newUser = await db.user.upsert({
            
            where: {
                clerkId: id
            },
            update:{
                firstName: firstName || null,
                lastName: lastName || null,
                imageUrl: imageUrl || null,
                email: emailAddresses[0]?.emailAddress || ""
            },
            create:{
                clerkId: id,
                firstName: firstName || null,
                lastName: lastName || null,
                imageUrl: imageUrl || null,
                email: emailAddresses[0]?.emailAddress || ""
            },
        })
        console.log("User is onboarding");
        console.log("User Onboarded");
        
        return {
            success: true,
            user:newUser,
            message: "User Onboarded Successfully"
        }

    } catch (error) {
        return {
            success:false,
            error
        }
    }
}
