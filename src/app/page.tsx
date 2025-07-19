'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Item = { id: string; title: string };

export default function Page() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    fetch('/api/items')
      .then(res => (res.ok ? res.json() : Promise.reject('Gagal memuat data')))
      .then(data => setItems(data))
      .catch(err => setError(String(err)));
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    setItems(items.filter(x => x.id !== id));
  };

  const handleEdit = (id: string) => {
    router.push(`/items/${id}`);
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Daftar Item</h2>
        <Link href="/items/new" className="btn btn-primary">
          Buat Baru
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <ul className="list-group">
        {items.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link href={`/items/${item.id}`} className="text-decoration-none fw-semibold">
              {item.title}
            </Link>
            <div className="btn-group">
              <button onClick={() => handleEdit(item.id)} className="btn btn-sm btn-warning">
                Edit
              </button>
              <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-danger">
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
