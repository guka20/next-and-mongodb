/** @type {import('next').NextConfig} */
import { getBaseUrl } from "nextjs-url";
const nextConfig = {
  reactStrictMode: false,
  env: {
    BASE_URL: getBaseUrl().href,
    MONGO_URI:
      "mongodb+srv://gurami:!Guka1234@cluster0.od4ofq2.mongodb.net/?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
