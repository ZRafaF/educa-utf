// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/umami/', '/pb/', '/edit/'],
		},
		sitemap: 'https://educautf.td.utfpr.edu.br/sitemap.xml',
	};
}
