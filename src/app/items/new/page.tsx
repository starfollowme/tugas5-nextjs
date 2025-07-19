'use client';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

const Spinner = () => (
  <div className="spinner-border spinner-border-sm text-light me-2" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="alert alert-danger" role="alert">
    <strong>Terjadi Kesalahan:</strong> {message}
  </div>
);

export default function NewItem() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Judul tidak boleh kosong.');
      return;
    }
    if (!content.trim()) {
      setError('Konten tidak boleh kosong.');
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch('/api/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });

        if (!res.ok) {
          try {
            const { error: apiError } = await res.json();
            setError(apiError || 'Gagal membuat item.');
          } catch {
            setError('Gagal membuat item. Kesalahan server.');
          }
          return;
        }

        router.refresh();
        router.push('/');
      } catch {
        setError('Terjadi kesalahan jaringan. Coba lagi.');
      }
    });
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light p-3">
      <div className="card shadow-lg w-100" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h2 className="card-title text-center text-primary fw-bold mb-3">Buat Item Baru</h2>
          <p className="text-center text-muted mb-4">Isi detail di bawah untuk menambahkan item baru.</p>

          {error && <ErrorMessage message={error} />}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label fw-semibold">
                Judul
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="form-control"
                placeholder="Contoh: Ide Brilian Saya"
                disabled={isPending}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="content" className="form-label fw-semibold">
                Konten
              </label>
              <textarea
                id="content"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="form-control"
                placeholder="Jelaskan item Anda di sini..."
                rows={4}
                disabled={isPending}
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary fw-bold"
                disabled={isPending}
              >
                {isPending && <Spinner />}
                {isPending ? 'Menyimpan...' : 'Buat Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
