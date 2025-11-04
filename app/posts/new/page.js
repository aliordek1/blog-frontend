// Bu component'te form etkileşimi (tıklama, yazma) olacağı için 'use client'
'use client';

// React'in 'useState' (form durumu) ve Next.js'in 'useRouter' (yönlendirme)
// hook'larını import ediyoruz.
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Yönlendirme için

export default function NewPostPage() {
    // Form alanları için state (durum) tanımlamaları
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Başarı mesajı için yeni bir state
    const [message, setMessage] = useState('');

    const router = useRouter(); // Yönlendirme fonksiyonunu hazırla

    // Form gönderildiğinde çalışacak fonksiyon
    const handleSubmit = async (e) => {
        e.preventDefault(); // Formun sayfayı yenilemesini engelle
        setMessage(''); // Eski mesajları temizle

        try {
            // Backend API'mize (3001 portu) fetch ile POST isteği atıyoruz
            const response = await fetch('http://localhost:3001/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                }),
            });

            if (response.ok) {
                // Başarılı olursa (201 Created gibi)

                // 1. Testimizin aradığı BAŞARI MESAJINI göster
                setMessage('Yazı başarıyla oluşturuldu.');

                // 2. Testimizin bir sonraki adımı için kullanıcıyı anasayfaya yönlendir
                setTimeout(() => {
                    router.push('/'); // Anasayfaya (localhost:3000) yönlendir
                }, 2000); // 2 saniye beklet

            } else {
                // Başarısız olursa
                setMessage('Yazı oluşturulurken bir hata oluştu.');
            }
        } catch (error) {
            console.error('API isteği başarısız:', error);
            setMessage('Sunucuya bağlanılamadı.');
        }
    };

    return (
        <main>
            <h1>Yeni Yazı Oluştur</h1>

            {/* Başarı veya hata mesajını göstermek için bu alanı ekledik */}
            {message && <p style={{ color: 'green' }}>{message}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Başlık:</label>
                    <input
                        type="text"
                        placeholder="Başlık"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>İçerik:</label>
                    <textarea
                        placeholder="İçerik"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button type="submit">
                    Yazıyı Kaydet
                </button>
            </form>
        </main>
    );
} 