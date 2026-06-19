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
            sub_services_web_title: "Web ve Mobil Geliştirme",
            sub_services_web_p: "Kullanıcı deneyimini ön planda tutan, modern web uygulamaları ve native/cross-platform mobil uygulamalar geliştiriyoruz. React, React Native, Flutter, Swift ve Kotlin gibi güncel teknolojilerle yanınızdayız.",
            sub_services_ai_title: "Yapay Zeka & AI Çözümleri",
            sub_services_ai_p: "Doğal Dil İşleme (NLP), Görüntü İşleme, Tahminleme Modelleri ve Büyük Dil Modelleri (LLM) entegrasyonu ile iş süreçlerinizi akıllandırıyoruz. Verilerinizi değer üreten sistemlere dönüştürüyoruz.",
            sub_services_cloud_title: "Bulut ve DevOps Hizmetleri",
            sub_services_cloud_p: "AWS, Google Cloud ve Azure üzerinde ölçeklenebilir, yüksek erişilebilirlikli altyapılar tasarlıyor, sürekli entegrasyon ve dağıtım (CI/CD) hatları ile yazılım döngünüzü optimize ediyoruz.",
            sub_services_consulting_title: "Teknoloji Danışmanlığı & Kadro Büyütme",
            sub_services_consulting_p: "İhtiyaç duyduğunuz teknik rolleri (Developer, QA, PM, DevOps) esnek modellerimizle ekibinize dahil ediyor, mimari tasarım ve kod kalitesi süreçlerinde danışmanlık veriyoruz.",
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
            sub_services_web_title: "Web & Mobile Development",
            sub_services_web_p: "We build modern, user-first web applications and native/cross-platform mobile apps. We support your growth using modern tech like React, React Native, Flutter, Swift, and Kotlin.",
            sub_services_ai_title: "Artificial Intelligence & AI Solutions",
            sub_services_ai_p: "We make your business processes smarter using Natural Language Processing (NLP), Computer Vision, Predictive Models, and Large Language Model (LLM) integrations.",
            sub_services_cloud_title: "Cloud & DevOps Services",
            sub_services_cloud_p: "We design scalable, highly available architectures on AWS, Google Cloud, and Azure, optimizing your development cycles with continuous integration/delivery (CI/CD) pipelines.",
            sub_services_consulting_title: "Tech Consulting & Staff Augmentation",
            sub_services_consulting_p: "We augment your team with the technical roles you need (Developer, QA, PM, DevOps) using flexible hiring models, and consult on system architecture and code quality.",
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
