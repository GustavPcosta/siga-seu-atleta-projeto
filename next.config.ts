/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "codante.s3.amazonaws.com",
        port: "",
        pathname: "/codante-apis/olympic-games/pictograms/**",
      },
    ],
  },
};

export default nextConfig;