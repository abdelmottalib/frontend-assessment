/** @type {import('next').NextConfig} */
const nextConfig = {

    compiler: {
        removeConsole: {
          exclude: ['log', 'info', 'debug', 'error'],
        },
      },
};

export default nextConfig;
