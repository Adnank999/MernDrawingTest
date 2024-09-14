"use client";
import React from "react";
import { useGetDrawingQuery } from "@/redux/drawingApiSlice";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { AppState } from "@excalidraw/excalidraw/types/types";
import { Excalidraw } from "@excalidraw/excalidraw";


interface DrawingProps {
  id: string;
  index: number;
}

const SingleDrawing: React.FC<DrawingProps> = ({ id,index }) => {
  const { data: drawing, error, isLoading } = useGetDrawingQuery(id);

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error fetching drawing: {error?.message}</p>;

  return (
    <div className="text-white">
      {drawing && drawing?.elements?.length > 0 && drawing?.appState && (
        <div className="w-full h-[500px] border p-2">
          <Excalidraw
            initialData={{
              elements: drawing.elements,
              appState: drawing.appState,
              scrollToContent: true
            }}
            viewModeEnabled={true}
          />
        </div>
      )}
    </div>
  );
};

export default SingleDrawing;
