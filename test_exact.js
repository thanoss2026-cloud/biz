        let db = null;
        let auth = null;
        let currentLang = 'tr';
        let content = { tr: {}, en: {} };

        // --- Firebase Init ---
        if (typeof firebase !== 'undefined' && typeof isFirebaseConfigured === 'function' && isFirebaseConfigured()) {
            firebase.initializeApp(firebaseConfig);
            db = firebase.database();
            auth = firebase.auth();

            // Monitor Auth State
            auth.onAuthStateChanged((user) => {
                if (user) {
                    document.getElementById('login-overlay').style.display = 'none';
                    document.getElementById('sync-status').innerHTML = '<i class="fas fa-circle" style="color: #22c55e"></i> CLOUD CONNECTED';
                    document.getElementById('sync-status').style.color = '#22c55e';
                    
                    // Initial data pull
                    db.ref('site_content').once('value').then((snapshot) => {
                        const cloudData = snapshot.val();
                        if (cloudData) {
                            // Migration: Old IDs to New IDs
                            ['tr', 'en'].forEach(l => {
                                if (cloudData[l]) {
                                    if (cloudData[l].contact_address && !cloudData[l].contact_address_val) cloudData[l].contact_address_val = cloudData[l].contact_address;
                                    if (cloudData[l].contact_phone && !cloudData[l].contact_phone_val) cloudData[l].contact_phone_val = cloudData[l].contact_phone;
                                }
                            });
                            
                            content.tr = { ...content.tr, ...cloudData.tr };
                            content.en = { ...content.en, ...cloudData.en };
                            updateForm();
                        }
                    });
                    
                    // Load Welcome Pages
                    loadWelcomeLinks();
                } else {
                    document.getElementById('login-overlay').style.display = 'flex';
                    document.getElementById('sync-status').innerHTML = '<i class="fas fa-circle" style="color: #ef4444"></i> CLOUD DISCONNECTED';
                    document.getElementById('sync-status').style.color = '#ef4444';
                }
            });
        } else {
            document.getElementById('config-alert').style.display = 'block';
        }

        function debugLog(msg) {
            let d = document.getElementById('debug-log');
            if (!d) {
                d = document.createElement('div');
                d.id = 'debug-log';
                d.style.cssText = 'position:fixed; top:0; left:0; width:100%; max-height:200px; overflow-y:auto; background:#facc15; color:#000; z-index:999999; padding:10px; font-family:monospace; font-size:12px; border-bottom:3px solid red;';
                document.body.appendChild(d);
            }
            d.innerHTML += new Date().toLocaleTimeString() + ': ' + msg + '<br>';
            console.log('DEBUG:', msg);
        }

        async function handleLogin() {
            debugLog('handleLogin tetiklendi.');
            const errorEl = document.getElementById('login-error');
            const btn = document.getElementById('login-btn');

            try {
                if (typeof firebase === 'undefined' || !auth) {
                    debugLog('HATA: Firebase veya auth tanımlı değil.');
                    throw new Error('Firebase bağlantısı kurulamadı. Lütfen reklam engelleyiciyi kapatın veya sayfayı yenileyin.');
                }
                debugLog('Firebase auth objesi mevcut.');

                const email = document.getElementById('admin-email').value;
                const pass = document.getElementById('admin-pass').value;

                if (!email || !pass) {
                    debugLog('HATA: Email veya şifre boş.');
                    throw new Error('Lütfen email ve şifre girin.');
                }

                btn.innerText = 'Giriş Yapılıyor...';
                btn.disabled = true;
                errorEl.style.display = 'none';
                
                debugLog('Firebase auth.signInWithEmailAndPassword çağrılıyor...');
                // 10 saniyelik zaman aşımı (timeout) ekliyoruz
                const timeoutPromise = new Promise((_, reject) => 
                    setTimeout(() => {
                        debugLog('ZAMAN AŞIMI: 10 saniye doldu!');
                        reject(new Error('Bağlantı zaman aşımına uğradı. İnternetinizi veya reklam engelleyicinizi kontrol edin.'));
                    }, 10000)
                );
                
                await Promise.race([
                    auth.signInWithEmailAndPassword(email, pass).then(res => {
                        debugLog('Giriş başarılı! ' + res.user.email);
                        return res;
                    }),
                    timeoutPromise
                ]);
            } catch (error) {
                debugLog('HATA YAKALANDI: ' + error.message + ' (KOD: ' + error.code + ')');
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

        // Handle Enter key for login
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && document.getElementById('login-overlay').style.display !== 'none') {
                handleLogin();
            }
        });

        function handleLogout() {
            if (confirm('Oturumu kapatmak istediğinize emin misiniz?')) {
                auth.signOut();
            }
        }

        function updateForm() {
            const langData = content[currentLang];
            document.querySelectorAll('input, textarea').forEach(el => {
                if (langData && langData[el.id] !== undefined) el.value = langData[el.id];
            });
        }

        function saveChanges() {
            if (!db) return alert('Hata: Firebase bağlantısı kurulamadı. Lütfen yapılandırmayı kontrol edin.');

            // Sync current form first
            const langData = content[currentLang];
            document.querySelectorAll('input, textarea').forEach(el => {
                if (el.id !== 'admin-pass' && el.id !== 'admin-email') langData[el.id] = el.value;
            });

            Promise.all([
                db.ref('site_content/tr').set(content.tr),
                db.ref('site_content/en').set(content.en)
            ]).then(() => {
                alert('Tüm veriler saniyeler içinde buluta gönderildi ve tüm ziyaretçiler için güncellendi!');
            }).catch(err => {
                alert('Bulut kayıt hatası: ' + err.message);
            });
        }

        function resetDefaults() {
            if (confirm('Buluttaki tüm verileri temizlemek istediğinize emin misiniz?')) {
                db.ref('site_content').remove().then(() => location.reload());
            }
        }

        // --- Welcome Links Logic ---
        function loadWelcomeLinks() {
            if (!db) return;
            const container = document.getElementById('welcome-links-container');
            
            db.ref('site_content/welcome_pages').on('value', (snapshot) => {
                const data = snapshot.val();
                container.innerHTML = '';
                
                if (!data) {
                    container.innerHTML = '<p style="color: var(--text-dim); font-size: 0.9rem;">Henüz bir link oluşturulmamış.</p>';
                    return;
                }
                
                // Reverse iterate to show newest first
                const ids = Object.keys(data).reverse();
                
                ids.forEach(id => {
                    const person = data[id];
                    const url = window.location.origin + '/hosgeldin.html?id=' + id;
                    // If running locally, you might want a relative path or handle file:// differently. 
                    // But typically this panel is on a domain.
                    const displayUrl = url.replace(window.location.origin, '');
                    
                    const div = document.createElement('div');
                    div.style.cssText = 'background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 1rem; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; border-radius: 4px;';
                    div.innerHTML = `
                        <div>
                            <strong style="display: block; margin-bottom: 0.3rem;">${person.name}</strong>
                            <a href="${url}" target="_blank" style="color: var(--primary); font-size: 0.85rem; text-decoration: underline;">${displayUrl}</a>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                            <a href="mailto:?subject=Aram%C4%B1za%20Ho%C5%9F%20Geldin!&body=Merhaba%20${encodeURIComponent(person.name)},%0D%0A%0D%0ABiz%20Teknoloji%20%C3%87%C3%B6z%C3%BCmleri%20ailesine%20kat%C4%B1ld%C4%B1%C4%9F%C4%B1n%20i%C3%A7in%20%C3%A7ok%20mutluyuz.%20Sana%20%C3%B6zel%20haz%C4%B1rlad%C4%B1%C4%9F%C4%B1m%C4%B1z%20kar%C5%9F%C4%B1lama%20sayfas%C4%B1na%20a%C5%9Fa%C4%9F%C4%B1daki%20linkten%20ula%C5%9Fabilirsin%3A%0D%0A${encodeURIComponent(url)}%0D%0A%0D%0ATekrar%20ho%C5%9F%20geldin!%0D%0ABiz%20Teknoloji%20%C3%87%C3%B6z%C3%BCmleri%20Ailesi" class="btn" style="padding: 0.5rem 1rem; font-size: 0.8rem; background: #2563eb; color: white; text-decoration: none;" title="Mail İstemcisinde Aç (Taslak)"><i class="fas fa-envelope"></i></a>
                            <button class="btn" style="padding: 0.5rem 1rem; font-size: 0.8rem; background: #0ea5e9; color: white;" onclick="copyMailText('${person.name.replace(/'/g, "\\'")}', '${url}')" title="Sadece Metni Kopyala (Natro Webmail için)"><i class="fas fa-file-alt"></i></button>
                            <button class="btn" style="padding: 0.5rem 1rem; font-size: 0.8rem; background: #334155; color: white;" onclick="copyToClipboard('${url}')" title="Sadece Linki Kopyala"><i class="fas fa-link"></i></button>
                            <button class="btn" style="padding: 0.5rem 1rem; font-size: 0.8rem; background: #ef4444; color: white;" onclick="deleteWelcomeLink('${id}')" title="Sil"><i class="fas fa-trash"></i></button>
                        </div>
                    `;
                    container.appendChild(div);
                });
            });
        }

        function generateWelcomeLink() {
            if (!db) return alert('Firebase bağlantısı yok.');
            const nameInput = document.getElementById('new_employee_name');
            const name = nameInput.value.trim();
            if (!name) return alert('Lütfen bir isim girin.');
            
            const newRef = db.ref('site_content/welcome_pages').push();
            newRef.set({
                name: name,
                created_at: new Date().toISOString()
            }).then(() => {
                nameInput.value = '';
                alert(name + ' için link başarıyla oluşturuldu!');
            }).catch(err => alert('Hata: ' + err.message));
        }

        function deleteWelcomeLink(id) {
            if (confirm('Bu linki silmek istediğinize emin misiniz? Sayfaya girenler artık isimsiz genel sayfayı görür.')) {
                db.ref('site_content/welcome_pages/' + id).remove();
            }
        }

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Link kopyalandı!');
            });
        }

        function copyMailText(name, url) {
            const text = `Merhaba ${name},\n\nBiz Teknoloji Çözümleri ailesine katıldığın için çok mutluyuz. Sana özel hazırladığımız karşılama sayfasına aşağıdaki linkten ulaşabilirsin:\n${url}\n\nTekrar hoş geldin!\nBiz Teknoloji Çözümleri Ailesi`;
            navigator.clipboard.writeText(text).then(() => {
                alert('Mail metni kopyalandı! Artık webmail\\'e yapıştırabilirsiniz.');
            });
        }


        // Navigation (Sidebar & Lang)
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                document.getElementById('section-' + item.dataset.section).classList.add('active');
            });
        });

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const langData = content[currentLang];
                document.querySelectorAll('input, textarea').forEach(el => {
                    if (el.id !== 'admin-pass') langData[el.id] = el.value;
                });
                document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentLang = btn.dataset.lang;
                updateForm();
            });
        });
