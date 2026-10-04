import { create } from "zustand";

type CoverImageStore = {
    url?: string;
    isOpen: boolean;
    isUploading: boolean;
    onOpen: () => void;
    onClose: () => void;
    onReplace: (url: string) => void; 
    setIsUploading: (isUploading: boolean) => void;
};


export const useCoverImage = create<CoverImageStore>((set)=> ({
    url : undefined,
    isOpen: false,
    isUploading: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false, isUploading: false, url: undefined }),
    onReplace: (url: string) => set({ isOpen: true, url }),
    setIsUploading: (isUploading: boolean) => set({ isUploading }),
}));