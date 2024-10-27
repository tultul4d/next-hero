/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React Strict Mode
    reactStrictMode: true,

    // Define environment variables
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
        SECRET_KEY: process.env.SECRET_KEY,
    },

    // Optional: Custom Webpack configuration
    webpack: (config, { isServer }) => {
        // Custom Webpack configurations can be made here
        return config;
    },

    // Optional: Configure images
    images: {
        domains: ['your-image-domain.com'], // Specify image domains if you're using next/image
    },

    // Optional: Enable internationalization (i18n)
    i18n: {
        locales: ['en-US', 'fr', 'es'], // Add your supported locales
        defaultLocale: 'en-US',
    },
};

export default nextConfig;
