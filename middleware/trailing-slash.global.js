export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== '/' && to.path.endsWith('/')) {
    const { path, query, hash } = to;
    const nextPath = path.replace(/\/+$/, '') || '/';
    return navigateTo({ path: nextPath, query, hash }, { redirectCode: 301 });
  }
});
