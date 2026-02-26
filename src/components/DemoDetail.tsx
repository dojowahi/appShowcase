import React from 'react';
import type { Demo } from '../data/demos';

interface DemoDetailProps {
  demo: Demo;
  onBack: () => void;
}

const DemoDetail: React.FC<DemoDetailProps> = ({ demo, onBack }) => {
  return (
    <div className="animate-fade-in">
      <div className="back-link" onClick={onBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Showcase
      </div>

      <div className="detail-view">
        <div className="detail-visual">
          <img
            src={demo.thumbnail}
            alt={demo.title}
            style={{ width: '100%', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--surface-border)' }}
          />
          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1rem', marginBottom: '1rem' }}>
              Tech Stack
            </h4>
            <div className="tags-container">
              {demo.techStack.map((tech) => (
                <span key={tech} className="tech-tag" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="detail-info">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>
            {demo.title}
          </h2>
          <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
            {demo.longDescription}
          </p>

          <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--surface-border)', marginBottom: '2rem' }}>
            <h4 style={{ color: 'var(--google-blue)', marginBottom: '0.8rem', fontWeight: 500 }}>Technical Implementation</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {demo.techDetails}
            </p>
          </div>

          <a href={demo.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Launch Demo
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DemoDetail;
