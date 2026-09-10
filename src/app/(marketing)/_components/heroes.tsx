import Image from "next/image"


export const Heroes = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[500px] h-[500px] sm:w-[400px] sm:h-[400px] md:w-[400px] md:h[400px]">
                    <Image
                    src = "/chintu-writing.png"
                    fill
                    loading="eager"
                    sizes="(max-width: 639px) 500px, 400px"
                    className="object-contain dark:hidden"
                    alt = "Chintu writing"
                    />
                    <Image
                    src = "/chintu-writing-dark.png"
                    fill
                    sizes="(max-width: 639px) 500px, 400px"
                    className="object-contain hidden dark:block"
                    alt = "Chintu writing"
                    />
                </div>
                <div className="relative h-[300px] w-[300px] hidden md:block">
                    <Image
                    src = "/chintu-reading-sitting.png"
                    fill
                    sizes="(max-width: 767px) 0px, 300px"
                    className="object-contain dark:hidden"
                    alt = "Chintu reading"
                    />
                    <Image
                    src = "/chintu-reading-sitting-dark.png"
                    fill
                    sizes="(max-width: 767px) 0px, 300px"
                    className="object-contain hidden dark:block"
                    alt = "Chintu reading"
                    />
                </div>
            </div>
        </div>
    );
}