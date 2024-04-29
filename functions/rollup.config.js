import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
 * Add here external dependencies that actually you use.
 */
const externals = [
    'cors',
    'firebase-functions',
    'firebase-admin',
];

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

export default {
    input: 'src/index.ts',
    external: id => externals.some(pkg => id === pkg || id.startsWith(pkg + '/')),
    plugins: [
        nodeResolve({
            preferBuiltins: true,
            browser: false
        }),
        json(),
        commonjs(),
        typescript(),
    ],
    onwarn: () => { return },
    output: {
        file: 'lib/index.js',
        format: 'es',
        sourcemap: false
    }
}

