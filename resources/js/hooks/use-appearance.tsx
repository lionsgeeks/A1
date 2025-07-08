import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

const applyTheme = () => {
    // Force light mode - always remove dark class
    document.documentElement.classList.remove('dark');
};

export function initializeTheme() {
    // Force light mode
    applyTheme();
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('light');

    const updateAppearance = useCallback(() => {
        // Force light mode
        setAppearance('light');
        applyTheme();
    }, []);

    useEffect(() => {
        // Force light mode on mount
        updateAppearance();
    }, [updateAppearance]);

    return { appearance, updateAppearance } as const;
}
