import routerMapper from '../libs/routes/mapper';
import * as IndexDummyRoutes from './v1/routes/IndexDummy';

export const defineRoutes = function(params: { app }) {
	const { app } = params;
	const namespaceV1Base = '/v1';
    const arrayV1Routes = [ {
        path: 'dummy',
        routes: IndexDummyRoutes
    } ];

    arrayV1Routes.forEach((dataRoute) => {
        app.use(
            namespaceV1Base,
            routerMapper
            .setRoutesBySpecialNamespace(
                dataRoute.routes,
                dataRoute.path,
                { } // Props to inyect
            )
        );
    });

};
