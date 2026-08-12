import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ITravelista PH',
    short_name: 'ITravelista',
    description: 'Your all-in-one travel companion. Plan. Prepare. Apply. Travel.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F9FA',
    theme_color: '#008080',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
