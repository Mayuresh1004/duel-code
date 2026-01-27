import db from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { NextRequest } from "next/server"

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
        const {problemId, playlistId} = await request.json();

        if(!problemId || !playlistId) {
            return new Response("Problem ID and Playlist ID are required", { status: 400 })
        }
        
        const playlist = await db.playlist.findFirst({
            where: {
                id: playlistId,
                userId: dbUser.id,
            }
        })
        if(!playlist) {
            return new Response("Playlist not found", { status: 404 })
        }

        const problemInPlaylist = await db.problemInPlaylist.create({
            data:{
                problemId,
                playlistId,
            }
        })

        return new Response(JSON.stringify(problemInPlaylist), { status: 201 })

    }
    catch (error) {
        console.error("Error adding problem to playlist:", error);
        return new Response("Internal Server Error", { status: 500 })
    }

}