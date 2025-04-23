import { useNuxtApp } from '#app';

function useApi() {
  const { $api: api } = useNuxtApp();
  return api;
}

export { useApi };
