'use client'

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { apiFetch } from "@/lib/api";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar"

import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar"

import {
  Handshake,
  CalendarDays,
  RotateCcwClock,
  Pencil,
  User,
  FileQuestionMark,
  CirclePlus,
} from "lucide-react"

enum Role {
  CLIENT = 'CLIENT',
  PROFESSIONAL = 'PROFESSIONAL'
}

type User = {
  name: string,
  email: string,
  pfpUrl: string,
  role: Role,
  id: string
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter() 
  const [user, setUser] = useState<User>()

  const fetchUser = async () => {
    const { ok, data } = await apiFetch<{user: User}>('/user/me', {
      method: 'GET',
    })

    if (!ok) {
      return router.push('/login')
    }

    return setUser(data?.user)
  }

  useEffect(() => {
    fetchUser()
  }, [])
    
    return (
      <div className="flex min-h-screen">
      <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                render={
                  <span onClick={() => router.push('/protected/home')} className="flex items-center gap-2">
                    <div className="bg-[#FCFC62] p-2 rounded-md">
                        <Handshake className="size-8"/>
                    </div>
                    <span className="font-semibold tracking-wider">ABSTRACT</span>
                  </span>
                }
                />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Bookings</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="cursor-pointer"
                    render={
                      <span onClick={() => router.push('/protected/next_bookings')}>
                        <CalendarDays />
                        <span>Next bookings</span>
                      </span>
                    }
                    />
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="cursor-pointer"
                    render={
                      <span onClick={() => router.push('/protected/booking_history')}>
                        <RotateCcwClock />
                        <span>Booking history</span>
                      </span>
                    }
                    />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {user?.role === Role.PROFESSIONAL &&
          <SidebarGroup>
            <SidebarGroupLabel>Professional account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => router.push('/protected/availability_rules')} className="cursor-pointer">
                    <Pencil />
                    <span>Availability rules</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => router.push('/protected/create_slots')} className="cursor-pointer">
                    <CirclePlus />
                    <span>Manage availability</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          }

          <SidebarGroup>
            <SidebarGroupLabel>Documentation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => router.push('/protected/guide')} className="cursor-pointer">
                    <FileQuestionMark />
                    <span>How to use</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              {user === null ? <p>Loading...</p> :
                <SidebarMenuButton onClick={() => router.push('/protected/my_account')}>
                  <Avatar>
                    <AvatarImage src={user?.pfpUrl}/>
                    <AvatarFallback><User/></AvatarFallback>
                  </Avatar>
                  <span>{user?.name}</span>
                </SidebarMenuButton>
              }
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <header className="flex h-14 items-center">
        <SidebarTrigger className="cursor-pointer"/>
      </header>

      <main className="flex-1 pt-4">{children}</main>
      </SidebarProvider>
    </div>
  );
}