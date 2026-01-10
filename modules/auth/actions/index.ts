"use server"
import db from "@/lib/db"
import {currentUser, EmailAddress} from "@clerk/nextjs/server"


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

        const email = user.primaryEmailAddress?.emailAddress;

        if (!email) throw new Error("No primary email");


        
        console.log("User is onboarding");
        const newUser = await db.user.upsert({
            
            where: {
                clerkId: id
            },
            update: {
            firstName: firstName ?? "",
            lastName: lastName ?? "",
            imageUrl: imageUrl || null ,
            email,
            },
            create: {
            clerkId: id,
            firstName: firstName ?? "",
            lastName: lastName ?? "",
            imageUrl: imageUrl || null ,
            email,
            },

        })
        console.log("User Onboarded");
        
        return {
            success: true,
            user:newUser,
            message: "User Onboarded Successfully"
        }

    } catch (error) {
  console.error("Onboarding failed:", error)
  return {
    success: false,
    error
  }
}
}


export const  currentUserRole = async () => {
    try {
        const user = await currentUser();

        if(!user){
            return {
                success:false,
                error: "No Authenticated User Found"
            }
        }

        const {id} = user;

        const userRole = await db.user.findUnique({
            where:{
                clerkId:id
            },
            select:{
                role: true
            }

        }) 

        return userRole?.role

    }
    catch{
            return {
                success:false,
                error: "Something went wrong"
            }
    }
}

export const getCurrentUser = async () => {
    const user = await currentUser()

    if(!user){
            return {
                success:false,
                error: "No Authenticated User Found"
            }
        }


        const dbUser = await db.user.findUnique({
            where:{
                clerkId:user.id
            },
            select:{
                id: true
            }

        }) 

        return dbUser?.id
}