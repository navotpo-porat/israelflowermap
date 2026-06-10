import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

const BASE_URL = 'https://israelflowermap.lovable.app';
const DEFAULT_IMAGE = 'https://storage.googleapis.com/gpt-engineer-file-uploads/cAbFNcyZc4dj5LW2xjbbmeWRuCd2/social-images/social-1772985662537-Flower_setter_1.webp';

const SEO = ({ title, description, path = '/', image }: SEOProps) => {
  const url = `${BASE_URL}${path}`;
  const ogImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
