document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const reveals = document.querySelectorAll('.reveal');

    // Header scroll background and position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 38) { // Top bar height
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    reveals.forEach(el => revealObserver.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('.nav-links a[href^="#"], .hero-btns a[href^="#"], .footer-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- URL Routing Map ---
    const routeMap = {
        "anasayfa": { tr: "anasayfa", en: "home" },
        "home": { tr: "anasayfa", en: "home" },
        "hizmetler": { tr: "hizmetler", en: "services" },
        "services": { tr: "hizmetler", en: "services" },
        "hakkimizda": { tr: "hakkimizda", en: "about-us" },
        "about-us": { tr: "hakkimizda", en: "about-us" },
        "iletisim": { tr: "iletisim", en: "contact" },
        "contact": { tr: "iletisim", en: "contact" },
        "kullanim-kosullari": { tr: "kullanim-kosullari", en: "terms-of-use" },
        "terms-of-use": { tr: "kullanim-kosullari", en: "terms-of-use" },
        "gizlilik-politikasi": { tr: "gizlilik-politikasi", en: "privacy-policy" },
        "privacy-policy": { tr: "gizlilik-politikasi", en: "privacy-policy" },
        "kvkk": { tr: "kvkk", en: "gdpr" },
        "gdpr": { tr: "kvkk", en: "gdpr" }
    };

    // --- Multi-Language Support & Cloud Dynamic Content ---
    const defaultTranslations = {
        tr: {
            title: "BIZ IT Works | Profesyonel Yazılım Outsourcing Hizmetleri",
            meta_description: "BIZ IT Works ile yazılım süreçlerinizi hızlandırın. Web, Mobil ve Yapay Zeka çözümlerinde uzman outsourcing ekibimizle yanınızdayız.",
            meta_keywords: "yazılım outsourcing, yazılım kiralama, web geliştirme, mobil uygulama, yapay zeka, kurumsal yazılım",
            nav_home: "Ana Sayfa",
            nav_services: "Hizmetler",
            nav_about: "Hakkımızda",
            nav_contact: "İletişim",
            btn_get_quote: "Teklif Al",
            hero_ghost: "OUTSOURCING",
            hero_title: 'Geleceğin Teknolojilerini <br><span class="gradient-text">Birlikte İnşa Edelim</span>',
            hero_subtitle: "Kurumsal ihtiyaçlarınıza özel, ölçeklenebilir ve yüksek performanslı yazılım ekipleriyle işinizi dijital dünyada bir adım öne taşıyın.",
            btn_view_services: "Hizmetlerimizi İnceleyin",
            btn_know_us: "Bizi Tanıyın",
            stat_experts: "Uzman Geliştirici",
            stat_projects: "Tamamlanan Proje",
            stat_experience: "Yıllık Tecrübe",
            stat_satisfaction: "Müşteri Memnuniyeti",
            services_title: "Uzmanlık Alanlarımız",
            services_subtitle: "En son teknolojileri kullanarak iş süreçlerinizi optimize eden çözümler sunuyoruz.",
            service_1_title: "Web & Mobil Geliştirme",
            service_1_desc: "Modern, responsive ve kullanıcı odaklı web ve mobil uygulamalar geliştiriyoruz.",
            service_2_title: "Yapay Zeka & AI",
            service_2_desc: "Veri analitiği ve yapay zeka çözümleri ile iş kararlarınızı veriye dayalı hale getirin.",
            service_3_title: "Bulut & DevOps",
            service_3_desc: "Güvenli, ölçeklenebilir bulut altyapıları ve sürekli entegrasyon süreçleri kuruyoruz.",
            about_title: 'Neden <span class="gradient-text">BIZ IT Works</span>?',
            about_desc: "Yazılım outsourcing sadece kod yazmak değildir; doğru iş ortağını bulmaktır. BIZ IT Works olarak, projelerinize sadece iş gücü değil, vizyon ve teknik derinlik katıyoruz.",
            feature_1: '<i class="fas fa-check-circle"></i> Çevik (Agile) Metodoloji',
            feature_2: '<i class="fas fa-check-circle"></i> Küresel Kalite Standartları',
            feature_3: '<i class="fas fa-check-circle"></i> Şeffaf İletişim & Süreç Takibi',
            feature_4: '<i class="fas fa-check-circle"></i> Esnek Ekip Yapılandırması',
            about_quote: '"Teknoloji ile iş dünyasını birleştiriyoruz."',
            contact_title: "Hemen Başlayalım",
            contact_subtitle: "Projenizi anlatın, size en uygun ekibi ve stratejiyi birlikte belirleyelim.",
            label_contact_email: "E-posta:",
            contact_email_val: "hello@bizitworks.com",
            label_contact_phone: "Telefon:",
            contact_phone_val: "+90 212 000 00 00",
            label_contact_address: "Adres:",
            contact_address_val: "Levent Plaza, No: 42, Kat: 8, Beşiktaş, İstanbul",
            form_name: "Adınız Soyadınız",
            form_email: "E-posta Adresiniz",
            form_message: "Mesajınız",
            btn_send: "Gönder",
            form_sending: "Gönderiliyor...",
            form_success: "Mesajınız başarıyla gönderildi! Sizinle en kısa sürede iletişime geçeceğiz.",
            footer_copy: "© 2026 BIZ IT Works. Tüm hakları saklıdır.",
            footer_terms: "Kullanım Koşulları",
            footer_privacy: "Gizlilik Politikası",
            footer_kvkk: "KVKK Aydınlatma Metni",
            // Subpages TR
            nav_kvkk: "KVKK",
            nav_privacy: "Gizlilik Politikası",
            nav_terms: "Kullanım Koşulları",
            sub_about_title: "Hakkımızda",
            sub_about_subtitle: "Teknoloji ortağınız olarak hikayemiz, vizyonumuz ve değerlerimiz.",
            sub_about_hero_p: "BIZ IT Works olarak, işletmelerin teknolojik dönüşümlerini hızlandırmak için yenilikçi, sürdürülebilir ve yüksek performanslı yazılım outsourcing çözümleri sunuyoruz.",
            sub_about_vision_title: "Vizyonumuz",
            sub_about_vision_p: "Yazılım outsourcing alanında küresel düzeyde güvenilir, inovatif ve değer yaratan bir lider olmak.",
            sub_about_mission_title: "Misyonumuz",
            sub_about_mission_p: "Müşterilerimizin iş süreçlerini optimize etmek, rekabet güçlerini artırmak ve en yüksek standartlarda teknik uzmanlığı çevik bir şekilde sunmak.",
            sub_services_title: "Hizmetlerimiz",
            sub_services_subtitle: "Endüstri standartlarında modern ve ölçeklenebilir yazılım çözümleri.",
            sub_services_hero_p: "İş hedeflerinize ulaşmanız için özel olarak tasarlanmış geniş teknik yelpazemiz ve esnek outsourcing modellerimiz.",
            sub_services_item1_title: "Dış Kaynak ve Operasyon Yönetimi",
            sub_services_item1_p: "İşletmelerin değişen ihtiyaçlarına hızlı yanıt verebilmesi için uzman kaynakları, süreçleri ve operasyonları etkin şekilde yönetiyoruz. Yazılım geliştirme, teknik destek, operasyon yönetimi, proje ekipleri ve iş süreçleri alanlarında esnek dış kaynak çözümleri sunuyoruz.\nDoğru yeteneklerin doğru projelerde konumlandırılmasıyla maliyetleri optimize ederken operasyonel verimliliği artırıyor, kurumların büyüme hedeflerine odaklanmasını sağlıyoruz.",
            sub_services_item2_title: "Anahtar Teslim Teknoloji Projeleri",
            sub_services_item2_p: "İhtiyaç analizinden canlı kullanıma kadar tüm proje yaşam döngüsünü uçtan uca yönetiyoruz. Analiz, tasarım, geliştirme, test, entegrasyon ve destek süreçlerini tek bir çatı altında sunarak projelerin zamanında ve bütçe dahilinde tamamlanmasını sağlıyoruz.\nHer projede ölçülebilir iş sonuçları üretmeye ve sürdürülebilir çözümler geliştirmeye odaklanıyoruz.",
            sub_services_item3_title: "Yönetilen BT Hizmetleri (MSP)",
            sub_services_item3_p: "Bilgi teknolojileri altyapılarınızı proaktif olarak yönetiyor, izliyor ve sürekli geliştiriyoruz. Sunucu yönetimi, kullanıcı desteği, güvenlik izleme, sistem bakımı ve bulut operasyonları gibi kritik hizmetleri uzman ekiplerimizle yürütüyoruz.\nYönetilen hizmet yaklaşımımız sayesinde işletmeler BT operasyonlarını güvenle dış kaynak olarak yönetebilirken kendi ekiplerini stratejik iş hedeflerine yönlendirebilir.",
            sub_services_item4_title: "Dijital Dönüşüm Çözümleri",
            sub_services_item4_p: "Dijital dönüşüm yolculuğunuzda iş süreçlerinizi modern teknolojilerle yeniden tasarlıyoruz. Verimliliği artıran, maliyetleri azaltan ve kullanıcı deneyimini iyileştiren dijital platformlar geliştiriyoruz.\nKurumsal uygulamalar, web ve mobil çözümler, otomasyon sistemleri ve veri odaklı teknolojilerle işletmelerin geleceğe hazırlanmasına destek oluyoruz.",
            sub_services_item5_title: "Finansal Teknoloji Çözümleri",
            sub_services_item5_p: "Finans sektörünün ihtiyaçlarına yönelik güvenli, ölçeklenebilir ve regülasyonlara uyumlu teknolojik çözümler geliştiriyoruz. Dijital ödeme sistemleri, finansal entegrasyonlar, müşteri doğrulama süreçleri ve finansal operasyon platformları alanlarında uzmanlık sunuyoruz.\nKuruluşların finansal süreçlerini hızlandırırken güvenlik ve mevzuat uyumluluğunu ön planda tutuyoruz.",
            sub_services_item6_title: "Yapay Zekâ Çözümleri",
            sub_services_item6_p: "Veriyi anlamlı içgörülere dönüştüren yapay zekâ çözümleri geliştiriyoruz. İş süreçlerinin otomasyonu, tahmine dayalı analizler, karar destek sistemleri ve akıllı uygulamalarla kurumların operasyonel verimliliğini artırıyoruz.\nYapay zekâyı yalnızca teknoloji değil, iş sonuçları üreten stratejik bir dönüşüm aracı olarak ele alıyoruz.",
            sub_services_item7_title: "Agentic AI ve Üretken Yapay Zekâ Çözümleri",
            sub_services_item7_p: "Yeni nesil yapay zekâ teknolojileriyle çalışan dijital iş gücü oluşturuyoruz. Otonom görev yönetimi gerçekleştiren AI Agent'lar, kurumsal bilgi yönetimi sistemleri, akıllı asistanlar ve üretken yapay zekâ çözümleri geliştiriyoruz.\nKurumların bilgiye erişimini hızlandıran, süreçleri otomatikleştiren ve çalışan verimliliğini artıran yenilikçi çözümler sunuyoruz.",
            sub_services_item8_title: "Siber Güvenlik ve Risk Yönetimi",
            sub_services_item8_p: "Dijital varlıklarınızı gelişmiş siber tehditlere karşı korumak için kapsamlı güvenlik hizmetleri sunuyoruz. Risk analizleri, güvenlik değerlendirmeleri, güvenlik operasyonları, uyumluluk çalışmaları ve olay müdahale süreçlerini yönetiyoruz.\nSiber güvenliği yalnızca bir teknoloji yatırımı değil, kurumsal sürdürülebilirliğin temel unsurlarından biri olarak görüyoruz.",
            sub_services_item9_title: "Bulut ve Altyapı Hizmetleri",
            sub_services_item9_p: "Bulut teknolojileri sayesinde işletmelerin daha esnek, güvenli ve ölçeklenebilir altyapılara sahip olmasını sağlıyoruz. Bulut geçiş projeleri, mimari tasarım, operasyon yönetimi ve güvenlik çözümleriyle kurumların dijital altyapılarını modernize ediyoruz.\nMicrosoft Azure, AWS ve Google Cloud platformlarında uzman çözümler sunuyoruz.",
            sub_services_item10_title: "Sosyal Medya ve Dijital İletişim Yönetimi",
            sub_services_item10_p: "Markaların dijital dünyadaki görünürlüğünü artırmak için stratejik sosyal medya yönetimi hizmetleri sunuyoruz. İçerik planlama, içerik üretimi, topluluk yönetimi, reklam kampanyaları ve performans analizleriyle markaların hedef kitleleriyle daha güçlü bağlar kurmasını sağlıyoruz.\nVeri odaklı yaklaşımımız sayesinde dijital yatırımların ölçülebilir sonuçlar üretmesine katkı sağlıyoruz.",
            sub_services_item11_title: "İş Süreçleri ve İş Akışı Yönetimi",
            sub_services_item11_p: "Kurumların operasyonel süreçlerini dijitalleştirerek daha hızlı, izlenebilir ve verimli hale getiriyoruz. Talep, onay, satın alma, insan kaynakları, bilgi teknolojileri ve operasyon süreçlerini merkezi platformlar üzerinden yönetilebilir hale getiriyoruz.\nİş akışlarının otomatikleştirilmesi sayesinde hata oranlarını azaltırken süreç performansını artırıyoruz.",
            sub_services_item12_title: "Proje ve Program Yönetimi",
            sub_services_item12_p: "Karmaşık projelerin planlama, yürütme ve kontrol süreçlerini uluslararası standartlar doğrultusunda yönetiyoruz. Proje yönetim ofisi (PMO) kurulumu, kaynak planlama, risk yönetimi ve performans takibi konularında uzman destek sağlıyoruz.\nProjelerin stratejik hedeflerle uyumlu ilerlemesini sağlayarak yatırım değerini artırıyoruz.",
            sub_services_item13_title: "Proje Portföy Yönetimi (PPM)",
            sub_services_item13_p: "Kuruluşların tüm proje ve yatırım portföylerini merkezi olarak yönetmesine yardımcı oluyoruz. Önceliklendirme, kapasite planlama, bütçe kontrolü ve performans takibi süreçlerini tek bir yapı altında birleştiriyoruz.\nPPM yaklaşımı sayesinde yöneticiler daha doğru kararlar alabilir ve kaynaklarını en yüksek değeri yaratacak projelere yönlendirebilir.",
            sub_services_item14_title: "CRM ve Müşteri Deneyimi Çözümleri",
            sub_services_item14_p: "Müşteri ilişkilerini güçlendiren ve satış süreçlerini optimize eden CRM çözümleri sunuyoruz. Satış, pazarlama ve müşteri hizmetleri ekiplerini ortak bir platform üzerinde buluşturarak müşteri deneyimini iyileştiriyoruz.\nKurumsal CRM dönüşüm projelerinde analizden uygulamaya kadar uçtan uca destek sağlıyoruz.",
            sub_services_item15_title: "Telekomünikasyon ve OSS/BSS Çözümleri",
            sub_services_item15_p: "Telekomünikasyon sektörüne özel operasyon ve iş destek sistemleri geliştiriyoruz. Müşteri yönetimi, servis aktivasyonu, faturalandırma, ağ operasyonları ve performans yönetimi alanlarında ölçeklenebilir çözümler sunuyoruz.\nOperatörler, servis sağlayıcılar ve teknoloji şirketleri için yüksek hacimli ve kritik operasyonları destekleyen modern platformlar tasarlıyoruz.",
            sub_services_item16_title: "BizITWorks Yaklaşımı",
            sub_services_item16_p: "BizITWorks olarak teknoloji, operasyon ve iş süreçlerini tek çatı altında birleştiriyor; kurumların dijital dönüşüm yolculuğunda güvenilir iş ortağı olarak konumlanıyoruz. Uzman ekiplerimiz ve sektör deneyimimizle işletmelerin verimliliklerini artırmalarına, maliyetlerini optimize etmelerine ve sürdürülebilir büyüme sağlamalarına destek oluyoruz.",
            sub_contact_title: "İletişim",
            sub_contact_subtitle: "Bizimle iletişime geçin, fikirlerinizi hayata geçirelim.",
            sub_contact_hero_p: "Sorularınız, iş ortaklığı talepleriniz ve teklif almak için bizimle dilediğiniz kanal üzerinden irtibat kurabilirsiniz.",
            sub_contact_form_title: "Bize Mesaj Gönderin",
            sub_contact_info_title: "İletişim Bilgileri",
            sub_kvkk_title: "KVKK Aydınlatma Metni",
            sub_kvkk_subtitle: "Kişisel verilerinizin korunması ve işlenmesi hakkında bilgilendirme.",
            sub_privacy_title: "Gizlilik Politikası",
            sub_privacy_subtitle: "Web sitemizi kullanırken toplanan verileriniz ve gizlilik haklarınız.",
            sub_terms_title: "Kullanım Koşulları",
            sub_terms_subtitle: "bizitworks.com web sitesi kullanım şartları ve yasal sorumluluklar."
        },
        en: {
            // ENGLISH TRANSLATIONS (Identical structure to TR)
            title: "BIZ IT Works | Professional Software Outsourcing Services",
            meta_description: "Accelerate your software processes with BIZ IT Works. We are by your side with our expert outsourcing team in Web, Mobile, and AI solutions.",
            meta_keywords: "software outsourcing, staff augmentation, web development, mobile app, artificial intelligence, enterprise software",
            nav_home: "Home",
            nav_services: "Services",
            nav_about: "About Us",
            nav_contact: "Contact",
            btn_get_quote: "Get Quote",
            hero_ghost: "TECHNOLOGY",
            hero_title: 'Let\'s Build the <br><span class="gradient-text">Future Together</span>',
            hero_subtitle: "Take your business a step forward in the digital world with scalable and high-performance software teams tailored to your corporate needs.",
            btn_view_services: "Explore Services",
            btn_know_us: "Get to Know Us",
            stat_experts: "Expert Developers",
            stat_projects: "Completed Projects",
            stat_experience: "Years of Experience",
            stat_satisfaction: "Client Satisfaction",
            services_title: "Our Areas of Expertise",
            services_subtitle: "We offer solutions that optimize your business processes using the latest technologies.",
            service_1_title: "Web & Mobile Development",
            service_1_desc: "We develop modern, responsive, and user-oriented web and mobile applications.",
            service_2_title: "Artificial Intelligence & AI",
            service_2_desc: "Make your business decisions data-driven with data analytics and AI solutions.",
            service_3_title: "Cloud & DevOps",
            service_3_desc: "We build secure, scalable cloud infrastructures and continuous integration processes.",
            about_title: 'Why <span class="gradient-text">BIZ IT Works</span>?',
            about_desc: "Software outsourcing is not just about writing code; it's about finding the right business partner. At BIZ IT Works, we add vision and technical depth to your projects, not just labor.",
            about_quote: '"We bridge technology and the business world."',
            contact_title: "Let's Get Started",
            contact_subtitle: "Tell us about your project, let's define the best team and strategy together.",
            label_contact_email: "Email:",
            contact_email_val: "hello@bizitworks.com",
            label_contact_phone: "Phone:",
            contact_phone_val: "+90 212 000 00 00",
            label_contact_address: "Address:",
            contact_address_val: "Levent Plaza, No: 42, Kat: 8, Beşiktaş, Istanbul",
            form_name: "Your Name & Surname",
            form_email: "Your Email Address",
            form_message: "Your Message",
            btn_send: "Send",
            form_sending: "Sending...",
            form_success: "Your message has been sent successfully! We will get in touch with you shortly.",
            footer_copy: "© 2026 BIZ IT Works. All rights reserved.",
            footer_terms: "Terms of Use",
            footer_privacy: "Privacy Policy",
            footer_kvkk: "GDPR Information",
            // Subpages EN
            nav_kvkk: "GDPR",
            nav_privacy: "Privacy Policy",
            nav_terms: "Terms of Use",
            sub_about_title: "About Us",
            sub_about_subtitle: "Our story, vision, and core values as your technology partner.",
            sub_about_hero_p: "At BIZ IT Works, we provide innovative, sustainable, and high-performance software outsourcing solutions to accelerate the technological transformation of businesses.",
            sub_about_vision_title: "Our Vision",
            sub_about_vision_p: "To be a globally trusted, innovative, and value-creating leader in the software outsourcing industry.",
            sub_about_mission_title: "Our Mission",
            sub_about_mission_p: "To optimize our clients' business processes, increase their competitiveness, and deliver technical expertise at the highest standards with agility.",
            sub_services_title: "Our Services",
            sub_services_subtitle: "Modern and scalable software solutions aligned with industry standards.",
            sub_services_hero_p: "Our wide technical stack and flexible outsourcing models specifically tailored to achieve your business goals.",
            sub_services_item1_title: "Dış Kaynak ve Operasyon Yönetimi",
            sub_services_item1_p: "İşletmelerin değişen ihtiyaçlarına hızlı yanıt verebilmesi için uzman kaynakları, süreçleri ve operasyonları etkin şekilde yönetiyoruz. Yazılım geliştirme, teknik destek, operasyon yönetimi, proje ekipleri ve iş süreçleri alanlarında esnek dış kaynak çözümleri sunuyoruz.\nDoğru yeteneklerin doğru projelerde konumlandırılmasıyla maliyetleri optimize ederken operasyonel verimliliği artırıyor, kurumların büyüme hedeflerine odaklanmasını sağlıyoruz.",
            sub_services_item2_title: "Anahtar Teslim Teknoloji Projeleri",
            sub_services_item2_p: "İhtiyaç analizinden canlı kullanıma kadar tüm proje yaşam döngüsünü uçtan uca yönetiyoruz. Analiz, tasarım, geliştirme, test, entegrasyon ve destek süreçlerini tek bir çatı altında sunarak projelerin zamanında ve bütçe dahilinde tamamlanmasını sağlıyoruz.\nHer projede ölçülebilir iş sonuçları üretmeye ve sürdürülebilir çözümler geliştirmeye odaklanıyoruz.",
            sub_services_item3_title: "Yönetilen BT Hizmetleri (MSP)",
            sub_services_item3_p: "Bilgi teknolojileri altyapılarınızı proaktif olarak yönetiyor, izliyor ve sürekli geliştiriyoruz. Sunucu yönetimi, kullanıcı desteği, güvenlik izleme, sistem bakımı ve bulut operasyonları gibi kritik hizmetleri uzman ekiplerimizle yürütüyoruz.\nYönetilen hizmet yaklaşımımız sayesinde işletmeler BT operasyonlarını güvenle dış kaynak olarak yönetebilirken kendi ekiplerini stratejik iş hedeflerine yönlendirebilir.",
            sub_services_item4_title: "Dijital Dönüşüm Çözümleri",
            sub_services_item4_p: "Dijital dönüşüm yolculuğunuzda iş süreçlerinizi modern teknolojilerle yeniden tasarlıyoruz. Verimliliği artıran, maliyetleri azaltan ve kullanıcı deneyimini iyileştiren dijital platformlar geliştiriyoruz.\nKurumsal uygulamalar, web ve mobil çözümler, otomasyon sistemleri ve veri odaklı teknolojilerle işletmelerin geleceğe hazırlanmasına destek oluyoruz.",
            sub_services_item5_title: "Finansal Teknoloji Çözümleri",
            sub_services_item5_p: "Finans sektörünün ihtiyaçlarına yönelik güvenli, ölçeklenebilir ve regülasyonlara uyumlu teknolojik çözümler geliştiriyoruz. Dijital ödeme sistemleri, finansal entegrasyonlar, müşteri doğrulama süreçleri ve finansal operasyon platformları alanlarında uzmanlık sunuyoruz.\nKuruluşların finansal süreçlerini hızlandırırken güvenlik ve mevzuat uyumluluğunu ön planda tutuyoruz.",
            sub_services_item6_title: "Yapay Zekâ Çözümleri",
            sub_services_item6_p: "Veriyi anlamlı içgörülere dönüştüren yapay zekâ çözümleri geliştiriyoruz. İş süreçlerinin otomasyonu, tahmine dayalı analizler, karar destek sistemleri ve akıllı uygulamalarla kurumların operasyonel verimliliğini artırıyoruz.\nYapay zekâyı yalnızca teknoloji değil, iş sonuçları üreten stratejik bir dönüşüm aracı olarak ele alıyoruz.",
            sub_services_item7_title: "Agentic AI ve Üretken Yapay Zekâ Çözümleri",
            sub_services_item7_p: "Yeni nesil yapay zekâ teknolojileriyle çalışan dijital iş gücü oluşturuyoruz. Otonom görev yönetimi gerçekleştiren AI Agent'lar, kurumsal bilgi yönetimi sistemleri, akıllı asistanlar ve üretken yapay zekâ çözümleri geliştiriyoruz.\nKurumların bilgiye erişimini hızlandıran, süreçleri otomatikleştiren ve çalışan verimliliğini artıran yenilikçi çözümler sunuyoruz.",
            sub_services_item8_title: "Siber Güvenlik ve Risk Yönetimi",
            sub_services_item8_p: "Dijital varlıklarınızı gelişmiş siber tehditlere karşı korumak için kapsamlı güvenlik hizmetleri sunuyoruz. Risk analizleri, güvenlik değerlendirmeleri, güvenlik operasyonları, uyumluluk çalışmaları ve olay müdahale süreçlerini yönetiyoruz.\nSiber güvenliği yalnızca bir teknoloji yatırımı değil, kurumsal sürdürülebilirliğin temel unsurlarından biri olarak görüyoruz.",
            sub_services_item9_title: "Bulut ve Altyapı Hizmetleri",
            sub_services_item9_p: "Bulut teknolojileri sayesinde işletmelerin daha esnek, güvenli ve ölçeklenebilir altyapılara sahip olmasını sağlıyoruz. Bulut geçiş projeleri, mimari tasarım, operasyon yönetimi ve güvenlik çözümleriyle kurumların dijital altyapılarını modernize ediyoruz.\nMicrosoft Azure, AWS ve Google Cloud platformlarında uzman çözümler sunuyoruz.",
            sub_services_item10_title: "Sosyal Medya ve Dijital İletişim Yönetimi",
            sub_services_item10_p: "Markaların dijital dünyadaki görünürlüğünü artırmak için stratejik sosyal medya yönetimi hizmetleri sunuyoruz. İçerik planlama, içerik üretimi, topluluk yönetimi, reklam kampanyaları ve performans analizleriyle markaların hedef kitleleriyle daha güçlü bağlar kurmasını sağlıyoruz.\nVeri odaklı yaklaşımımız sayesinde dijital yatırımların ölçülebilir sonuçlar üretmesine katkı sağlıyoruz.",
            sub_services_item11_title: "İş Süreçleri ve İş Akışı Yönetimi",
            sub_services_item11_p: "Kurumların operasyonel süreçlerini dijitalleştirerek daha hızlı, izlenebilir ve verimli hale getiriyoruz. Talep, onay, satın alma, insan kaynakları, bilgi teknolojileri ve operasyon süreçlerini merkezi platformlar üzerinden yönetilebilir hale getiriyoruz.\nİş akışlarının otomatikleştirilmesi sayesinde hata oranlarını azaltırken süreç performansını artırıyoruz.",
            sub_services_item12_title: "Proje ve Program Yönetimi",
            sub_services_item12_p: "Karmaşık projelerin planlama, yürütme ve kontrol süreçlerini uluslararası standartlar doğrultusunda yönetiyoruz. Proje yönetim ofisi (PMO) kurulumu, kaynak planlama, risk yönetimi ve performans takibi konularında uzman destek sağlıyoruz.\nProjelerin stratejik hedeflerle uyumlu ilerlemesini sağlayarak yatırım değerini artırıyoruz.",
            sub_services_item13_title: "Proje Portföy Yönetimi (PPM)",
            sub_services_item13_p: "Kuruluşların tüm proje ve yatırım portföylerini merkezi olarak yönetmesine yardımcı oluyoruz. Önceliklendirme, kapasite planlama, bütçe kontrolü ve performans takibi süreçlerini tek bir yapı altında birleştiriyoruz.\nPPM yaklaşımı sayesinde yöneticiler daha doğru kararlar alabilir ve kaynaklarını en yüksek değeri yaratacak projelere yönlendirebilir.",
            sub_services_item14_title: "CRM ve Müşteri Deneyimi Çözümleri",
            sub_services_item14_p: "Müşteri ilişkilerini güçlendiren ve satış süreçlerini optimize eden CRM çözümleri sunuyoruz. Satış, pazarlama ve müşteri hizmetleri ekiplerini ortak bir platform üzerinde buluşturarak müşteri deneyimini iyileştiriyoruz.\nKurumsal CRM dönüşüm projelerinde analizden uygulamaya kadar uçtan uca destek sağlıyoruz.",
            sub_services_item15_title: "Telekomünikasyon ve OSS/BSS Çözümleri",
            sub_services_item15_p: "Telekomünikasyon sektörüne özel operasyon ve iş destek sistemleri geliştiriyoruz. Müşteri yönetimi, servis aktivasyonu, faturalandırma, ağ operasyonları ve performans yönetimi alanlarında ölçeklenebilir çözümler sunuyoruz.\nOperatörler, servis sağlayıcılar ve teknoloji şirketleri için yüksek hacimli ve kritik operasyonları destekleyen modern platformlar tasarlıyoruz.",
            sub_services_item16_title: "BizITWorks Yaklaşımı",
            sub_services_item16_p: "BizITWorks olarak teknoloji, operasyon ve iş süreçlerini tek çatı altında birleştiriyor; kurumların dijital dönüşüm yolculuğunda güvenilir iş ortağı olarak konumlanıyoruz. Uzman ekiplerimiz ve sektör deneyimimizle işletmelerin verimliliklerini artırmalarına, maliyetlerini optimize etmelerine ve sürdürülebilir büyüme sağlamalarına destek oluyoruz.",
            sub_contact_title: "Contact",
            sub_contact_subtitle: "Get in touch with us, let's bring your ideas to life.",
            sub_contact_hero_p: "You can reach us through any channel for questions, business partnership requests, and project quotes.",
            sub_contact_form_title: "Send Us a Message",
            sub_contact_info_title: "Contact Information",
            sub_kvkk_title: "GDPR Information",
            sub_kvkk_subtitle: "Information about processing and protection of your personal data.",
            sub_privacy_title: "Privacy Policy",
            sub_privacy_subtitle: "Your data collected while using our website and your privacy rights.",
            sub_terms_title: "Terms of Use",
            sub_terms_subtitle: "Terms and conditions of using bizitworks.com and legal responsibilities."
        }
    };

    let translations = defaultTranslations;

    // --- Firebase Logic ---
    if (typeof firebase !== 'undefined' && typeof isFirebaseConfigured === 'function' && isFirebaseConfigured()) {
        firebase.initializeApp(firebaseConfig);
        const db = firebase.database();
        const contentRef = db.ref('site_content');

        // Listen for Real-time Updates
        contentRef.on('value', (snapshot) => {
            const cloudData = snapshot.val();
            if (cloudData) {
                translations = {
                    tr: { ...defaultTranslations.tr, ...cloudData.tr },
                    en: { ...defaultTranslations.en, ...cloudData.en }
                };
                const currentLang = localStorage.getItem('preferred_lang') || 'tr';
                setLanguage(currentLang);
                localStorage.setItem('bizsolutions_content_cache', JSON.stringify(translations));
            }
        });
    } else {
        // Fallback to Local Cache if Firebase is not configured
        const cached = localStorage.getItem('bizsolutions_content_cache');
        if (cached) {
            translations = JSON.parse(cached);
        }
    }

    function setLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                let content = translations[lang][key];
                if (typeof content === 'string') {
                    content = content.replace(/\n/g, '<br>');
                }
                el.innerHTML = content;
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        const langDisplay = document.getElementById('current-lang');
        if (langDisplay) langDisplay.innerText = lang.toUpperCase();
        
        document.documentElement.lang = lang;
        localStorage.setItem('preferred_lang', lang);

        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
        });

        // --- Update Navigation Links ---
        document.querySelectorAll('a').forEach(a => {
            const href = a.getAttribute('href');
            if (href && routeMap[href]) {
                a.setAttribute('href', routeMap[href][lang]);
            }
        });

        // --- Update Interactive Link Hrefs ---
        const emailLink = document.getElementById('contact-email-link');
        const phoneLink = document.getElementById('contact-phone-link');
        const addressLink = document.getElementById('contact-address-link');

        if (emailLink && translations[lang].contact_email_val) {
            emailLink.href = `mailto:${translations[lang].contact_email_val}`;
        }
        if (phoneLink && translations[lang].contact_phone_val) {
            phoneLink.href = `tel:${translations[lang].contact_phone_val.replace(/\s/g, '')}`;
        }
        if (addressLink && translations[lang].contact_address_val) {
            addressLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(translations[lang].contact_address_val)}`;
        }
    }

    // Init language
    const savedLang = localStorage.getItem('preferred_lang') || 'tr';
    setLanguage(savedLang);

    // Language switcher event listeners
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const lang = opt.getAttribute('data-lang');
            setLanguage(lang);
            
            let currentPath = window.location.pathname.replace(/^\//, '').replace(/\.html$/, '');
            if (currentPath === '' || currentPath === 'index') currentPath = 'anasayfa';
            
            if (routeMap[currentPath] && routeMap[currentPath][lang] !== currentPath) {
                window.location.href = '/' + routeMap[currentPath][lang];
            }
        });
    });

    // Form submission
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const lang = localStorage.getItem('preferred_lang') || 'tr';
            const btn = form.querySelector('button');
            btn.innerText = translations[lang].form_sending;
            btn.disabled = true;

            setTimeout(() => {
                alert(translations[lang].form_success);
                form.reset();
                btn.innerText = translations[lang].btn_send;
                btn.disabled = false;
            }, 1000);
        });
    }
});
