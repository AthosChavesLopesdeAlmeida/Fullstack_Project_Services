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

const Page = () => {
    const [serviceName, setServiceName] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const { ok } = await apiFetch('/professional/create', {
            method: 'POST',
            body: JSON.stringify({ serviceName, location, description })
        })

        if (!ok) {
            setError('Unable to create service')
            setIsLoading(false)
        }

        setIsLoading(false)
        router.push('/protected/home')
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
                    <CardTitle>Register your business</CardTitle>
                    <CardDescription>Enter your data to register your business.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="serviceName">Service name</Label>
                                <Input required id="serviceName" type="text" onChange={(e) => setServiceName(e.target.value)} className="rounded-sm border-black border-[0.5px] bg-white" placeholder="Insert the name of your business"/>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input required id="location" type="text" onChange={(e) => setLocation(e.target.value)} className="rounded-sm border-black border-[0.5px] bg-white" placeholder="Insert the location of your business"/>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Input required id="description" type="text" onChange={(e) => setDescription(e.target.value)} className="rounded-sm border-black border-[0.5px] bg-white"  placeholder="Describe your business briefly (optional)"/>
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