"use client"

import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/ui/spinner";
import { redirect } from "next/navigation";
import { Navigation } from "./_components/navigation";
import { SearchCommand } from "@/components/search-command";

const MainLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {

    const { isAuthenticated, isLoading } = useConvexAuth();

    if (isLoading){
        return(
                <div className="h-full flex items-center justify-center">
                <Spinner size="md" />
            </div>
        );
    }
    if (!isAuthenticated){
        return redirect("/");
    }

    return (
        <div className="h-screen w-full flex overflow-hidden">
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">
                <SearchCommand />
                {children}
            </main>
        </div>
    );
}

export default MainLayout;