import { currentUserRole } from '@/modules/auth/actions'
import { currentUser } from '@clerk/nextjs/server'
import { UserRole } from '../../generated/prisma/enums'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { ModeToggle } from '@/components/ui/mode-toggle'
import UpdateProblemForm from '@/modules/problems/components/update-problem-form'

type PageProps = {
  params: Promise<{ id: string }>
}

const UpdateProblemPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const user = await currentUser()
  const userRole = await currentUserRole()

  if (!user || userRole !== UserRole.ADMIN) {
    redirect('/')
  }

  return (
    <section className="flex flex-col items-center justify-center container max-w-[1480px] mx-4 my-4">
      <div className="flex flex-row justify-between items-center w-full">
        <Link href="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="size-4" />
          </Button>
        </Link>

        <h1 className="text-3xl font-bold text-[#1d73e5]">
          Welcome {user.firstName}! Update a Problem
        </h1>

        <ModeToggle />
      </div>

      <UpdateProblemForm problemId={id} />
    </section>
  )
}

export default UpdateProblemPage