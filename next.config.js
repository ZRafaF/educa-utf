/** @type {import('next').NextConfig} */
module.exports = {
	output: 'standalone',
	env: {
		PB_URL: process.env.PB_URL,
	},
};
