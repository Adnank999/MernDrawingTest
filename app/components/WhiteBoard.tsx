import React, { useState, useCallback } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import {

  useSaveDrawingMutation,
} from "@/redux/drawingApiSlice";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import debounce from "lodash/debounce";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Whiteboard = () => {
  const [elements, setElements] = useState<ExcalidrawElement[]>([]);
  const [appState, setAppState] = useState({});
  const [saveDrawing, { isLoading, isSuccess, isError }] =
    useSaveDrawingMutation();

  const debouncedSetElements = useCallback(
    debounce(
      (newElements: ExcalidrawElement[]) => setElements(newElements),
      500
    ), 
    []
  );

  const { toast } = useToast()



  const handleSaveDrawing = async () => {
    if (!elements || elements.length === 0) {
      // alert("No elements to save.");
      toast({
        variant: "destructive",
        className: "bg-red-600",
        title: "Uh oh! Something went wrong.",
        description: "No elements to save.",
        
      })
      return;
    }

    if (!appState || Object.keys(appState).length === 0) {
      // alert("App state is missing.");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "App state is missing.",
        
      })
      return;
    }

    try {
      const drawingData = {
        elements,
        appState,
      };

      await saveDrawing(drawingData).unwrap();
      // alert("Drawing saved successfully!");
      toast({
        className: "bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white font-bold",
        title: "Success",
        description: "Drawing saved successfully!",
        duration: 3000,
      })
    } catch (error) {
      // console.error("Error saving drawing:", error);
      // alert("Failed to save drawing.");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to save drawing.",
        duration: 3000,
        
      })
    }
  };

  return (
    <div className="pl-2 w-full flex flex-col justify-center item-center gap-5">
      <div className="w-full h-[600px]">
        <Excalidraw
          onChange={(newElements: readonly ExcalidrawElement[], state) => {
            debouncedSetElements([...newElements]);
            setAppState(state); 
          }}
          
        />
      </div>

      <div className="w-full flex justify-center items-center">
        <Button
          variant="outline"
          className="bg-black"
          onClick={handleSaveDrawing}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Drawing"}
        </Button>

        
      </div>
    </div>
  );
};

export default Whiteboard;
