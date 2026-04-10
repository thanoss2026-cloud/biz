# Firebase Kurulum ve Güvenlik Rehberi

Sitenizi tüm dünyada canlı olarak güncelleyebilmek ve güvenliğini sağlamak için aşağıdaki adımları takip edin.

### 1. Proje ve Veritabanı Oluşturma
1. [Firebase Console](https://console.firebase.google.com/) adresine gidin.
2. **"Project Add"** ile projenizi oluşturun.
3. **"Build" -> "Realtime Database"** yolunu izleyerek bir veritabanı oluşturun (Konum: `europe-west1` önerilir).

### 2. Kimlik Doğrulamayı (Auth) Aktif Etme
İçeriği sadece sizin değiştirebilmeniz için giriş sistemini aktif etmeliyiz:
1. Sol menüden **"Build" -> "Authentication"** bölümüne gidin.
2. **"Get Started"** butonuna tıklayın.
3. **"Sign-in method"** sekmesinden **"Email/Password"** seçeneğini seçin ve "Enabled" (Etkin) hale getirip kaydedin.
4. **"Users"** sekmesine geçin ve **"Add user"** diyerek kendiniz için bir email ve şifre belirleyin. Bu bilgilerle Admin Paneline giriş yapacaksınız.

### 3. Veritabanı Güvenlik Kuralları
Veritabanınızın çalınmasını veya başkaları tarafından değiştirilmesini engellemek için:
1. **"Realtime Database"** bölümüne gidin.
2. **"Rules"** sekmesine tıklayın.
3. Aşağıdaki kodu mevcut kodun yerine yapıştırın ve **"Publish"** deyin:

```json
{
  "rules": {
    "site_content": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

### 4. API Anahtarlarını Uygulamaya Ekleme
1. Project Settings (dişli ikon) -> Web Uygulaması simgesine tıklayın.
2. `firebaseConfig` kodunu kopyalayın.
3. Projedeki `firebase-config.js` dosyasına bu değerleri yapıştırın.

---
**Güvenlik Notu:** Bu ayarlar yapıldıktan sonra sitenizdeki yazıları sadece oluşturduğunuz kullanıcı ile giriş yaparak değiştirebilirsiniz. Ziyaretçiler sadece okuma yapabilir.
