/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
	output: 'standalone',
	env: {
		PB_URL: process.env.PB_URL,
	},
	webpack: function (config) {
		config.module.rules.push({
			test: /.md$/,
			use: 'raw-loader',
		});
		return config;
	},
};

module.exports = withBundleAnalyzer({
	...nextConfig,
});
