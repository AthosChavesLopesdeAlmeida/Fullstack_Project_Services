'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { apiFetch } from "@/lib/api"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

type Professional = {
  serviceName: string
  location: string
  id: string
}

const Page = () => {
  const router = useRouter()
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!search.trim()) {
      setProfessionals([])
      setError('')
      return
    }

    const controller = new AbortController()

    const timeout = setTimeout(async () => {
      setIsLoading(true)

      const { ok, data, status } = await apiFetch<{ professionals: Professional[] }>(
        `/professional/findByServiceName?serviceName=${encodeURIComponent(search)}`,
        { method: 'GET', signal: controller.signal }
      )

      setIsLoading(false)

      if (!ok) {
        setError(status === 500 ? 'Internal server error' : 'Unable to search right now')
        setProfessionals([])
        return
      }

      setError('')
      setProfessionals(data?.professionals ?? [])
    }, 300)

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [search])

  return (
    <div>
      <header className="flex justify-center">
        <Command className="max-w-3xl rounded-lg border">
          <CommandInput
            placeholder="Find a professional and schedule an appointment"
            value={search}
            onValueChange={setSearch}
          />

          <CommandList>
            {!isLoading && search.trim() && professionals.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            <CommandGroup>
              {professionals.map((pro) => (
                <CommandItem
                  key={pro.id}
                  value={pro.serviceName}
                  onSelect={() => router.push(`/protected/professionals/${pro.id}`)}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span>{pro.serviceName}</span>
                    <span className="text-xs text-muted-foreground">{pro.location}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </header>

      <main className="flex justify-center mt-30 text-center">
        {error && <p className="text-red-500 font-bold">{error}</p>}
        <h1 className="font-bold text-5xl w-240">
          Search a service or business by the name and schedule an appointment!
        </h1>
      </main>
    </div>
  )
}

export default Page