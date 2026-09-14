'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { apiFetch } from "@/lib/api"

import { 
    Avatar,
    AvatarFallback,
    AvatarImage 
} from "@/components/ui/avatar"

import {
  Card,
  CardContent,
  CardHeader,

} from "@/components/ui/card"

import { 
    User,
} from "lucide-react"

type Professional = {
    serviceName: string,
    location: string,
    description: string,
    userId: string
}

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [professional, setProfessional] = useState<Professional>()
  const [professionalPfp, setProfessionalPfp] = useState('')

  const fetchProfessionalPfp = async (userId: string) => {
    const { ok, status, data } = await apiFetch<{ avatarUrl: string }>(`/user/${userId}`, {
        method: 'GET'
    })  

    if (!ok) {
        if (status === 500) {
            return setError('Internal server error')
        } else {
            return setError('Unexpected error')
        }
    }

    if (!data) {
        return setError('Unexpected error')
    }

    setProfessionalPfp(data?.avatarUrl)
  }

  const fetchProfessionalData = async () => {
    setIsLoading(true)

    const { ok, status, data } = await apiFetch<{professional: Professional}>(`/professional/${id}`, {
        method: 'GET'
    })

    if (!ok) {
        if (status === 500) {
            return setError('Internal server error')
        } else {
            return setError('Unexpected error')
        }
    }

    if (!data) {
        setIsLoading(false)
        return setError('Unexpected error')
    }

    setProfessional(data?.professional)
    fetchProfessionalPfp(data?.professional.userId)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProfessionalData()
  }, [])

  return (
    <div className="flex flex-col gap-10">
        <header className="w-11/12">
            <Card className="w-full flex flex-row items-center">
                {error && <p className="font-bold text-red-500">{error}</p>}
                {isLoading ? <h2>Loading</h2> : 
                    <>
                    <CardHeader>
                        <Avatar className="h-15 w-15">
                            <AvatarImage src={professionalPfp}/>
                            <AvatarFallback><User/></AvatarFallback>
                        </Avatar>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <h1 className="text-xl font-bold">{professional?.serviceName} - <span className=" font-normal text-m">{professional?.location}</span></h1>
                        <p className="text-gray-500">{professional?.description}</p>
                    </CardContent>
                    </>
                }
            </Card>
        </header>

        <main>

        </main>
    </div>
  )
}

export default Page