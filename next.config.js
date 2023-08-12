/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	env: {
		PB_URL: process.env.PB_URL,
	},
};

module.exports = nextConfig;
