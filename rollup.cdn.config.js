/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import summary from 'rollup-plugin-summary';
import terser from '@rollup/plugin-terser';
//import minifyHTML from 'rollup-plugin-minify-html-literals';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export default {
  input: 'chai-form.js',
  output: {
    file: 'dist/chai-form.v1.js',
    format: 'esm',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({
      'Reflect.decorate': 'undefined',
      // 'https://example.local:3000': 'https://form.app.comehome.ai',
    }),
    resolve(),
    /**
     * This minification setup is optimized for a standalone
     * production output (e.g., for CDN hosting).
     */
    //minifyHTML(),
    terser({
      ecma: 2021,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    summary(),
  ],
};
