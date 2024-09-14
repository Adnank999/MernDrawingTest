"use client";
import { BookOpen, PencilRuler, SquareTerminal, Triangle } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import Whiteboard from "./WhiteBoard";
import { useEffect, useState } from "react";
import DrawingsGallery from "./DrawingsGallery";
import Loader from "./Loader";

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("home");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // 3-second delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader/>;
  }


  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
       
              <Button
                // variant="outline"
                size="icon"
                aria-label="Home"
                onClick={() => setActiveComponent("home")}
                className="ml-2"
              >
                <Triangle
                  color="#ff1f1f"
                  className="size-5 text-black hover:animate-glowRotate"
                />
              </Button>
            

        <nav className="grid gap-1 p-2">
          
                <Button
                  // variant="ghost"
                  size="icon"
                  className="rounded-lg bg-muted"
                  aria-label="Playground"
                  onClick={() => setActiveComponent("Drawings")}
                >
                  <BookOpen color="#ffffff" strokeWidth={1.5} />
                  <PencilRuler color="#ff1f1f"  className="size-5"/>
                </Button>
             
              {/* <TooltipContent side="right" sideOffset={5}>
                Drawings
              </TooltipContent> */}
           
        </nav>
      </aside>

      <main className="w-full h-[500px]">
        {activeComponent === "home" && <Whiteboard />}
        {activeComponent === "Drawings" && <DrawingsGallery />}
      </main>
    </div>
  );
}
