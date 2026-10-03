"use client"

import { useScrollTop } from "@/hooks/use-scroll-tops";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
    SignInButton,
    SignUpButton,
    Show,
    UserButton,
} from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";

export const Navbar = () => {
    const {isAuthenticated, isLoading} = useConvexAuth();
    const scrolled = useScrollTop();

    return(
        <div className={cn(
            "z-50 bg-background fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm"
        )}>
            <Logo/>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && (
                    <Spinner/>
                )}

                <Show when="signed-out">
                    <SignInButton mode="modal">
                        <Button variant="ghost">Sign in</Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <Button>Sign up</Button>
                    </SignUpButton>
                </Show>
                <Show when="signed-in">
                    <UserButton />
                </Show>
                <ModeToggle/>
            </div>
        </div>
    );
}