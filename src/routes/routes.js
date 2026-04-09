export class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentRoute = null;

        window.addEventListener('popstate', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    handleRoute() {
        const path = window.location.pathname || '/';
        let route = this.routes.find(r => r.path === path);

        if (!route) {
            route = this.findRouteWithParams(path);
        }

        if (route) {
            this.currentRoute = route;

            if (route.params) {
                route.handler(route.params)
            } else {
                route.handler();
            }
        } else {
            this.navigate('/');
        }
    }

    findRouteWithParams(path) {
        for (const route of this.routes) {
            if (route.path.includes(':')) {
                const routeParts = route.path.split('/');
                const pathParts = path.split('/');
                
                if (routeParts.length === pathParts.length) {
                    const params = {};
                    let match = true;
                    
                    for (let i = 0; i < routeParts.length; i++) {
                        if (routeParts[i].startsWith(':')) {
                            const paramName = routeParts[i].slice(1);
                            params[paramName] = pathParts[i];
                        } else if (routeParts[i] !== pathParts[i]) {
                            match = false;
                            break;
                        }
                    }
                    
                    if (match) {
                        route.params = params;
                        return route;
                    }
                }
            }
        }
        return null;
    }

    navigate(path, replace = false) {
        if (replace) {
            window.history.replaceState({}, '', path);
        } else {
            window.history.pushState({}, '', path);
        }
        this.handleRoute();
    }
}