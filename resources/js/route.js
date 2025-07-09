import { Ziggy } from './ziggy.js';

// Simple route function that works with the generated Ziggy config
export function route(name, params = {}, absolute = false) {
    const routes = Ziggy.routes;
    const route = routes[name];
    
    if (!route) {
        throw new Error(`Route [${name}] not found.`);
    }
    
    let url = route.uri;
    
    // Replace parameters in the URL
    if (route.parameters) {
        route.parameters.forEach(param => {
            if (params[param] !== undefined) {
                url = url.replace(`{${param}}`, params[param]);
            }
        });
    }
    
    // Add base URL if absolute
    if (absolute) {
        url = `${Ziggy.url}/${url}`;
    } else {
        url = `/${url}`;
    }
    
    return url;
}
