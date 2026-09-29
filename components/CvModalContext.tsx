"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import CvModal, { CvLanguage } from "./CvModal";

interface CvModalContextType {
    openCvModal: (lang?: CvLanguage) => void;
    closeCvModal: () => void;
    isOpen: boolean;
}

const CvModalContext = createContext<CvModalContextType | undefined>(undefined);

export function CvProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [initialLang, setInitialLang] = useState<CvLanguage>("en");

    const openCvModal = useCallback((lang: CvLanguage = "en") => {
        setInitialLang(lang);
        setIsOpen(true);
    }, []);

    const closeCvModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <CvModalContext.Provider value={{ openCvModal, closeCvModal, isOpen }}>
            {children}
            <CvModal isOpen={isOpen} onClose={closeCvModal} initialLang={initialLang} />
        </CvModalContext.Provider>
    );
}

export function useCvModal() {
    const context = useContext(CvModalContext);
    if (!context) {
        throw new Error("useCvModal must be used within a CvProvider");
    }
    return context;
}
