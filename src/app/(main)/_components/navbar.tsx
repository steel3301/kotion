"use client";

import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Title } from "./title";
import { Banner } from "./banner";
import { Menu } from "./menu";

interface NavbarProps{
    isCollapsed: boolean;
    onResetWidth: () => void;
}



export const Navbar = ({
    isCollapsed,
    onResetWidth
}: NavbarProps) => {

    const params = useParams();
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">
    });


    if (document === undefined) {
        return (
            <nav className="bg-background dark:bg[#1F1F1F] px-3 py-3 w-full flex items-center">
                <Title.Skeleton></Title.Skeleton>

            </nav>
        );
    }

    if (document === null) {
        return null;
    }

    return(
        <>
            <nav className="bg-background dark:bg[#1F1F1F] px-3 py-3 w-full flex items-center gap-x-4">
                {isCollapsed && (
                    <MenuIcon 
                    role="button"
                    onClick={onResetWidth}
                    className="h-6 w-6 text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
                    />
                )}

                <div className="flex min-w-0 flex-1 items-center justify-start">
                    <Title initialData={document}/>
                    <div className="flex items-center gap-x-2">
                        <Menu documentId={document._id} />

                    </div>
                </div>
            </nav>
            {document.isArchived && (
                <Banner documentId={document._id}/>
            )}
        </>
    );
}