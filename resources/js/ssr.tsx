import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import ReactDOMServer from 'react-dom/server';
import { type RouteName, route } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
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
        setup: ({ App, props }) => {
            /* eslint-disable */
            // @ts-expect-error
            global.route<RouteName> = (name, params, absolute) =>
                route(name, params as any, absolute, {
                    // @ts-expect-error
                    ...page.props.ziggy,
                    // @ts-expect-error
                    location: new URL(page.props.ziggy.location),
                });
            /* eslint-enable */

            return <App {...props} />;
        },
    }),
);
