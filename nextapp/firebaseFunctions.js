import { onRequest } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import next from 'next';
import path from 'path';

// Inicializar Firebase Admin
initializeApp();

const distDir = '../.next';
const nextjsDistDir = path.join('src', distDir);
const nextjsServer = next({
    dev: false,
    conf: {
        webpack(config, options) {
            config.resolve.extensions.push('.mjs', '.js', '.cjs');

            return config;
        },
        distDir: nextjsDistDir,
        // experimental: { esmExternals: 'loose' },
        trailingSlash: true,
        images: {
            domains: [ ],
            disableStaticImages: false,
        },
        compiler: {
          styledComponents: true, // Habilita la transformación SWC de styled-components
        },
    },
});

const nextjsHandle = nextjsServer.getRequestHandler();

export const nextapp = onRequest({ memory: '1GiB', minInstances: 0 }, (req, res) => {
    return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});
