import { Helmet } from 'react-helmet-async';

const seoData = {
  'Home.jsx': {
    title: 'Kartheek Kethavath — Full Stack Developer | React & Node.js Portfolio',
    description:
      'Portfolio of Kartheek Kethavath — Full Stack Developer specializing in React, Node.js, AI/ML. Explore projects, resume, and open-source contributions.',
    canonical: 'https://karthik.top/',
  },
  'About.txt': {
    title: 'About Kartheek Kethavath — Skills, Education & Experience',
    description:
      "Learn about Kartheek Kethavath's skills in React, Node.js, Python, and AI/ML. Education at KMIT Hyderabad, Telangana.",
    canonical: 'https://karthik.top/about',
  },
  'Projects.zip': {
    title: 'Projects — Kartheek Kethavath | Full Stack & AI/ML Projects',
    description:
      'Explore projects by Kartheek Kethavath including Bio Vault, aiXinterview, Smart PDF Chat, CheXNet, and more.',
    canonical: 'https://karthik.top/projects',
  },
  'Profiles.json': {
    title: 'Profiles — Kartheek Kethavath | GitHub & LeetCode Stats',
    description:
      "View Kartheek Kethavath's GitHub contributions, LeetCode stats, contest history, and programming achievements.",
    canonical: 'https://karthik.top/profiles',
  },
  'Contact.info': {
    title: 'Contact Kartheek Kethavath — Get In Touch',
    description:
      'Contact Kartheek Kethavath for collaboration, freelance work, or any inquiries. Reach out via the contact form or email.',
    canonical: 'https://karthik.top/contact',
  },
  'Settings.config': {
    title: 'Settings — Kartheek Kethavath Portfolio | Theme Customization',
    description:
      "Customize the theme of Kartheek Kethavath's portfolio. Choose from 30+ themes including dark, light, dracula, and more.",
    canonical: 'https://karthik.top/settings',
  },
  'Insights.log': {
    title: 'Insights — Performance Dashboard',
    description: "Performance analytics dashboard for Kartheek Kethavath's portfolio.",
    canonical: 'https://karthik.top/insights',
    noindex: true,
  },
};

const SEOHead = ({ tab }) => {
  const data = seoData[tab] || seoData['Home.jsx'];

  return (
    <Helmet>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <link rel="canonical" href={data.canonical} />
      {data.noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      )}
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:url" content={data.canonical} />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
    </Helmet>
  );
};

export default SEOHead;
