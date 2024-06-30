import prisma from '@/lib/prisma'
import { getErrorResponse } from '@/lib/utils'
import { isEmailValid } from '@persepolis/regex'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function POST(req: NextRequest) {
   try {
      const { email, password } = await req.json()

      if (isEmailValid(email)) {
         const user = await prisma.owner.findUnique({
            where: { email },
         })
         console.log(user)
         console.log({ email, password })

         return new NextResponse(
            JSON.stringify({
               status: 'success',
               email,
            }),
            {
               status: 200,
               headers: { 'Content-Type': 'application/json' },
            }
         )
      }

      if (!isEmailValid(email)) {
         return getErrorResponse(400, 'Incorrect Email')
      }
   } catch (error) {
      console.error(error)
      if (error instanceof ZodError) {
         return getErrorResponse(400, 'failed validations', error)
      }

      return getErrorResponse(500, error.message)
   }
}
