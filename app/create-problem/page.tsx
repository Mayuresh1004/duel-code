import { currentUserRole } from '@/modules/auth/actions'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { UserRole } from '../generated/prisma/enums'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { ModeToggle } from '@/components/ui/mode-toggle'
import CreateProblemForm from '@/modules/problems/components/create-problem-form'

const CreateProblemPage = async () => {

    const user = await currentUser()
    const userRole = await currentUserRole()

    if(userRole !== UserRole.ADMIN) return redirect('/')

  return (
    <section className='flex flex-col items-center justify-center container max-w-[1480px] mx-4 my-4 '>

        <div className='flex flex-row justify-between items-center w-full'>
            <Link href={"/"}>
                <Button variant={"outline"} size={'icon'}>
                    <ArrowLeft className='size-4'/>
                </Button>
            </Link>

            <h1 className='text-3xl font-bold text-[#1d73e5] shadow-2xl  shadow-blue-200'>
                Welcome {user?.firstName} ! Create a Problem
            </h1>
            <ModeToggle />

        </div>

        <CreateProblemForm />


    </section>
  )
}

export default CreateProblemPage