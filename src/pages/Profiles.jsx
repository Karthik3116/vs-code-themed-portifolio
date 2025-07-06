import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Loader2, AlertCircle, Star, GitBranch, MapPin, Link as LinkIcon } from 'lucide-react';

const GitHubProfile = () => {
  const username = 'Karthik3116';

  const [profile, setProfile] = useState(null);
  const [langData, setLangData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const updateTheme = () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(current);
    };
    updateTheme();
    const obs = new MutationObserver(updateTheme);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        ]);
        if (!userRes.ok) throw new Error(`Profile load failed (${userRes.status})`);
        if (!reposRes.ok) throw new Error(`Repos load failed (${reposRes.status})`);
        const [userJson, reposJson] = await Promise.all([userRes.json(), reposRes.json()]);
        const langCount = {};
        reposJson.forEach(r => r.language && (langCount[r.language] = (langCount[r.language]||0)+1));
        setProfile(userJson);
        setLangData(Object.entries(langCount).map(([name,count]) => ({name,count})).sort((a,b)=>b.count-a.count));
      } catch(err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const chartColors = theme === 'light' ?
    { bg: '#fff', text: '#333', grid: '#ddd', line: '#8884d8' } :
    { bg: '#1e1e1e', text: '#fff', grid: '#444', line: '#8884d8' };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] py-20">
      <Loader2 className="animate-spin w-12 h-12 text-primary" />
      <p className="mt-4 text-lg text-primary">Loading...</p>
    </div>
  );
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] py-20 text-error">
      <AlertCircle className="w-12 h-12 mb-4" />
      <p className="text-lg">Error: {error}</p>
      <button onClick={()=>window.location.reload()} className="mt-4 btn btn-primary">Retry</button>
    </div>
  );

  return (
    <div className="w-full bg-base-100 text-base-content">
      <div className="max-w-3xl mx-auto p-6 space-y-12">

        {/* Profile Header */}
        <section className="flex flex-col sm:flex-row items-center gap-6">
          <img src={profile.avatar_url} alt={profile.login}
            className="w-24 h-24 rounded-full border-2 border-primary" />
          <div className="text-center sm:text-left space-y-2">
            <h1 className="text-3xl font-bold">{profile.name||profile.login}</h1>
            {profile.bio && <p className="text-base-content/70">{profile.bio}</p>}
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2 text-sm">
              {profile.location && <span className="inline-flex items-center gap-1"><MapPin size={14}/> {profile.location}</span>}
              {profile.blog && <a href={profile.blog.startsWith('http')?profile.blog:`https://${profile.blog}`}
                target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                <LinkIcon size={14}/> Blog
              </a>}
            </div>
          </div>
        </section>

        {/* Key Stats */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Key Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {icon:<Star className="mx-auto mb-2 text-yellow-400"/>, value:profile.public_repos, label:'Repos'},
              {icon:<GitBranch className="mx-auto mb-2 text-blue-400"/>, value:profile.followers, label:'Followers'},
              {icon:<Star className="mx-auto mb-2 text-green-400"/>, value:profile.following, label:'Following'}
            ].map((s,i)=>(
              <motion.div key={i} className="p-4 bg-base-200 rounded-lg shadow text-center"
                whileHover={{scale:1.03}} transition={{type:'spring',stiffness:300}}>
                {s.icon}
                <p className="text-lg font-semibold">{s.value}</p>
                <p className="text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Top Languages Chart */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Top Languages</h2>
          {langData.length>0? (
            <div className="w-full h-64 bg-base-200 p-4 rounded-lg">
              <ResponsiveContainer>
                <LineChart data={langData} margin={{top:10,right:30,left:20,bottom:5}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid}/>
                  <XAxis dataKey="name" tick={{fill:chartColors.text}}/>
                  <YAxis allowDecimals={false} tick={{fill:chartColors.text}}/>
                  <Tooltip contentStyle={{backgroundColor:chartColors.bg,borderColor:chartColors.grid}}/>
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke={chartColors.line} strokeWidth={2}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          ):(<p className="text-center text-base-content/70">No language data available</p>)}
        </section>
      </div>

      {/* Full-width Contributions Calendar */}
      <section className={`w-full ${theme==='light'?'bg-base-200':'bg-base-800'} py-8`}>  
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Contributions Calendar</h2>
          <div className="overflow-auto rounded-lg">
            <img src={`https://ghchart.rshah.org/${username}?border=${theme==='light'?'999999':'444444'}&color=99ff66&bg=${theme==='light'?'ffffff':'000000'}`} 
                 alt="GitHub Contributions Calendar" 
                 className="w-full h-auto filter contrast-200 brightness-125" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GitHubProfile;
