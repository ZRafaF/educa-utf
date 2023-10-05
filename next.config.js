/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === 'development', // Disables PWA generation on DEV mode
});

const nextConfig = {
	output: 'standalone',
	env: {
		PB_URL: process.env.PB_URL,
	},
	reactStrictMode: true,
	webpack: function (config) {
		config.module.rules.push({
			test: /.md$/,
			use: 'raw-loader',
		});
		return config;
	},
};

module.exports = withBundleAnalyzer(
	withPWA({
		...nextConfig,
	})
);
