'use client'

import { Button } from '@/components/ui/button'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const LoginForm = () => {
   const formSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
   })

   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   })

   async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
         console.log(values)
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="pedrogonzalez@gmail.com"
                              {...field}
                              value={field.value || ''}
                           />
                        </FormControl>
                        {/* <FormDescription>
                                    
                                </FormDescription> */}
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="*****"
                              {...field}
                              value={field.value || ''}
                           />
                        </FormControl>
                        {/* <FormDescription>
                                    
                                </FormDescription> */}
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormMessage />

               <Button type="submit">Submit</Button>
            </form>
         </Form>
      </>
   )
}

export default LoginForm
