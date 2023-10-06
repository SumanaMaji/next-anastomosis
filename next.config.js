/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
module.exports={
  env: {
    'MYSQL_HOST': 'http://kusdemos.com/',
    'MYSQL_PORT': '3306',
    'MYSQL_DATABASE': 'kusdemos_dateapp',
    'MYSQL_USER': 'dt_app',
    'MYSQL_PASSWORD': 'U5KQ3+v;nfs6',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  //runtime: 'nodejs',
}
//module.exports = nextConfig
