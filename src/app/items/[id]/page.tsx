'use client';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function EditItem() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setContent(data.content);
      });
  }, [id]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`/api/items/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
    router.push('/');
  }

  async function handleDelete() {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    router.push('/');
  }

  return (
    <div className="container my-5">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h2 className="card-title text-center text-warning fw-bold mb-4">Edit Item</h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label fw-semibold">Judul</label>
              <input
                id="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="form-control"
                placeholder="Masukkan judul"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="content" className="form-label fw-semibold">Konten</label>
              <textarea
                id="content"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="form-control"
                rows={4}
                placeholder="Masukkan konten"
                required
              />
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-warning fw-bold">Update</button>
              <button type="button" onClick={handleDelete} className="btn btn-danger fw-bold">Hapus</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
