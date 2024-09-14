// src/features/drawing/drawingApiSlice.js

import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState } from '@excalidraw/excalidraw/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Drawing {
  _id: string;
  elements: ExcalidrawElement[];
  appState: AppState;
}

export const drawingApiSlice = createApi({
  reducerPath: 'drawingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_HOST}`,
  }),
  tagTypes: ['Drawing', 'Drawings'],
  endpoints: (builder) => ({
    saveDrawing: builder.mutation({
      query: ({ elements, appState }) => ({
        url: 'save-drawing',
        method: 'POST',
        body: {
          // title,
          elements, 
          appState,
        },
      }),
      invalidatesTags: ['Drawings'],
    }),
    getDrawings: builder.query<Drawing[],void>({
      query: () => ({
        url: 'drawings', 
        method: 'GET',
      }),
      providesTags: ['Drawings'],
    }),
    getDrawing: builder.query({
      query: (id) => ({
        url: `/drawing/${id}`,
        method: 'GET',
        
      }),
      providesTags: (result, error, id) => [{ type: 'Drawing', id }],
    }),
    updateDrawing: builder.mutation({
      query: ({id,payload}) => ({
        url: `/drawing/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Drawing', id }, 'Drawings'],
    }),
    deleteDrawing: builder.mutation({
      query: (id) => ({
        url: `/drawing/${id}`, 
        method: 'DELETE',
       
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Drawing', id }, 'Drawings'],
    }),
  }),
});

export const { useSaveDrawingMutation,useGetDrawingQuery,useGetDrawingsQuery,useUpdateDrawingMutation,useDeleteDrawingMutation } = drawingApiSlice;
