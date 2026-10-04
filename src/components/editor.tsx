"use client";


import type { PartialBlock } from "@blocknote/core";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/core/style.css";
import "@blocknote/shadcn/style.css";
import { useTheme } from "next-themes";

import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps{
    onChange: (value: string) => void;
    initialContent ?: string;
    editable ?: boolean;
};

const Editor = ({
    onChange,
    initialContent,
    editable
} : EditorProps ) => {

    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({file});

        return response.url;
    }

    const editor = useCreateBlockNote({
        initialContent: initialContent
            ? JSON.parse(initialContent) as PartialBlock[]
            : undefined,
            uploadFile: handleUpload,
    });

    return(
        <BlockNoteView
            editor={editor}
            editable={editable}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            className="min-h-[45vh]"
            onChange={() => onChange(JSON.stringify(editor.document, null, 2))}
        />
    );
}

export default Editor;