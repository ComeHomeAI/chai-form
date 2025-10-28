import {defineConfig} from 'vite';
import {resolve} from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/chai-form.ts'),
      formats: ['es'],
      fileName: 'chai-form',
    },
    // rollupOptions: {
    //   // Externalize dependencies that shouldn't be bundled
    //   external: [
    //     /^lit/,
    //     /^@googlemaps/,
    //     'posthog-js'
    //   ],
    //   output: {
    //     // Preserve the directory structure
    //     preserveModules: false,
    //   },
    // },
    // Output to dist directory to avoid conflicts
    outDir: './dist',
    emptyOutDir: true,
    // Generate source maps
    sourcemap: true,
    // Target modern browsers - but let esbuild handle the actual transpilation
    target: 'es2021',
  },
  esbuild: {
    // Use ES2022 to support accessor keyword properly
    target: 'es2022',
    // Ensure tsconfigRaw includes the necessary settings
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
        useDefineForClassFields: false,
      },
    },
  },
});
