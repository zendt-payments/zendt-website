import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  name?: string;
  type?: string;
  image?: string;
  url?: string;
}

const SEO = ({ 
  title = 'Zendt | The #1 Payment Solution for Freelancers', 
  description = 'Zendt is the ultimate payment solution for freelancers. Receive international freelancer payments, manage multiple currencies, and spend globally with zero borders.',
  name = 'Zendt Payments',
  type = 'website',
  image = 'https://zendtpayments.com/logo-filled.png',
  url = 'https://zendtpayments.com'
}: SEOProps) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content="freelancer payments, payment solution for freelancers, international payments, receive funds globally, freelancer business account, freelancer finance" />
      
      {/* OpenGraph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      
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
