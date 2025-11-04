// Bu bir Sunucu Bileşenidir (Server Component).
// API isteğini sayfa yüklenmeden *önce* sunucuda yapacağız.
// 'use client' KULLANMIYORUZ.
import Link from 'next/link';

// API'den verileri çekecek asenkron fonksiyon
async function getPosts() {
  try {
    // Backend API'mizden (3001) tüm yazıları çekiyoruz
    const res = await fetch('http://localhost:3001/posts', {
      // Önbellekleme (caching) yapma ki yeni yazıyı hemen görelim
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('API\'den veriler alınamadı');
    }
    return res.json();
  } catch (error) {
    console.error("Fetch hatası:", error);
    return []; // Hata olursa boş dizi döndür
  }
}

// Anasayfa component'i artık 'async' (asenkron)
export default async function HomePage() {

  // Sayfa yüklenirken verileri çek
  const posts = await getPosts();

  return (
    <main>
      <h1>Blog Anasayfası</h1>

      <Link href="/posts/new">
        Yeni Yazı Oluştur
      </Link>

      <hr />

      <h2>Yazılar</h2>
      <ul>
        {/* API'den gelen 'posts' dizisini map ile dönüp listeliyoruz */}
        {posts.map((post) => (
          <li key={post.id}>
            {/* İŞTE TESTİMİZİN ARADIĞI BAŞLIK! */}
            {post.title}
          </li>
        ))}

        {/* Eğer hiç post yoksa mesaj göster */}
        {posts.length === 0 && <p>Henüz hiç yazı yok.</p>}
      </ul>

    </main>
  );
}  