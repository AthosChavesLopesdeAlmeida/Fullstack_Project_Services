'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

import { apiFetch } from "@/lib/api"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { 
    Card,
    CardHeader, 
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card"

enum Role {
    CLIENT = 'CLIENT',
    PROFESSIONAL = 'PROFESSIONAL'
}


const Page = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pfpUrl, setPfpUrl] = useState('')
    const [role, setRole] = useState<Role>(Role.CLIENT)

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const { ok } = await apiFetch('/user/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, avatarUrl: pfpUrl, role })
        })

        if (!ok) {
            setError('Unable to create account')
            setIsLoading(false)
        }

        setIsLoading(false)

        if (role === Role.CLIENT) {
            router.push('/protected/home')
        } else {
            router.push('/register_pro')
        }

    }

  return (
    <div className="flex flex-col min-h-screen items-center">
      <header className="w-full flex flex-row justify-center items-center px-20 py-6 bg-[#fcfcfc] sticky top-0 z-50">
        <h1 className="font-bold text-4xl tracking-[15px]">ABSTRACT</h1>
      </header>

      <main className="grid grid-col-1 gap-25 justify-items-center pt-15 pb-15 w-8/10">
        <section className="flex flex-col gap-10 items-center">
            <Card className="w-100 rounded-sm">
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Enter your data to create an account.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input required id="name" type="text" onChange={(e) => setName(e.target.value)} className="rounded-sm border-black border-[0.5px] bg-white"/>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input required id="email" type="email" onChange={(e) => setEmail(e.target.value)} className="rounded-sm border-black border-[0.5px] bg-white" placeholder="email@example.com"/>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input required id="password" type="password" onChange={(e) => setPassword(e.target.value)} className="rounded-sm border-black border-[0.5px] bg-white"/>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="pfpUrl">Profile Picture URL</Label>
                                <Input required id="pfpUrl" type="text" onChange={(e) => setPfpUrl(e.target.value)} className="rounded-sm border-black border-[0.5px] bg-white" placeholder="Insert the URL for your profile picture"/>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="role">Create your account as:</Label>
                                <div className="flex flex-col gap-2 p-4 text-center bg-[#F0F0F0] rounded-sm" id="role">
                                    <Button className={`rounded-sm w-80 h-13 cursor-pointer text-black transition duration-300 ease-in-out hover:opacity-90 ${role === 'CLIENT' ? 'bg-[#779CAB] hover:bg-[#779CAB]' : 'bg-white hover:bg-white'}`} onClick={() => setRole(Role.CLIENT)}>CLIENT</Button>
                                    <Button className={`rounded-sm w-80 h-13 cursor-pointer text-black transition duration-300 ease-in-out hover:opacity-90 ${role === 'PROFESSIONAL' ? 'bg-[#779CAB] hover:bg-[#779CAB]' : 'bg-white hover:bg-white'}`} onClick={() => setRole(Role.PROFESSIONAL)}>PROFESSIONAL</Button>
                                </div>
                            </div>

                            {error && <p className="text-red-500 font-bold">{error}</p>}

                            <Button type="submit" className="bg-[#254D32] rounded-sm cursor-pointer hover:bg-[#254D32] hover:opacity-90" disabled={isLoading}>Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </section>
      </main>
    </div>
  )
}

export default Page