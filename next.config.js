/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URI:
      "mongodb+srv://gurami:!Guka1234@cluster0.od4ofq2.mongodb.net/?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
