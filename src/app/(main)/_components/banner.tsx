"use client"

import { Button } from "@/components/ui/button";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmModel } from "@/components/models/confim-model";

interface Bannerprops{
    documentId: Id<"documents">;
};

export const Banner = ({
    documentId,
} : Bannerprops) => {

    const router = useRouter();

    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);


    const onRemove = () => {
        const promise = remove({ id: documentId})
        .then(() => {
            router.push("/documents");
        });

        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note Deleted.",
            error: "Failed to delete the node"
        });
    };

    const onRestore = () => {
        const promise = restore({ id: documentId});

        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note Restored.",
            error: "Failed to restore the node"
        });
    };


    return(
        <div className="w-full bg-rose-500 text-center text-sm p-2 text-while flex items-center gap-x-2 justify-center">
            <p>
                This page is in the Trash.    
            </p> 
            <Button
            size="sm"
            onClick={onRestore}
            variant="outline"
            className="border-white bg-transparent hover-bg-primary/5 text-while hover:text-while p-1 px-2 h-auto font-normal"
            >
                Restore page
            </Button> 
            <ConfirmModel onConfirm={onRemove}>
                <Button
                size="sm"
                variant="outline"
                className="border-white bg-transparent hover-bg-primary/5 text-while hover:text-while p-1 px-2 h-auto font-normal"
                >
                    Delete Forever
                </Button>
            </ConfirmModel>
        </div>
    );

}