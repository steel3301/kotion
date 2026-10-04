"use client"


import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

import { useCoverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "../upload/single-image";
import { UploaderProvider, type CompletedFileState, type UploadFn } from "../upload/uploader-provider";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "convex/_generated/dataModel";
import { useCallback } from "react";


export const CoverImageModel = () => {
    const coverImage = useCoverImage();
    const update = useMutation(api.documents.update);
    const params = useParams();
    const { edgestore } = useEdgeStore();

    const uploadFn = useCallback<UploadFn>(
        async ({ file, signal, onProgressChange }) => {
            coverImage.setIsUploading(true);
            try {
                return await edgestore.publicFiles.upload({
                file,
                signal,
                onProgressChange,
                options: coverImage.url
                    ? { replaceTargetUrl: coverImage.url }
                    : undefined,
                });
            } catch (error) {
                coverImage.setIsUploading(false);
                throw error;
            }
        },
        [coverImage.setIsUploading, coverImage.url, edgestore],
    );

    const onUploadCompleted = useCallback(
        async ({ url }: CompletedFileState) => {
            try {
                await update({
                    id: params.documentId as Id<"documents">,
                    coverImage: url,
                });
                coverImage.onClose();
            } finally {
                coverImage.setIsUploading(false);
            }
        },
        [coverImage.onClose, coverImage.setIsUploading, params.documentId, update],
    );

    return(
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">
                        Cover Image
                    </h2>
                </DialogHeader>
                <UploaderProvider
                    uploadFn={uploadFn}
                    onUploadCompleted={onUploadCompleted}
                    autoUpload
                >
                    <SingleImageDropzone
                        className="w-full max-w-full outline-none"
                        width={480}
                        height={270}
                    />
                </UploaderProvider>
            </DialogContent>
        </Dialog>
    );
};