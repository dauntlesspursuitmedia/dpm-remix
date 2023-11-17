import { unstable_vitePlugin as remix } from '@remix-run/dev'
import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [remix({ ignoredRouteFiles: ["**/.*"]}), tsConfigPaths()],
});
