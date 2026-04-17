import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  name?: string;
  type?: string;
  image?: string;
  url?: string;
  // Article-specific props for blog posts
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

const SEO = ({ 
  title = 'Zendt | The #1 Payment Solution for Freelancers', 
  description = 'Zendt is the ultimate payment solution for freelancers. Receive international freelancer payments, manage multiple currencies, and spend globally with zero borders.',
  name = 'Zendt Payments',
  type = 'website',
  image = 'https://zendtpayments.com/logo-filled.png',
  url = 'https://zendtpayments.com',
  publishedTime,
  modifiedTime,
  author,
  tags,
}: SEOProps) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content="freelancer payments India, receive international payments India, international payment solution freelancers, receive USD in India, freelancer global account, cross-border payments India, GCC payments India, receive AED in India, multi-currency wallet India, payment platform freelancers, INR withdrawal, RBI compliant payments, Payoneer alternative India, Wise alternative India" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* OpenGraph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Zendt Payments" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article-specific OG tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && tags && tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter cards */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
