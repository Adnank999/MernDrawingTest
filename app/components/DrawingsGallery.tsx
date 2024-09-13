"use client";
import React from "react";
import { useGetDrawingsQuery } from "@/redux/drawingApiSlice";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { AppState } from "@excalidraw/excalidraw/types/types";
import { Excalidraw } from "@excalidraw/excalidraw";
import { DrawingDrawer } from "./DrawingDrawer";
interface Drawing {
  _id: string;
  elements: ExcalidrawElement[];
  appState: AppState;
}

const DrawingsGallery = () => {
  const { data, error, isLoading } = useGetDrawingsQuery();

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error fetching drawings: {error?.message}</p>;

  // console.log("Drawings", drawings);

  return (
    <div className="text-white flex flex-col justify-center items-center gap-5 overflow-x-hidden">
      <h1 className="mt-6 text-4xl">The Drawings Gallery</h1>
      <div className="grid grid-cols-3 gap-y-20 px-24 py-6">
      
       
        {data &&
          data.length > 0 &&
          data.map((drawing: Drawing,index:number) => (
            <div key={drawing?._id} className="h-[500px] border p-2 flex flex-col justify-center items-center gap-4">
              {" "}
          
              {drawing?.elements?.length > 0 && drawing?.appState && (
                <Excalidraw
                  initialData={{
                    elements: drawing.elements,
                    appState: drawing.appState,
                    scrollToContent: true
                  }}
                  viewModeEnabled={true}
                />
              )}

              <DrawingDrawer id={drawing?._id} index={index}/>
              
            </div>
          ))}
      </div>
    </div>
  );
};

export default DrawingsGallery;
