
"use client";

import { cn } from "cn";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "./ui/skeleton";
import { Spinner } from "./ui/spinner";


interface CoverImageProps{
    url?: string;
    preview?: boolean;
};

export const Cover = ({
    url,
    preview
} : CoverImageProps) => {

    const { edgestore } = useEdgeStore();
    const params = useParams();
    const coverImage = useCoverImage();
    const removeCoverImage = useMutation(api.documents.removeCoverImage);


    const onRemove = () => {
        if (url) {
            edgestore.publicFiles.delete({
                url: url
            })
        }
        removeCoverImage({
            id: params.documentId as Id<"documents">
        });
    };


    return(
        <div className={cn(
            "relative w-full h-[35vh] group",
            !url && !coverImage.isUploading && "h-[12vh]",
            (url || coverImage.isUploading) && "bg-muted"
        )}>
            {!!url && (
                <Image 
                src={url}
                fill
                unoptimized
                alt="Cover"
                className="object-cover"
                ></Image>
            )}

            {url && !preview && !coverImage.isUploading && (
                <div className="pointer-events-none absolute bottom-5 left-4 z-10 flex items-center gap-x-2 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 md:left-[54px]">
                    <Button
                        onClick={() => coverImage.onReplace(url)}
                        className="bg-white/85 text-neutral-800 hover:bg-white dark:bg-neutral-900/85 dark:text-neutral-100 dark:hover:bg-neutral-800 text-xs"
                        variant="outline"
                        size="sm"

                    >
                        <ImageIcon className="h-4 w-4 mr-2"></ImageIcon>
                        Change Cover
                    </Button>
                      <Button
                        onClick={onRemove}
                                                className="bg-white/85 text-neutral-800 hover:bg-white dark:bg-neutral-900/85 dark:text-neutral-100 dark:hover:bg-neutral-800 text-xs"
                        variant="outline"
                        size="sm"
                        
                    >
                        <X className="h-4 w-4 mr-2"/>
                        Remove
                    </Button>
                </div>
            )}
        </div>
    );
}


Cover.Skeleton = function CoverSkeleton() {
    return(
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
    );
}