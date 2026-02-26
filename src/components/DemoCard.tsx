import React from 'react';
import type { Demo } from '../data/demos';

interface DemoCardProps {
  demo: Demo;
  onClick: () => void;
}

const DemoCard: React.FC<DemoCardProps> = ({ demo, onClick }) => {
  return (
    <div className="demo-card glass animate-fade-in" onClick={onClick}>
      <img src={demo.thumbnail} alt={demo.title} className="demo-card-image" />
      <div className="demo-card-content">
        <h3 className="demo-card-title">{demo.title}</h3>
        <p className="demo-card-description">{demo.description}</p>
        <div className="tags-container">
          {demo.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
          {demo.techStack.length > 3 && (
            <span className="tech-tag">+{demo.techStack.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoCard;
