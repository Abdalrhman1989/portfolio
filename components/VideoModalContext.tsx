"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import VideoModal from "./VideoModal";

export type VideoType = "portfolio" | "resume";

interface VideoModalContextType {
    openVideoModal: (type?: VideoType) => void;
    closeVideoModal: () => void;
    isOpen: boolean;
    activeVideo: VideoType;
    setActiveVideo: (type: VideoType) => void;
}

const VideoModalContext = createContext<VideoModalContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeVideo, setActiveVideo] = useState<VideoType>("portfolio");

    const openVideoModal = useCallback((type: VideoType = "portfolio") => {
        setActiveVideo(type);
        setIsOpen(true);
    }, []);

    const closeVideoModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    // Prevent body scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [isOpen]);

    return (
        <VideoModalContext.Provider
            value={{
                openVideoModal,
                closeVideoModal,
                isOpen,
                activeVideo,
                setActiveVideo
            }}
        >
            {children}
            <VideoModal
                isOpen={isOpen}
                activeVideo={activeVideo}
                onSelectVideo={setActiveVideo}
                onClose={closeVideoModal}
            />
        </VideoModalContext.Provider>
    );
}

export function useVideoModal() {
    const context = useContext(VideoModalContext);
    if (!context) {
        throw new Error("useVideoModal must be used within a VideoProvider");
    }
    return context;
}
