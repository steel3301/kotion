"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "convex/_generated/api";
import { Doc } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React, { useRef, useState } from "react";


interface TitleProps{
    initialData : Doc<"documents">;
};


export const Title = ({
    initialData,
} : TitleProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const hasSubmittedRef = useRef(false);
    const update = useMutation(api.documents.update);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialData.title || "Untitled");

    const enableInput = () => {
        setTitle(initialData.title);
        hasSubmittedRef.current = false;
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
        }, 0);
    }

    const saveTitle = () => {
        if (hasSubmittedRef.current) return;
        hasSubmittedRef.current = true;

        const nextTitle = title.trim() || "Untitled";
        setTitle(nextTitle);
        if (nextTitle !== initialData.title) {
            void update({
                id: initialData._id,
                title: nextTitle
            });
        }
        setIsEditing(false);
    };


    const onChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTitle(event.target.value);
    };


    const onKeyDown =(
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            saveTitle();
        }
    };

    return(
        <div className="flex items-center gap-x-1">
            {!!initialData.icon && <p>{initialData.icon}</p>}
            {isEditing ? (
                <Input
                    ref={inputRef}
                    onChange={onChange}
                    onBlur={saveTitle}
                    value={title}
                    onKeyDown={onKeyDown}
                    className="h-7 px-2 text-[17px] md:text-[17px] focus-visible:ring-transparent"
                />
            ): (
                <Button
                onClick={enableInput}
                variant="ghost"
                size="sm"
                className="font-normal h-auto p-1 text-[17px]"
                >
                    <span className="truncate">
                    {initialData?.title}
                    </span>
                </Button>
            )}
        </div>
    );
}


Title.Skeleton = function TitleSkeleton() {
    return(
        <Skeleton className="h-7 w-16 rounded-md"/>
    );
};