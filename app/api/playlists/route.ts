import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const user = await currentUser()
        if(!user) {
            return new Response("Unauthorized", { status: 401 })
        }

        const dbUser = await db.user.findUnique({
            where: {
                clerkId: user.id
            },

        })

        if(!dbUser) {
            return new Response("Unauthorized", { status: 401 })
        }

        const {name, description} = await request.json();

        if(!name) {
            return new Response("Name is required", { status: 400 })
        }



        const newPlaylist = await db.playlist.create({
            data:{
                name,
                description : description || null,
                userId: dbUser.id,
            }
        })
        return NextResponse.json(newPlaylist, { status: 201 });
    } catch (error) {

        console.error("Error creating playlist:", error);
        return new Response("Internal Server Error", { status: 500 })
        
    }
}

export async function GET() {
    try {
        const user = await currentUser()
        if(!user) {
            return new Response("Unauthorized", { status: 401 })
        }
        const dbUser = await db.user.findUnique({
            where: {
                clerkId: user.id
            },  
        })

        if(!dbUser) {
            return new Response("Unauthorized", { status: 401 })
        }   
        const playlists = await db.playlist.findMany({
            where: {
                userId: dbUser.id,
            },
            include: {
                problems: {
                    include: {
                        problem: {
                            select: {
                                id: true,
                                title: true,
                                difficulty: true,
                            }
                        }
                    }
                    
                }
            },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(playlists, { status: 200 })
    } catch (error) {
        console.error("Error fetching playlists:", error);
        return new Response("Internal Server Error", { status: 500 })
    }   
}