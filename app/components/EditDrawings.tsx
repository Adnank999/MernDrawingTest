"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  useGetDrawingQuery,
  useUpdateDrawingMutation,
} from "@/redux/drawingApiSlice";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { AppState } from "@excalidraw/excalidraw/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function EditDrawings({ id,index }: { id: string,index:number }) {
  const {
    data: drawing,
    isLoading: loadingDrawing,
    error: drawingError,
  } = useGetDrawingQuery(id);
  const [elements, setElements] = useState<ExcalidrawElement[]>([]);
  const [appState, setAppState] = useState<AppState | null>(null);
  const [updateDrawing, { isLoading, error }] = useUpdateDrawingMutation();

  const { toast } = useToast();
  const elementsRef = useRef(elements);
  const appStateRef = useRef(appState);

  useEffect(() => {
    elementsRef.current = elements;
  }, [elements]);

  useEffect(() => {
    appStateRef.current = appState;
  }, [appState]);

  useEffect(() => {
    if (drawing) {
      setElements(drawing.elements || []);
      setAppState(drawing.appState || {});
    }
  }, [drawing]);

  const router = useRouter();

  const handleSave = async () => {
    try {
      await updateDrawing({
        id,
        payload: { elements, appState },
      }).unwrap();

      //   alert('Drawing updated successfully!');

      toast({
        className:
          "bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white font-bold",
        title: "Success",
        description: "Drawing updated successfully!",
        duration: 3000,
      });

      router.push("/")
    } catch (error) {
      //   console.error('Error updating drawing:', error);
      //   alert('Failed to update drawing!');
      toast({
        variant: "destructive",
        className: "bg-red-600",
        title: "Error",
        description: "Failed to update drawing!",
        duration: 3000,
      });
    }
  };

  const handleExcalidrawChange = (
    updatedElements: readonly ExcalidrawElement[],
    updatedAppState: AppState
  ) => {
    const elementsChanged =
      JSON.stringify(elements) !== JSON.stringify(updatedElements);
    const appStateChanged =
      JSON.stringify(appState) !== JSON.stringify(updatedAppState);

    if (elementsChanged) {
      console.log("Elements changed:", updatedElements);
      setElements([...updatedElements]);
    }

    if (appStateChanged) {
      console.log("App state changed:", updatedAppState);
      setAppState(updatedAppState);
    }
  };

  if (loadingDrawing) return <div>Loading...</div>;
  if (drawingError) return <div>Error loading drawing</div>;

  return (
    <div className="w-full h-full">
      <div style={{ height: "650px" }}>
        <Excalidraw
          initialData={{ elements, appState }}
          onChange={handleExcalidrawChange}
        />
      </div>

      <div className="w-full h-full flex flex-col justify-center items-center mt-2">
        <Button
          className="border-2 border-white-600 hover:bg-white hover:text-black"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
