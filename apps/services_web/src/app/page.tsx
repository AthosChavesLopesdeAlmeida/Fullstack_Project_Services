'use client'

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <header className="w-full flex flex-row justify-center items-center px-20 py-6 bg-[#fcfcfc] sticky top-0 z-50">
        <h1 className="font-bold text-4xl tracking-[15px]">ABSTRACT</h1>
      </header>

      <main className="grid grid-col-1 gap-25 justify-items-center pt-15 pb-15 w-8/10">
        <section className="flex flex-col gap-10 items-center">
          <h1 className="text-5xl font-bold text-center w-250">Easier for you. Easier for your client. Everybody wins</h1>

          <h3 className="w-230 text-center">
            Your time is valuable — so is your client&apos;s. 
            Here, professionals build their schedule however works best for them, and clients book without waiting on anyone to reply. 
            Easy for you, convenient for the people looking for you.
          </h3>

          <div className="flex flex-row align-center justify-center text-center gap-1 pt-10">
            <Button className="rounded-sm bg-[#3A7D44] cursor-pointer hover:opacity-80 hover:bg-[#3A7D44] w-50">Create your account</Button>
            <Button className="rounded-sm bg-[#779CAB] cursor-pointer hover:opacity-80 hover:bg-[#779CAB] w-50">Or log into one</Button>
          </div>
        </section>



        <section className="w-300 flex flex-col justify-center gap-40 p-15 mt-[-40px]">

          {/* DIV 1 */}
          <div className="flex flex-row items-start gap-6">
            <div className="w-1/2">
              <AspectRatio ratio={16 / 9}>
                <Image src="https://images.unsplash.com/photo-1660218264783-0404dac6cd7e?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Image" fill sizes="(max-width: 768px) 100vw, 50vw" className="rounded-md object-cover" />
              </AspectRatio>
            </div>

            <div className="w-1/2 flex flex-col gap-5">
              <h1 className="text-[#254D32] text-2xl font-semibold uppercase">Your Calendar, Your Rules</h1>
              <p>
              Set your hours once, and let the system handle the rest. 
              No more back-and-forth, no more double bookings — just a schedule that works exactly the way you do.
              </p>
            </div>

          </div>

          {/* DIV 2 */}
          <div className="flex flex-row items-start gap-6">
            <div className="w-1/2 flex flex-col gap-5">
              <h1 className="text-[#254D32] text-2xl font-semibold uppercase">Every Slot, Confirmed</h1>
              <p>
              Once it&apos;s booked, it&apos;s locked in — for you and your client. 
              No overlaps, no surprises, no chasing confirmations.
              </p>
            </div>

            <div className="w-1/2">
              <AspectRatio ratio={16 / 9}>
                <Image src="https://media.istockphoto.com/id/1916729901/pt/foto/meeting-success-two-business-persons-shaking-hands-standing-outside.jpg?s=612x612&w=0&k=20&c=qET3L4L5hNFfTIIx-eTZcd6wYYFYwcUb3OR9EDtKiMA=" 
                alt="Image" fill sizes="(max-width: 768px) 100vw, 50vw" className="rounded-md object-cover" />
              </AspectRatio>
            </div>
          </div>

          {/* DIV 3 */}
          <div className="flex flex-row items-start gap-6">
            <div className="w-1/2">
              <AspectRatio ratio={16 / 9}>
                <Image src="https://images.unsplash.com/photo-1759830196573-fb0e960fb0eb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Image" fill sizes="(max-width: 768px) 100vw, 50vw" className="rounded-md object-cover" />
              </AspectRatio>
            </div>

            <div className="w-1/2 flex flex-col gap-5">
              <h1 className="text-[#254D32] text-2xl font-semibold uppercase">Book It in Seconds</h1>
              <p>
                Find your time, tap to reserve, done. 
                No calls, no waiting for a reply — just an open slot and a confirmed spot.
              </p>
            </div>

          </div>

          {/* DIV 4 */}
          <div className="flex flex-row items-start gap-6">
            <div className="w-1/2 flex flex-col gap-5">
              <h1 className="text-[#254D32] text-2xl font-semibold uppercase">People, Not Just Appointments</h1>
              <p>
              Behind every booking is a professional who cares and a client who&apos;s looking for the right fit. 
              This is where that connection starts.
              </p>
            </div>

            <div className="w-1/2">
              <AspectRatio ratio={16 / 9}>
                <Image src="https://images.unsplash.com/photo-1710362921917-2e33bb342a23?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Image" fill sizes="(max-width: 768px) 100vw, 50vw" className="rounded-md object-cover" />
              </AspectRatio>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
