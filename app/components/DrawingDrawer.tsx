import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import SingleDrawing from "./SingleDrawing";
import { useRouter } from "next/navigation";
import { useDeleteDrawingMutation } from "@/redux/drawingApiSlice";
import { useToast } from "@/hooks/use-toast";

type Props = {
  id: string;
  index: number;
};

export function DrawingDrawer({ id, index }: Props) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [deleteDrawing, { isLoading, error }] = useDeleteDrawingMutation();
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/edit/${id}/index=${index}`);
  };

  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteDrawing(id).unwrap();
      // alert("Drawing deleted successfully!");
      toast({
        variant: "destructive",
        className: "bg-red-600",
        title: "Deleted",
        description: "Drawing deleted successfully!",
        duration: 3000,
      });
    } catch (error) {
      // console.error("Error Deleting drawing:", error);
      // alert('Failed to Delete drawing!');
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Error Deleting drawing.",
        duration: 3000,
      });
    }
  };

  return (
    <Drawer direction="bottom">
      <div className="grid grid-cols-3 justify-center items-center gap-1">
        <DrawerTrigger asChild className="bg-black">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Show Drawings
          </Button>
        </DrawerTrigger>

        <Button variant="outline" onClick={handleEdit} className="bg-black">
          Edit Drawing
        </Button>

        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {" "}
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </div>

      <DrawerContent>
        <div className="w-full h-[600px] flex flex-col justify-center items-center">
          <DrawerHeader className="text-black text-lg font-bold">
            <DrawerTitle>Drawing {index + 1}</DrawerTitle>
            <DrawerDescription>See Your Drawing and Enjoy</DrawerDescription>
          </DrawerHeader>
          <div className="w-full">
            <SingleDrawing id={id} index={index} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
