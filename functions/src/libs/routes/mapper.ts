import * as express from 'express';
const router = express.Router();

export default class RouterHelper {

    public static setRoute(router: express.Router, method: string, path: string, routeController): RouterHelper {
        router[method](path, routeController);
        return this;
    }

    public static setRoutesBySpecialNamespace(namespace, stringBaseNamespace: string, propsToInyect = {}): express.Router {
        let methodsProperties, methodProp, path, jsonMethod;
        const methods = Object.getOwnPropertyNames(namespace);
        for(const method of methods) {
            methodsProperties = Object.getOwnPropertyNames(namespace[method].prototype);
            const propsToInyectNames = Object.keys(propsToInyect);
            propsToInyectNames.forEach(propName => {
                namespace[method].prototype[propName] = propsToInyect[propName]
            })
            for(methodProp of methodsProperties) {
                if(
                    namespace[method].prototype[methodProp] instanceof Function &&
                    methodProp != 'constructor' &&
                    methodProp != '_setFirebaseAdmin' &&
                    methodProp != '_setFirebaseDb'
                    ) {
                    path = `/${stringBaseNamespace}/${methodProp}`;
                    jsonMethod = namespace[method].prototype[methodProp]();
                    if(jsonMethod && (jsonMethod.controllers instanceof Function || jsonMethod.controllers instanceof Array)) {
                        if(jsonMethod.params && jsonMethod.params.length) {
                            path += `/:${jsonMethod.params.join('/:')}`;
                        }

                        if(methodProp === 'index') {
                            this.setRoute(router, method.toLowerCase(), path.replace('/index', ''), jsonMethod.controllers);
                        } else {
                            this.setRoute(router, method.toLowerCase(), path.replace(/_/g, '-'), jsonMethod.controllers);
                        }
                    }
                }
            }
        }

        return router;
    }

}
