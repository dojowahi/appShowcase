import React, { useState } from 'react';
import type { Demo } from '../data/demos';
import DemoForm from './DemoForm';

interface AdminDashboardProps {
  demos: Demo[];
  onAddDemo: (demo: Demo) => void;
  onUpdateDemo: (demo: Demo) => void;
  onDeleteDemo: (id: string) => void;
  onReorder: (id: string, direction: 'up' | 'down') => void;
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  demos,
  onAddDemo,
  onUpdateDemo,
  onDeleteDemo,
  onReorder,
  onBack,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingDemo, setEditingDemo] = useState<Demo | undefined>(undefined);

  const handleEdit = (demo: Demo) => {
    setEditingDemo(demo);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingDemo(undefined);
    setShowForm(true);
  };

  const handleSubmit = (demo: Demo) => {
    if (editingDemo) {
      onUpdateDemo(demo);
    } else {
      onAddDemo(demo);
    }
    setShowForm(false);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back to Showcase
        </button>
        <h2 style={{ margin: 0, fontWeight: 500, color: 'var(--text-primary)' }}>Admin Dashboard</h2>
        <button className="btn btn-primary" onClick={handleAdd}>
          + Add New Demo
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>Order</th>
              <th>Title</th>
              <th>Tech Stack</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {demos.map((demo, index) => (
              <tr key={demo.id}>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => onReorder(demo.id, 'up')}
                      disabled={index === 0}
                      style={{ padding: '2px 4px', fontSize: '10px' }}
                    >▲</button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => onReorder(demo.id, 'down')}
                      disabled={index === demos.length - 1}
                      style={{ padding: '2px 4px', fontSize: '10px' }}
                    >▼</button>
                  </div>
                </td>
                <td>{demo.title}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {demo.techStack.map((tech) => (
                      <span key={tech} className="tech-badge" style={{ fontSize: '0.7rem' }}>{tech}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(demo)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => onDeleteDemo(demo.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <DemoForm
          demo={editingDemo}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
