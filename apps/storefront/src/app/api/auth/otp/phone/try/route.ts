import prisma from '@/lib/prisma';
import { generateSerial } from '@/lib/serial'
import { getErrorResponse } from '@/lib/utils'
import { sendTransactionalSMS } from '@persepolis/sms'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function POST(req: NextRequest) {
   try {
      const OTP = generateSerial({})

      const { phone } = await req.json()

      // Use isPhoneNumberValid if international
      await prisma.user.upsert({
         where: { phone: phone.toString().toLowerCase() },
         update: {
            OTP,
         },
         create: {
            phone: phone.toString().toLowerCase(),
            OTP,
         },
      })

      await sendTransactionalSMS({
         Mobile: phone,
         TemplateId: 100000,
         Parameters: [
            {
               name: 'Code',
               value: '12345',
            },
         ],
      })

      return new NextResponse(
         JSON.stringify({
            status: 'success',
            phone,
         }),
         {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
         }
      )
   } catch (error) {
      console.error(error)
      if (error instanceof ZodError) {
         return getErrorResponse(400, 'failed validations', error)
      }

      return getErrorResponse(500, error.message)
   }
}