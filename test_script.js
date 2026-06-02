let db = null;
let auth = null;
let currentLang = 'tr';
let content = { tr: {}, en: {} };

async function handleLogin() {
    const errorEl = document.getElementById('login-error');
    const btn = document.getElementById('login-btn');

    try {
        if (typeof firebase === 'undefined' || !auth) {
            throw new Error('Firebase bağlantısı kurulamadı. Lütfen reklam engelleyiciyi kapatın veya sayfayı yenileyin.');
        }

        const email = document.getElementById('admin-email').value;
        const pass = document.getElementById('admin-pass').value;

        if (!email || !pass) {
            throw new Error('Lütfen email ve şifre girin.');
        }

        btn.innerText = 'Giriş Yapılıyor...';
        btn.disabled = true;
        errorEl.style.display = 'none';
        
        await auth.signInWithEmailAndPassword(email, pass);
    } catch (error) {
        console.error(error);
        errorEl.style.display = 'block';
        
        // User-friendly error messages
        let message = error.message || 'Hatalı email veya şifre.';
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            message = 'E-posta adresi veya şifre hatalı.';
        } else if (error.code === 'auth/invalid-email') {
            message = 'Geçersiz bir e-posta adresi girdiniz.';
        } else if (error.code === 'auth/user-disabled') {
            message = 'Bu kullanıcı hesabı askıya alınmış.';
        } else if (error.code === 'auth/too-many-requests') {
            message = 'Çok fazla hatalı giriş denemesi. Lütfen daha sonra tekrar deneyin.';
        } else if (error.code === 'auth/network-request-failed') {
            message = 'İnternet bağlantısı kurulamadı.';
        } else if (error.message && error.message.includes('identity_toolkit')) {
            message = 'Firebase Auth ayarlarınız henüz aktif değil. Lütfen Firebase Console\'dan Email/Password özelliğini açın.';
        }
        
        errorEl.innerText = 'Hata: ' + message;
    } finally {
        btn.innerText = 'Giriş Yap';
        btn.disabled = false;
    }
}
