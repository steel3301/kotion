"use client";

import Image from "next/image";

const Error = () => {
    return(
        <div className="min-h-dvh w-full flex flex-col items-center justify-center space-y-4 text-center">
            <Image
                src="/chintu-screaming-in-microphone.png"
                alt="Error"
                height="300"
                width="400"
                className="dark:hidden"
            />
            <Image
                src="/chintu-screaming-in-microphone-dark.png"
                alt="Error"
                height="300"
                width="400"
                className="hidden dark:block"
            />
            <h2 className="text-xl font-medium">
                Something went wrong!
            </h2>
        </div>
    );
}


export default Error;