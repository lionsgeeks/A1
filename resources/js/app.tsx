import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        // Create a comprehensive glob that includes both jsx and tsx
        const pages = import.meta.glob('./pages/**/*.{jsx,tsx}');

        // Try .jsx first, then .tsx
        const jsxPath = `./pages/${name}.jsx`;
        const tsxPath = `./pages/${name}.tsx`;

        if (pages[jsxPath]) {
            return pages[jsxPath]();
        } else if (pages[tsxPath]) {
            return pages[tsxPath]();
        }

        // If neither found, throw a helpful error
        throw new Error(`Page not found: ${name} (looked for ${jsxPath} and ${tsxPath})`);
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
