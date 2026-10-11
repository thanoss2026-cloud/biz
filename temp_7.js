
        // Data Structures for dynamic lists
        let cvSkills = [];
        let cvExp = [];
        let cvEdu = [];
        let cvLang = [];

        function renderCVSkills() {
            const container = document.getElementById('cv_skills_list');
            container.innerHTML = '';
            cvSkills.forEach((s, idx) => {
                container.innerHTML += `
                    <div style="display: flex; gap: 1rem; margin-bottom: 0.5rem;">
                        <input type="text" placeholder="Kategori (Örn: DATABASES)" value="${s.category}" onchange="cvSkills[${idx}].category = this.value" style="flex: 1;">
                        <input type="text" placeholder="Detaylar" value="${s.details}" onchange="cvSkills[${idx}].details = this.value" style="flex: 2;">
                        <button class="btn" style="background: #ef4444;" onclick="cvSkills.splice(${idx}, 1); renderCVSkills()"><i class="fas fa-trash"></i></button>
                    </div>
                `;
            });
        }
        function addCVSkill() { cvSkills.push({category: '', details: ''}); renderCVSkills(); }

        function renderCVEdu() {
            const container = document.getElementById('cv_edu_list');
            container.innerHTML = '';
            cvEdu.forEach((e, idx) => {
                container.innerHTML += `
                    <div style="display: flex; gap: 1rem; margin-bottom: 0.5rem;">
                        <input type="text" placeholder="Derece / Sertifika" value="${e.degree}" onchange="cvEdu[${idx}].degree = this.value" style="flex: 1;">
                        <input type="text" placeholder="Kurum ve Yıl" value="${e.institution}" onchange="cvEdu[${idx}].institution = this.value" style="flex: 1;">
                        <button class="btn" style="background: #ef4444;" onclick="cvEdu.splice(${idx}, 1); renderCVEdu()"><i class="fas fa-trash"></i></button>
                    </div>
                `;
            });
        }
        function addCVEdu() { cvEdu.push({degree: '', institution: ''}); renderCVEdu(); }

        function renderCVLang() {
            const container = document.getElementById('cv_lang_list');
            container.innerHTML = '';
            cvLang.forEach((l, idx) => {
                container.innerHTML += `
                    <div style="display: flex; gap: 1rem; margin-bottom: 0.5rem;">
                        <input type="text" placeholder="Dil" value="${l.language}" onchange="cvLang[${idx}].language = this.value" style="flex: 1;">
                        <input type="text" placeholder="Seviye" value="${l.level}" onchange="cvLang[${idx}].level = this.value" style="flex: 1;">
                        <button class="btn" style="background: #ef4444;" onclick="cvLang.splice(${idx}, 1); renderCVLang()"><i class="fas fa-trash"></i></button>
                    </div>
                `;
            });
        }
        function addCVLang() { cvLang.push({language: '', level: ''}); renderCVLang(); }

        function renderCVExp() {
            const container = document.getElementById('cv_exp_list');
            container.innerHTML = '';
            cvExp.forEach((e, idx) => {
                container.innerHTML += `
                    <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 4px; margin-bottom: 1rem; border: 1px solid rgba(255,255,255,0.1);">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 0.5rem;">
                            <input type="text" placeholder="Görev Unvanı (Örn: Tech Lead)" value="${e.jobTitle}" onchange="cvExp[${idx}].jobTitle = this.value">
                            <input type="text" placeholder="Şirket Adı" value="${e.company}" onchange="cvExp[${idx}].company = this.value">
                            <input type="text" placeholder="Süre & Tarih (Örn: Feb 2023 - Jun 2026)" value="${e.duration}" onchange="cvExp[${idx}].duration = this.value">
                            <input type="text" placeholder="Lokasyon (Örn: Berlin, Germany)" value="${e.location}" onchange="cvExp[${idx}].location = this.value">
                        </div>
                        <textarea rows="4" placeholder="Deneyim detayları (Her satıra bir madde yazabilirsiniz)" onchange="cvExp[${idx}].description = this.value" style="width: 100%; margin-top: 0.5rem;">${e.description}</textarea>
                        <div style="text-align: right; margin-top: 0.5rem;">
                            <button class="btn" style="background: #ef4444; font-size: 0.8rem;" onclick="cvExp.splice(${idx}, 1); renderCVExp()">Kaldır</button>
                        </div>
                    </div>
                `;
            });
        }
        function addCVExp() { cvExp.push({jobTitle: '', company: '', duration: '', location: '', description: ''}); renderCVExp(); }

        function loadCandidates() {
            if (!db) return;
            const container = document.getElementById('cv_candidates_list');
            
            db.ref('site_content/candidates').on('value', (snapshot) => {
                const data = snapshot.val();
                container.innerHTML = '';
                
                if (!data) {
                    container.innerHTML = '<p style="color: var(--text-dim); font-size: 0.9rem;">Henüz kayıtlı bir aday yok.</p>';
                    return;
                }
                
                const ids = Object.keys(data).reverse(); // Newest first
                
                ids.forEach(id => {
                    const c = data[id];
                    const cvUrl = window.location.origin + '/cv-template.html?id=' + id;
                    const feedbackUrl = window.location.origin + '/feedback.html?id=' + id;
                    
                    let feedbackHTML = '';
                    if (c.feedback) {
                        const feedbacks = Object.values(c.feedback);
                        feedbackHTML = `<div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                            <strong style="color: var(--primary); font-size: 0.85rem; display: block; margin-bottom: 0.5rem;">GELEN DEĞERLENDİRMELER (${feedbacks.length})</strong>`;
                        
                        feedbacks.forEach(f => {
                            feedbackHTML += `
                                <div style="background: rgba(0,0,0,0.2); padding: 0.75rem; border-radius: 4px; margin-bottom: 0.5rem; font-size: 0.85rem;">
                                    <div><strong>Yönetici:</strong> ${f.manager_name}</div>
                                    <div style="display: flex; gap: 1rem; margin: 0.25rem 0; flex-wrap: wrap;">
                                        <span><strong>Teknik:</strong> ${f.technical_score}/5</span>
                                        <span><strong>Uyum:</strong> ${f.culture_score}/5</span>
                                        <span><strong>Rol:</strong> ${f.role_score ? f.role_score : '-'}/5</span>
                                        <span><strong>Karar:</strong> <span style="color: ${f.verdict.includes('Olumlu') ? '#22c55e' : (f.verdict.includes('Olumsuz') ? '#ef4444' : '#eab308')}">${f.verdict}</span></span>
                                    </div>
                                    ${f.comments ? `<div style="color: var(--text-dim); font-style: italic;">"${f.comments}"</div>` : ''}
                                </div>
                            `;
                        });
                        feedbackHTML += `</div>`;
                    }

                    const div = document.createElement('div');
                    div.style.cssText = 'background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 1rem; margin-bottom: 1rem; border-radius: 4px;';
                    div.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div>
                                <strong style="display: block; font-size: 1.1rem; margin-bottom: 0.2rem;">${c.name}</strong>
                                <span style="color: var(--text-dim); font-size: 0.85rem;">${c.title}</span>
                            </div>
                            <div style="display: flex; gap: 0.5rem;">
                                <a href="${cvUrl}" target="_blank" class="btn" style="padding: 0.5rem 1rem; font-size: 0.8rem; background: #22c55e; color: white; text-decoration: none;" title="CV'yi Görüntüle"><i class="fas fa-file-invoice"></i> CV'ye Git</a>
                                <button class="btn" style="padding: 0.5rem 1rem; font-size: 0.8rem; background: #0ea5e9; color: white;" onclick="copyToClipboard('${feedbackUrl}')" title="Değerlendirme Formu Linkini Kopyala"><i class="fas fa-link"></i> Anket Linkini Kopyala</button>
                                <button class="btn" style="padding: 0.5rem 1rem; font-size: 0.8rem; background: #ef4444; color: white;" onclick="deleteCandidate('${id}')" title="Sil"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                        ${feedbackHTML}
                    `;
                    container.appendChild(div);
                });
            });
        }

        function deleteCandidate(id) {
            if(confirm("Bu adayı ve tüm değerlendirmelerini silmek istediğinize emin misiniz?")) {
                db.ref('site_content/candidates/' + id).remove();
            }
        }

        function generateCV() {
            const cvData = {
                name: document.getElementById('cv_form_name').value.trim(),
                title: document.getElementById('cv_form_title').value.trim(),
                location: document.getElementById('cv_form_location').value.trim(),
                experienceYears: document.getElementById('cv_form_exp_years').value.trim(),
                website: document.getElementById('cv_form_website').value.trim(),
                email: document.getElementById('cv_form_email').value.trim(),
                phone: document.getElementById('cv_form_phone').value.trim(),
                topHeading: document.getElementById('cv_form_top_heading').value.trim(),
                summary: document.getElementById('cv_form_summary').value.trim(),
                skills: cvSkills.filter(s => s.category.trim() !== ''),
                education: cvEdu.filter(e => e.degree.trim() !== ''),
                languages: cvLang.filter(l => l.language.trim() !== ''),
                experience: cvExp.filter(e => e.jobTitle.trim() !== ''),
                created_at: new Date().toISOString()
            };

            if (!cvData.name) {
                alert("Lütfen en azından ad ve soyad girin.");
                return;
            }

            if (!db) {
                alert("Firebase bağlantısı kurulamadı. CV buluta kaydedilemiyor.");
                return;
            }

            const btn = event.currentTarget;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> KAYDEDİLİYOR...';
            btn.disabled = true;

            const newRef = db.ref('site_content/candidates').push();
            newRef.set(cvData).then(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                alert(cvData.name + " başarıyla kaydedildi! Aday havuzundan CV'ye gidebilir veya yöneticiye değerlendirme linki gönderebilirsiniz.");
                // Optionally clear form
                document.getElementById('cv_form_name').value = '';
                document.getElementById('cv_form_title').value = '';
            }).catch(err => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                alert("Kayıt sırasında hata oluştu: " + err.message);
            });
        }

        // Initialize with one empty experience item just to show
        renderCVLang();
        renderCVSkills();
        renderCVEdu();
        renderCVExp();

        function fillFatihData() {
            document.getElementById('cv_form_name').value = "Fatih Gökçen";
            document.getElementById('cv_form_title').value = "SENIOR SOFTWARE ENGINEER & TECH LEAD";
            document.getElementById('cv_form_location').value = "Eskişehir, Turkey";
            document.getElementById('cv_form_exp_years').value = "13+ Years";
            document.getElementById('cv_form_website').value = "www.bizitworks.com";
            document.getElementById('cv_form_email').value = "info@bizitworks.com";
            document.getElementById('cv_form_phone').value = "+90 216 225 66 51";
            document.getElementById('cv_form_top_heading').value = "BIZ TEKNOLOJI | ENTERPRISE SOFTWARE SOLUTIONS";
            document.getElementById('cv_form_summary').value = "Senior Software Engineer / Tech Lead with over 13 years of experience in the Java ecosystem, High-Performance Payment Systems, and Spec-Driven Development (SDD). Expert in Payment Gateway Integrations & Checkout Architecture, with strong leadership in building scalable cloud-native architectures and mentoring engineering teams.";

            cvSkills = [
                { category: "LANGUAGES", details: "Java (8, 11, 17), Python, SQL, TypeScript, HTML/CSS" },
                { category: "FINTECH & PAYMENTS", details: "PayPal, Computop, Afterpay BNPL, iDEAL, iyzico, PayTR, PCI-DSS, 3DS2, Tokenization" },
                { category: "ARCHITECTURE & BACKEND", details: "Spring Boot, Microservices, Event-Driven, State Machine, SDD" },
                { category: "CLOUD & MESSAGING", details: "AWS (SQS, API Gateway, S3, Timestream, Lambda), Kafka" },
                { category: "DEVOPS & CI/CD", details: "Terraform, Helm, GitHub Actions, Jenkins, Docker, Kubernetes, Maven" },
                { category: "DATABASES", details: "AWS Timestream, PostgreSQL, Oracle 11g, MS SQL, Redis" },
                { category: "AI & INNOVATION", details: "LLM Fine-tuning, RAG Architectures, AI-Assisted Dev, STT/TTS (Whisper/Piper)" }
            ];
            renderCVSkills();

            cvEdu = [
                { degree: "B.Sc. Computer Engineering", institution: "Eskişehir Osmangazi Univ. (2013)" },
                { degree: "Professional Scrum Master I", institution: "Scrum.org (2020)" },
                { degree: "Oracle Certified Associate", institution: "Java SE 8 Programmer (2019)" }
            ];
            renderCVEdu();

            cvLang = [
                { language: "ENGLISH", level: "C1 (Advanced)" },
                { language: "GERMAN", level: "A1 (Learning)" }
            ];
            renderCVLang();

            cvExp = [
                {
                    jobTitle: "Tech Lead",
                    company: "kfzteile24.de",
                    duration: "Feb 2023 - Jun 2026",
                    location: "Berlin, Germany",
                    description: "Redesigned and scaled Cart & Checkout subsystems, eliminating client-side manipulation risks.\nIntegrated global PSPs (PayPal, Computop, Afterpay, iDEAL).\nHands-on backend (Java 17, Spring Boot) and frontend (React, Vue) contributions.\nImplemented Agentic Engineering & Spec-Driven Development workflows.\nDesigned high-performance messaging with AWS Timestream, Kafka, SQS.\nMentored teams on security, idempotency, and clean code practices."
                },
                {
                    jobTitle: "Senior Java Developer (Backend)",
                    company: "kfzteile24.de",
                    duration: "2021 - 2023",
                    location: "Berlin, Germany",
                    description: "Developed resilient backend services with Java / Spring Boot.\nRefactored legacy payment workflows into scalable microservices.\nDesigned secure APIs with AWS API Gateway.\nCollaborated with frontend teams across Angular and React platforms."
                },
                {
                    jobTitle: "Senior Software Developer / Architect",
                    company: "LOGO Business Solutions",
                    duration: "Apr 2020 - 2021",
                    location: "Ankara, Turkey",
                    description: "Resolved complex infrastructure bottlenecks in enterprise ERP systems.\nManaged CI/CD pipelines for large multi-module applications.\nPromoted reusable enterprise components to standardize software engineering."
                },
                {
                    jobTitle: "Software Developer",
                    company: "Bilge Adam Technologies",
                    duration: "Jul 2019 - Apr 2020",
                    location: "Ankara, Turkey",
                    description: "Designed secure backend microservices for critical e-government projects.\nConfigured automated testing & deployment pipelines to improve delivery speed."
                },
                {
                    jobTitle: "Software Developer / Security Coordinator",
                    company: "Mergen Software",
                    duration: "Sep 2013 - Jul 2019",
                    location: "Eskişehir, Turkey",
                    description: "Engineered Turkey's first web-based Hemapheresis Module.\nCoordinated developer workflows for Common Criteria (EAL2) certification.\nDesigned hospital ERP systems built on highly secure architectures."
                }
            ];
            renderCVExp();

            alert("Fatih Gökçen'e ait veriler forma dolduruldu. Şimdi 'CV OLUŞTUR VE GÖSTER' butonuna basarak kaydedebilirsiniz.");
        }
    