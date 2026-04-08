document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const reveals = document.querySelectorAll('.reveal');

    // Header scroll background
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

    // --- Multi-Language Support ---
    const translations = {
        tr: {
            title: "BizSolutions | Profesyonel Yazılım Outsourcing Hizmetleri",
            meta_description: "BizSolutions ile yazılım süreçlerinizi hızlandırın. Web, Mobil ve Yapay Zeka çözümlerinde uzman outsourcing ekibimizle yanınızdayız.",
            meta_keywords: "yazılım outsourcing, yazılım kiralama, web geliştirme, mobil uygulama, yapay zeka, kurumsal yazılım",
            nav_home: "Ana Sayfa",
            nav_services: "Hizmetler",
            nav_about: "Hakkımızda",
            nav_contact: "İletişim",
            btn_get_quote: "Teklif Al",
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
            about_title: 'Neden <span class="gradient-text">BizSolutions</span>?',
            about_desc: "Yazılım outsourcing sadece kod yazmak değildir; doğru iş ortağını bulmaktır. BizSolutions olarak, projelerinize sadece iş gücü değil, vizyon ve teknik derinlik katıyoruz.",
            feature_1: '<i class="fas fa-check-circle"></i> Çevik (Agile) Metodoloji',
            feature_2: '<i class="fas fa-check-circle"></i> Küresel Kalite Standartları',
            feature_3: '<i class="fas fa-check-circle"></i> Şeffaf İletişim & Süreç Takibi',
            feature_4: '<i class="fas fa-check-circle"></i> Esnek Ekip Yapılandırması',
            about_quote: '"Teknoloji ile iş dünyasını birleştiriyoruz."',
            contact_title: "Hemen Başlayalım",
            contact_subtitle: "Projenizi anlatın, size en uygun ekibi ve stratejiyi birlikte belirleyelim.",
            contact_email: "E-posta:",
            contact_phone: "Telefon:",
            contact_address: "Adres:",
            form_name: "Adınız Soyadınız",
            form_email: "E-posta Adresiniz",
            form_message: "Mesajınız",
            btn_send: "Gönder",
            form_sending: "Gönderiliyor...",
            form_success: "Mesajınız başarıyla gönderildi! Sizinle en kısa sürede iletişime geçeceğiz.",
            footer_copy: "© 2026 BizSolutions. Tüm hakları saklıdır.",
            footer_terms: "Kullanım Koşulları",
            footer_privacy: "Gizlilik Politikası",
            footer_kvkk: "KVKK Aydınlatma Metni"
        },
        en: {
            title: "BizSolutions | Professional Software Outsourcing Services",
            meta_description: "Accelerate your software processes with BizSolutions. We are by your side with our expert outsourcing team in Web, Mobile, and AI solutions.",
            meta_keywords: "software outsourcing, staff augmentation, web development, mobile app, artificial intelligence, enterprise software",
            nav_home: "Home",
            nav_services: "Services",
            nav_about: "About Us",
            nav_contact: "Contact",
            btn_get_quote: "Get Quote",
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
            about_title: 'Why <span class="gradient-text">BizSolutions</span>?',
            about_desc: "Software outsourcing is not just about writing code; it's about finding the right business partner. At BizSolutions, we add vision and technical depth to your projects, not just labor.",
            feature_1: '<i class="fas fa-check-circle"></i> Agile Methodology',
            feature_2: '<i class="fas fa-check-circle"></i> Global Quality Standards',
            feature_3: '<i class="fas fa-check-circle"></i> Transparent Communication',
            feature_4: '<i class="fas fa-check-circle"></i> Flexible Team Scaling',
            about_quote: '"We bridge technology and the business world."',
            contact_title: "Let's Get Started",
            contact_subtitle: "Tell us about your project, and let's determine the best team and strategy together.",
            contact_email: "Email:",
            contact_phone: "Phone:",
            contact_address: "Address:",
            form_name: "Your Full Name",
            form_email: "Your Email Address",
            form_message: "Your Message",
            btn_send: "Send",
            form_sending: "Sending...",
            form_success: "Your message has been sent successfully! We will contact you as soon as possible.",
            footer_copy: "© 2026 BizSolutions. All rights reserved.",
            footer_terms: "Terms of Use",
            footer_privacy: "Privacy Policy",
            footer_kvkk: "KVKK Information Text"
        }
    };

    function setLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-i18n-content]').forEach(el => {
            const key = el.getAttribute('data-i18n-content');
            if (translations[lang][key]) {
                el.setAttribute('content', translations[lang][key]);
            }
        });

        document.getElementById('current-lang').innerText = lang.toUpperCase();
        document.documentElement.lang = lang;
        localStorage.setItem('preferred_lang', lang);

        // Update active class in dropdown
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
        });
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
            const originalText = btn.innerText;
            
            btn.innerText = translations[lang].form_sending;
            btn.disabled = true;

            setTimeout(() => {
                alert(translations[lang].form_success);
                form.reset();
                btn.innerText = translations[lang].btn_send;
                btn.disabled = false;
            }, 1500);
        });
    }
});
