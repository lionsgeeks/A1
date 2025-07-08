import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        // Try .jsx first, then .tsx as fallback
        const jsxPages = import.meta.glob('./pages/**/*.jsx');
        const tsxPages = import.meta.glob('./pages/**/*.tsx');
        const allPages = { ...jsxPages, ...tsxPages };

        // Prefer .jsx over .tsx
        const jsxPath = `./pages/${name}.jsx`;
        const tsxPath = `./pages/${name}.tsx`;

        if (allPages[jsxPath]) {
            return allPages[jsxPath]();
        } else if (allPages[tsxPath]) {
            return allPages[tsxPath]();
        }

        // Fallback to original resolver
        return resolvePageComponent(`./pages/${name}.jsx`, allPages);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
