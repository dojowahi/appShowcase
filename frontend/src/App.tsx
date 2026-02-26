import React, { useState, useEffect } from 'react';

import type { Demo } from './data/demos';
import DemoCard from './components/DemoCard';
import DemoDetail from './components/DemoDetail';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [demos, setDemos] = useState<Demo[]>([]);
  const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null);
  const [isAdminView, setIsAdminView] = useState(() => window.location.pathname === '/admin');

  useEffect(() => {
    const fetchDemos = async () => {
      try {
        const response = await fetch('/demos');
        if (response.ok) {
          const data = await response.json();
          setDemos(data);
        } else {
          console.error('Failed to fetch demos', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching demos:', error);
      }
    };
    fetchDemos();
  }, []);

  useEffect(() => {
    // Handle browser back/forward buttons
    const handleLocationChange = () => {
      setIsAdminView(window.location.pathname === '/admin');
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);



  const handleNavigateToHome = () => {
    window.history.pushState({}, '', '/');
    setIsAdminView(false);
  };

  const handleAddDemo = async (newDemo: Demo) => {
    try {
      const response = await fetch('/demos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDemo),
      });
      if (response.ok) {
        setDemos([newDemo, ...demos]);
      } else {
        console.error('Failed to add demo');
      }
    } catch (error) {
      console.error('Error adding demo:', error);
    }
  };

  const handleUpdateDemo = async (updatedDemo: Demo) => {
    try {
      const response = await fetch(`/demos/${updatedDemo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDemo),
      });
      if (response.ok) {
        setDemos(demos.map(d => d.id === updatedDemo.id ? updatedDemo : d));
      } else {
        console.error('Failed to update demo');
      }
    } catch (error) {
      console.error('Error updating demo:', error);
    }
  };

  const handleDeleteDemo = async (id: string) => {
    if (confirm('Are you sure you want to delete this demo?')) {
      try {
        const response = await fetch(`/demos/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setDemos(demos.filter(d => d.id !== id));
        } else {
          console.error('Failed to delete demo');
        }
      } catch (error) {
        console.error('Error deleting demo:', error);
      }
    }
  };

  const handleReorder = (id: string, direction: 'up' | 'down') => {
    setDemos(prevDemos => {
      const index = prevDemos.findIndex(d => d.id === id);
      if (index === -1) return prevDemos;

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prevDemos.length) return prevDemos;

      const updatedDemos = [...prevDemos];
      const [movedDemo] = updatedDemos.splice(index, 1);
      updatedDemos.splice(newIndex, 0, movedDemo);
      return updatedDemos;
    });
  };

  const renderContent = () => {
    if (isAdminView) {
      return (
        <AdminDashboard
          demos={demos}
          onAddDemo={handleAddDemo}
          onUpdateDemo={handleUpdateDemo}
          onDeleteDemo={handleDeleteDemo}
          onReorder={handleReorder}
          onBack={handleNavigateToHome}
        />
      );
    }

    if (selectedDemo) {
      return <DemoDetail demo={selectedDemo} onBack={() => setSelectedDemo(null)} />;
    }

    return (
      <div className="card-grid">
        {demos.map((demo) => (
          <DemoCard
            key={demo.id}
            demo={demo}
            onClick={() => setSelectedDemo(demo)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '5rem', paddingTop: '2rem' }}>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 500, letterSpacing: '-0.02em' }}>
          <span className="blue">G</span>
          <span className="red">C</span>
          <span className="yellow">P</span>
          <span style={{ marginLeft: '0.8rem', color: 'var(--text-primary)' }}>Solution Showcase</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', fontWeight: 400, lineHeight: 1.6 }}>
          Explore a portfolio of AI-powered cloud solutions and modern web applications built on Google Cloud Platform.
        </p>
      </header>

      {renderContent()}

      <footer style={{ marginTop: '6rem', textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--surface-border)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <div style={{ marginTop: '0.5rem', fontWeight: 600 }}>created by @ankurwahi</div>
      </footer>
    </div>
  );
};

export default App;
