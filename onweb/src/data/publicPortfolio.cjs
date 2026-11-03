// Public copy only. Never put internal notes, datasets, private URLs, or hidden
// project descriptions in this module: it ships to every visitor's browser.
const PUBLIC_PROFILE = {
  name: 'Andi Scarola',
  summary: 'Software engineer, AI researcher, and founder in El Paso. A graduate student studying artificial intelligence at UTEP and building tools for research and everyday use.',
};

const PUBLIC_PROJECTS = [
  {
    id: 'bordereta', title: 'BorderETA', category: 'Products', status: 'Building',
    link: 'https://www.bordereta.org/en', poster: '/project-previews/bordereta.jpg',
    description: 'Building a bilingual tool to help people plan crossings between El Paso and Juárez. My focus is clear information and a useful experience for people who cross regularly.', featured: true,
  },
  {
    id: 'bidwire', title: 'Bidwire', category: 'Products', status: 'Building',
    link: 'https://bidwire.vercel.app/', poster: '/project-previews/bidwire.jpg', livePreview: true,
    description: 'A project-opportunity service that helps agencies find relevant work and review the essentials in one brief.',
  },
  {
    id: 'manufacturing-research', poster: '/images/keck.webp', posterAlt: 'The Keck Center, where I do research', title: 'Additive Manufacturing Research', category: 'Research', status: 'Research',
    description: 'Developing software for additive manufacturing workflows at the Keck Center for 3D Innovation. My work connects geometry, software engineering, and practical research tools.', featured: true,
  },
  {
    id: 'materials-vision', poster: '/images/keck-people.webp', posterAlt: 'The research team at the Keck Center', title: 'Computer Vision for Materials', category: 'Research', status: 'Research',
    description: 'Applying computer vision to materials imagery to support researchers studying composite microstructures. My work spans image analysis and tools for interpreting results.',
  },
  {
    id: 'text-to-part', poster: '/images/keck.webp', posterAlt: 'The Keck Center for 3D Innovation', title: 'Text to Printed Part', category: 'Research', status: 'In development',
    description: 'Exploring natural-language tools that make digital fabrication more approachable. The project brings together applied AI and manufacturing software.',
  },
  {
    id: 'agent-tooling', poster: '/images/Karen.webp', posterAlt: 'My custom jellyfish illustration', title: 'Agent Tooling', category: 'Products', status: 'In development', underWraps: true,
    description: 'Building tools for more reliable AI-assisted work, with a focus on reviewing results and keeping people in control.',
  },
  {
    id: 'sophia', poster: '/images/Karen.webp', posterAlt: 'My custom jellyfish illustration', title: 'Sophia', category: 'Products', status: 'In development', underWraps: true,
    description: 'An assistant project exploring more natural ways to interact with software. Further details will be shared when the project is ready.',
  },
  {
    id: 'aeroscout', poster: '/images/workingondrone.webp', posterAlt: 'Working on a drone prototype', title: 'AeroScout', category: 'Past work', status: 'Hackathon prototype',
    description: 'A team computer vision prototype presented at UTEP’s AI hackathon. I contributed software and applied AI work to the project.',
  },
  {
    id: 'fight-coach', title: 'Fight Coach', category: 'Past work', status: 'Hackathon project',
    description: 'A pose-analysis prototype for combat sports. It explores how movement from recorded footage can become useful feedback for practice.', github: 'https://github.com/ascarola17/Fight-coach', video: 'https://www.youtube.com/watch?v=_qpvr-0M2Ec',
  },
  {
    id: 'dui-risk-radar', title: 'DUI Risk Radar', category: 'Past work', status: 'Hackathon project',
    description: 'A map-based prototype that visualizes impaired-driving risk patterns. Built to make location-based data easier to explore.', github: 'https://github.com/ascarola17/DUI', video: 'https://www.youtube.com/watch?v=j8vquDaPgc8',
  },
  {
    id: 'asl-interpreter', title: 'ASL Interpreter', category: 'Past work', status: 'Research prototype',
    description: 'An early computer vision project exploring ASL letter recognition from hand gestures. Developed through the NSF AI-EDGE program.', video: 'https://www.youtube.com/watch?v=yWli0SsIAIU',
  },
  {
    id: 'snapmarket', title: 'SnapMarket', category: 'Past work', status: 'TikTok TechJam',
    description: 'A team prototype that identifies products in video and helps people find similar items. Built for TikTok TechJam.', github: 'https://github.com/ascarola17/TikTokJam', video: 'https://www.youtube.com/watch?v=cj87lIUYVZQ',
  },
];

module.exports = { PUBLIC_PROFILE, PUBLIC_PROJECTS };
