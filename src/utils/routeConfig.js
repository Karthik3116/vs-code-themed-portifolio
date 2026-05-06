export const routeToTab = {
  '/': 'Home.jsx',
  '/home': 'Home.jsx',
  '/about': 'About.txt',
  '/projects': 'Projects.zip',
  '/profiles': 'Profiles.json',
  '/contact': 'Contact.info',
  '/settings': 'Settings.config',
  '/insights': 'Insights.log',
  '/details': 'Status.log',
};

export const tabToRoute = {
  'Home.jsx': '/home',
  'About.txt': '/about',
  'Projects.zip': '/projects',
  'Profiles.json': '/profiles',
  'Contact.info': '/contact',
  'Settings.config': '/settings',
  'Insights.log': '/insights',
  'Status.log': '/details',
};

export const isValidRoute = (path) => path in routeToTab;

// Track page visits in localStorage
export const trackPageVisit = (path) => {
  try {
    const visits = JSON.parse(localStorage.getItem('karthik_site_visits') || '[]');
    visits.push({
      path,
      timestamp: Date.now(),
      referrer: document.referrer || '',
      userAgent: navigator.userAgent,
    });
    // Keep last 1000 visits
    if (visits.length > 1000) visits.splice(0, visits.length - 1000);
    localStorage.setItem('karthik_site_visits', JSON.stringify(visits));
  } catch {
    // localStorage may be full or disabled
  }
};

export const getVisitHistory = () => {
  try {
    return JSON.parse(localStorage.getItem('karthik_site_visits') || '[]');
  } catch {
    return [];
  }
};
