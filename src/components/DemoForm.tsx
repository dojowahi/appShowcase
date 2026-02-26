import React, { useState } from 'react';
import type { Demo } from '../data/demos';

interface DemoFormProps {
  demo?: Demo;
  onSubmit: (demo: Demo) => void;
  onCancel: () => void;
}

const DemoForm: React.FC<DemoFormProps> = ({ demo, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Demo, 'id'>>({
    title: demo?.title || '',
    description: demo?.description || '',
    longDescription: demo?.longDescription || '',
    techStack: demo?.techStack || [],
    thumbnail: demo?.thumbnail || '',
    url: demo?.url || '',
    techDetails: demo?.techDetails || '',
  });

  const [techInput, setTechInput] = useState(demo?.techStack.join(', ') || '');
  const [imagePreview, setImagePreview] = useState<string | null>(demo?.thumbnail || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800; // max width for standard thumbnails
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Compress to JPEG format with 0.7 quality to guarantee it fits in 1MB Firestore limit
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          setImagePreview(compressedBase64);
          setFormData({ ...formData, thumbnail: compressedBase64 });
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: demo?.id || Math.random().toString(36).substr(2, 9),
      techStack: techInput.split(',').map(s => s.trim()).filter(s => s !== ''),
    } as Demo);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-scale-in">
        <h2 style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>{demo ? 'Edit Demo' : 'Add New Demo'}</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Demo Title"
            />
          </div>
          <div className="form-group">
            <label>Thumbnail Image</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--surface-border)' }}
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ fontSize: '0.8rem' }}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Description (Short)</label>
            <input
              type="text"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Short description for card"
            />
          </div>
          <div className="form-group">
            <label>Long Description</label>
            <textarea
              required
              rows={3}
              value={formData.longDescription}
              onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
              placeholder="Detailed description for expanded view"
            />
          </div>
          <div className="form-group">
            <label>Tech Stack (comma separated)</label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="React, Earth Engine, BigQuery"
            />
          </div>
          <div className="form-group">
            <label>Launch URL</label>
            <input
              type="text"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div className="form-group">
            <label>Technical Details</label>
            <textarea
              rows={3}
              value={formData.techDetails}
              onChange={(e) => setFormData({ ...formData, techDetails: e.target.value })}
              placeholder="Underlying technology details"
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {demo ? 'Update Demo' : 'Create Demo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DemoForm;
