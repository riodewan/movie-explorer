'use client';

export default function Error({ error }: { error: Error }) {
  return <p className="text-red-600">Terjadi kesalahan: {error.message}</p>;
}