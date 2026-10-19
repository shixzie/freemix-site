export const REPO = 'https://github.com/shixzie/freemix';
export const SITE_REPO = 'https://github.com/shixzie/freemix-site';

/** Prefixes a site path with the configured base so links work under a Pages subpath. */
export function url(path = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
