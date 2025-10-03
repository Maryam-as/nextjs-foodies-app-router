/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dwjdkslyd/image/upload/**/foodies_app/**",
      },
    ],
  },
};

module.exports = nextConfig;
