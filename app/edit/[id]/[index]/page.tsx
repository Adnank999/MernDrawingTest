import { EditDrawings } from "@/app/components/EditDrawings";
import React from "react";


interface Props {
  params: {
    id: string;
    index: number;
  };
}
const page = ({ params }: Props) => {

  // console.log("INDEX",params?.index)

  return (
    <EditDrawings id={params?.id} index={params?.index}/>

    
  );
};

export default page;
