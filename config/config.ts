import { defineConfig } from 'umi';
import { routes } from './route';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {
    loading: '@/loading',
  },
  history: { type: 'hash' },
  publicPath: 'https://cdn.jsdelivr.net/gh/fierew/fierew.github.io@v1.0.5/',
  runtimePublicPath: true,
  antd: {
    dark: false,
    compact: false,
  },
  layout: {
    name: 'Blog Admin',
    locale: false,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    title: true,
    baseNavigator: true,
    baseSeparator: '-',
  },
  routes: routes,
});
