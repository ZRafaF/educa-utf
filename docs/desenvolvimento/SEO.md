<!--
 Copyright (c) 2023 Rafael Farias
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# SEO

SEO ou *Search Engine Optimization* é um aspecto crucial para essa aplicação. Esta página apresentará as ferramentas e técnicas utilizadas para melhorar o SEO do EducaUTF.

## Indexadores

### Google Search Console
O [Google Search Console](https://search.google.com/search-console/) é uma ferramenta fornecida pela Google para analisar a indexação de seu website na plataforma. 

Os dados fornecidos por essa ferramenta são cruciais para a melhoria da aplicação.


#### Verificando propriedade do website
Para verificar a propriedade da página foi adicionado o arquivo `google9365f4fd3245c688.html` a pasta `public` da aplicação.

### Bing Webmaster

O [Bing Webmaster](https://www.bing.com/webmasters) é a ferramenta de indexação do Bing, ela permite a importação de páginas direto do Google Search Console, facilitando a integração.

## Metadados
Metadados são informações extremamente úteis para os *crawlers*, para os artigos estes foram gerados dinamicamente, o exemplo a seguir mostra a geração de metadados para os artigos:

``` tsx
export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const articleId = params.slug[0];

	try {
		const article = await getArticleById(articleId);
		const articleStats = await getArticleStatsById(articleId);
		const ArticleCoverUrl = getArticleCoverURL(article);
		let tag = article.expand?.tag?.name ?? '';
		return {
			title: article.title,
			description: article.description,
			applicationName: 'EducaUTF',
			authors: [{ name: articleStats.author_name }],
			openGraph: {
				title: article.title,
				description: article.description,
				siteName: 'EducaUTF',
				images: [{ url: ArticleCoverUrl }],
				locale: 'pt_BR',
				type: 'website',
			},
			keywords: ['EducaUTF', 'artigo', article.title, tag],
		};
	} catch (error) {
		return {
			title: 'Artigo privado',
			description: 'Artigo privado',
		};
	}
}
```

## Sitemap
Sitemaps fornecem aos indexadores todo o esquema de seu website, eles são uteis para facilitar que o *crawler* alcance páginas que não possuam muitos links a elas.

O arquivo `sitemap.xml` também é gerado dinamicamente, para incluir todo o conteúdo gerado por usuários, você pode encontrar o script responsável em gera-lo em `app/sitemap.ts`.

## robots.txt
Esse arquivo serve como instruções para os *crawlers*, esse também é gerado dinamicamente e pode ser encontrado em `app/robots.ts`.