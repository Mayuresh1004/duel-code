export const dynamic = "force-dynamic";
import db from '@/lib/db';
import { getAllProblems } from '@/modules/problems/actions';
import { ProblemsTable } from '@/modules/problems/components/problems-table';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { LoginModal } from '@/components/modals/login-modal';


const ProblemsPage = async () => {

  const user = await currentUser();

  let dbUser = null

  if (user) {
    dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
      select: { id: true, role: true }
    });
  }

  const { data: problems, error } = await getAllProblems()

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-destructive">Error loading problems: {error}</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-32'>
      {!user && <LoginModal />}
      <ProblemsTable problems={problems || []} user={dbUser || null} />
    </div>
  )
}

export default ProblemsPage