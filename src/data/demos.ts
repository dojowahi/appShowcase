import demo1 from '../assets/demo1.png';
import demo2 from '../assets/demo2.png';
import demo3 from '../assets/demo3.png';

export interface Demo {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  thumbnail: string;
  url: string;
  techDetails: string;
}

export const demos: Demo[] = [
  {
    id: '1',
    title: 'GreenGrowth Dashboard',
    description: 'AI-powered agricultural insights and NDVI monitoring dashboard.',
    longDescription: 'GreenGrowth provides real-time monitoring of crop health using satellite imagery and Earth Engine. It uses BigQuery for large-scale data analysis and Gemini for generating actionable insights.',
    techStack: ['React', 'Earth Engine', 'BigQuery', 'Cloud Run', 'Gemini'],
    thumbnail: demo1,
    url: 'https://greengrow-926877739989.us-central1.run.app/',
    techDetails: 'The backend uses Python with FastAPI to interface with Google Earth Engine API. NDVI calculations are performed on the fly. Frontend is built with React and Google Maps JavaScript API for visualization.'
  },
  {
    id: '2',
    title: 'Supply Chain disruption Agent',
    description: 'Intelligent agent for monitoring and mitigating logistics disruptions.',
    longDescription: 'This application monitors global supply chain data and uses RAG (Retrieval-Augmented Generation) to suggest mitigation strategies when disruptions occur.',
    techStack: ['Vite', 'Node.js', 'Vector Search', 'Gemini Pro'],
    thumbnail: demo2,
    url: '#',
    techDetails: 'Built using a microservices architecture on Cloud Run. It utilizes a vector database for efficient document retrieval and Gemini Pro for complex reasoning over disruption patterns.'
  },
  {
    id: '3',
    title: 'Parking Lot Pulse',
    description: 'Real-time competitor traffic analysis using satellite SAR data.',
    longDescription: 'Monitors competitor storefronts using Sentinel-1 SAR data to estimate vehicle counts, helping retail managers understand traffic theft in real-time.',
    techStack: ['Sentinel-1', 'Python', 'Streamlit', 'Vertex AI'],
    thumbnail: demo3,
    url: '#',
    techDetails: 'Sentinel-1 GRD data is processed using snappy and Python. The occupancy model is trained on Vertex AI and deployed as an endpoint. The dashboard is built with Streamlit for rapid prototyping.'
  }
];

