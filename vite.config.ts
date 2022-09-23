import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig(({ mode }) => {
  const baseConfig = {
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        },
      ],
    },
    plugins: [vue()],
  }

  if (mode == 'demo') {
    return { ...baseConfig }
  }

  return {
    ...baseConfig,
    build: {
      sourcemap: true,
      emptyOutDir: false,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'orion-design',
      },
      rollupOptions: {
      // ensures vue isn't added to the bundle
        external: ['vue', 'vue-router'],
        output: {
          exports: 'named',
          // Provide vue as a global variable to use in the UMD build
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  }

})
