/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import summary from 'rollup-plugin-summary';
import terser from '@rollup/plugin-terser';

export default {
  input: 'chai-form-buster.js',
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
    /**
     * This minification setup is optimized for a standalone
     * production output (e.g., for CDN hosting).
     */
    //minifyHTML(),
    terser({
      ecma: 2021,
      module: false,
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
