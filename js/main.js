/**
 * مصطفى أبو غالي | Mostafa Abou Ghaly - Portfolio JavaScript
 * Interactive Logic: Typing, ScrollSpy, Theme Switcher, Filters, Modals, WhatsApp Generator
 */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. Current Year in Footer
    // --------------------------------------------------------------------------
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // --------------------------------------------------------------------------
    // 2. Typing Effect in Hero Section
    // --------------------------------------------------------------------------
    const typedTextEl = document.getElementById('typedText');
    const phrases = [
        "طالب علوم إدارية وتنظيم أعمال 📊",
        "مطور ومصمم مواقع ويب عصرية 💻",
        "مصمم منصات تعليمية تفاعلية LMS 🎓",
        "خبير برامج أوفيس وتنسيق المذكرات 📑",
        "شريكك الرقمي لتحويل الأفكار إلى واقع مبهر 🚀"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeEffect() {
        if (!typedTextEl) return;

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 45;
        } else {
            typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of word
            isDeleting = true;
            typingSpeed = 1800;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400;
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();

    // --------------------------------------------------------------------------
    // 3. Scroll Progress & Header Scrolled State & Back To Top
    // --------------------------------------------------------------------------
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolledPercentage = (scrollTop / scrollHeight) * 100;

        if (scrollProgressBar) {
            scrollProgressBar.style.width = `${scrolledPercentage}%`;
        }

        if (header) {
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        if (backToTopBtn) {
            if (scrollTop > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --------------------------------------------------------------------------
    // 4. ScrollSpy: Highlight Active Nav Link
    // --------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .drawer-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // --------------------------------------------------------------------------
    // 5. Theme Toggle (Dark & Light Mode)
    // --------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const savedTheme = localStorage.getItem('aboughaly_theme');

    if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (document.body.classList.contains('light-theme')) {
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
                localStorage.setItem('aboughaly_theme', 'dark');
                showToast('تم تفعيل الوضع الليلي 🌙');
            } else {
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
                localStorage.setItem('aboughaly_theme', 'light');
                showToast('تم تفعيل الوضع النهاري ☀️');
            }
        });
    }

    // --------------------------------------------------------------------------
    // 6. Mobile Drawer Toggle
    // --------------------------------------------------------------------------
    const mobileToggleBtn = document.getElementById('mobileToggleBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    function openDrawer() {
        mobileDrawer.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // --------------------------------------------------------------------------
    // 7. Animated Number Counters on Scroll
    // --------------------------------------------------------------------------
    const statCards = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    function animateCounters() {
        statCards.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            let count = 0;
            const duration = 1800;
            const increment = target / (duration / 25);

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    if (target === 100) {
                        stat.textContent = `${Math.ceil(count)}%`;
                    } else if (target === 24) {
                        stat.textContent = `${Math.ceil(count)}/7`;
                    } else {
                        stat.textContent = `+${Math.ceil(count)}`;
                    }
                    setTimeout(updateCount, 25);
                } else {
                    if (target === 100) {
                        stat.textContent = '100%';
                    } else if (target === 24) {
                        stat.textContent = '24/7';
                    } else {
                        stat.textContent = `+${target}`;
                    }
                }
            };
            updateCount();
        });
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedStats) {
                hasAnimatedStats = true;
                animateCounters();
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // --------------------------------------------------------------------------
    // 8. Filterable Skills Matrix
    // --------------------------------------------------------------------------
    const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            skillFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // --------------------------------------------------------------------------
    // 9. Filterable Portfolio Projects
    // --------------------------------------------------------------------------
    const portfolioFilterBtns = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    portfolioFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            portfolioFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // --------------------------------------------------------------------------
    // 10. Interactive Direct WhatsApp Order Calculator
    // --------------------------------------------------------------------------
    const calcServiceType = document.getElementById('calcServiceType');
    const calcProjectName = document.getElementById('calcProjectName');
    const calcVolume = document.getElementById('calcVolume');
    const calcDeadline = document.getElementById('calcDeadline');
    const calcNotes = document.getElementById('calcNotes');
    const calcSenderName = document.getElementById('calcSenderName');
    const previewMessageContent = document.getElementById('previewMessageContent');
    const previewTime = document.getElementById('previewTime');
    const sendWhatsAppOrderBtn = document.getElementById('sendWhatsAppOrderBtn');

    function updateWhatsAppMessagePreview() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
        if (previewTime) previewTime.textContent = timeStr;

        const sender = calcSenderName?.value.trim() || 'عميل كريم';
        const service = calcServiceType?.value || 'طلب خدمة عامة';
        const project = calcProjectName?.value.trim() || 'مشروع جديد';
        const volume = calcVolume?.value.trim() || 'غير محدد حالياً';
        const deadline = calcDeadline?.value || 'حسب الاتفاق';
        const notes = calcNotes?.value.trim() || 'لا توجد ملاحظات إضافية حالياً';

        const formattedMessage = 
`السلام عليكم ورحمة الله وبركاته، أستاذ مصطفى أبو غالي.

أنا: ${sender}
أرغب في الاستفسار والاتفاق على تنفيذ:
📌 الخدمة المطلوبة: ${service}
🏷️ اسم / عنوان العمل: ${project}
📑 الحجم / عدد الصفحات: ${volume}
⏳ موعد التسليم المقترح: ${deadline}
📝 ملاحظات وتفاصيل: ${notes}

يسعدني معرفة التكلفة وخطة العمل المتاحة للبدء. شكراً جزيلاً!`;

        if (previewMessageContent) {
            previewMessageContent.textContent = formattedMessage;
        }

        return formattedMessage;
    }

    // Attach listeners
    [calcServiceType, calcProjectName, calcVolume, calcDeadline, calcNotes, calcSenderName].forEach(input => {
        if (input) {
            input.addEventListener('input', updateWhatsAppMessagePreview);
            input.addEventListener('change', updateWhatsAppMessagePreview);
        }
    });

    // Initial render
    updateWhatsAppMessagePreview();

    // Trigger WhatsApp Redirection
    if (sendWhatsAppOrderBtn) {
        sendWhatsAppOrderBtn.addEventListener('click', () => {
            const message = updateWhatsAppMessagePreview();
            const phone = "201031472257";
            const encoded = encodeURIComponent(message);
            const waUrl = `https://wa.me/${phone}?text=${encoded}`;
            window.open(waUrl, '_blank');
            showToast('جاري فتح محادثة واتساب... 🚀');
        });
    }

    // --------------------------------------------------------------------------
    // 11. Contact Form WhatsApp Dispatcher
    // --------------------------------------------------------------------------
    const directContactForm = document.getElementById('directContactForm');
    if (directContactForm) {
        directContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName')?.value.trim();
            const phone = document.getElementById('contactPhone')?.value.trim();
            const subject = document.getElementById('contactSubject')?.value.trim();
            const message = document.getElementById('contactMessage')?.value.trim();

            const text = 
`مرحباً مصطفى أبو غالي،
أنا: ${name}
رقم هاتفي: ${phone}
موضوع التواصل: ${subject}
الرسالة:
${message}`;

            const waUrl = `https://wa.me/201031472257?text=${encodeURIComponent(text)}`;
            window.open(waUrl, '_blank');
            showToast('تم تجهيز رسالتك وفتح واتساب! ✉️');
            directContactForm.reset();
        });
    }

    // --------------------------------------------------------------------------
    // 12. Project Detail Modal Data & Handler
    // --------------------------------------------------------------------------
    const projectDetailsData = {
        1: {
            title: "منصة 'إيدو شارب' للتعليم الإلكتروني الذكي (LMS)",
            category: "المنصات التعليمية LMS",
            imgSrc: "assets/project_lms.jpg",
            desc: "نظام تعليمي متكامل تم تصميمه خصيصاً للمدرسين والمراكز التعليمية، يهدف إلى توفير بيئة تعليمية ذكية تحمي محتوى المعلم وتوفر تجربة تفاعلية ممتعة للطلاب من خلال الحصص المسجلة، بنوك الأسئلة، ولوحة تحكم شاملة للدرجات والغياب.",
            features: [
                "واجهة استخدام عصرية متوافقة مع شاشات الكمبيوتر والتابلت والموبايل",
                "نظام تشفير وحماية الفيديوهات من التحميل أو التسجيل العشوائي",
                "امتحانات إلكترونية توقيتية مع بنك أسئلة وتصحيح تلقائي فوري",
                "لوحة إحصائيات لمتابعة تقدم كل طالب ودرجاته ونسب إتمام الدروس",
                "إمكانية إرسال تقارير دورية لأولياء الأمور عبر واتساب"
            ],
            tech: ["LMS Architecture", "JavaScript", "UI/UX Figma", "Responsive CSS3", "Security Protocols"]
        },
        2: {
            title: "سلسلة مذكرات 'القمة' الأكاديمية والطباعية",
            category: "المذكرات والمطبوعات",
            imgSrc: "assets/project_notes.jpg",
            desc: "مشروع إخراج وتنسيق فني شامل لمذكرات وملازم كبار المعلمين للمرحلة الثانوية والجامعية. تم الاعتماد على معايير الطباعة الحديثة مع خطوط عربية واضحة، تنظيم الجداول والرسومات البيانية المعقدة، وتصميم غلاف جذاب يمنح المذكرة هيبة الكتاب المعتمد.",
            features: [
                "تنسيق متقدم في Microsoft Word مع هوامش وتنسيق معتمد للمطابع",
                "إدراج رسومات توضيحية عالية الجودة وأشكال بيانية ملونة",
                "فهارس إلكترونية آلية وترقيم متناسق للصفحات والأبواب",
                "تدقيق لغوي ونحوي شامل لضمان خلو الملازم من أي أخطاء مطبعية",
                "تصدير ملفات PDF بدقة طباعة 300DPI جاهزة للفصل اللوني (CMYK)"
            ],
            tech: ["MS Word Advanced", "Typography Design", "Pre-Press PDF", "Arabic Proofreading", "Graphic Layout"]
        },
        3: {
            title: "نظام 'إدارتي' لإدارة السناتر والطلاب والمصروفات",
            category: "تطبيق ويب وإدارة",
            desc: "لوحة تحكم إدارية تفاعلية تعتمد على مبادئ العلوم الإدارية وهندسة البيانات؛ تنظم عمليات تسجيل مئات الطلاب، متابعة حضورهم وغيابهم في الحصص والمجموعات، وإصدار تقارير المصروفات والإيرادات اليومية والشهرية.",
            features: [
                "إدارة مجموعات الحصص ومواعيد الطلاب بكل دقة وسلاسة",
                "نظام تسجيل الحضور السريع عبر الباركود أو كود الطالب المخصص",
                "حساب تلقائي لنسب التحصيل المالي ومستحقات المساعدين والمصاريف التشغيلية",
                "مخططات بيانية فورية توضح معدل نمو أعداد الطلاب ومؤشرات الأداء (KPIs)"
            ],
            tech: ["Administrative Sciences", "Web Dashboard", "Data Analytics", "Financial Tracking"]
        },
        4: {
            title: "العرض التقديمي الاستثماري للعلوم الإدارية والتسويق",
            category: "عروض تقديمية باوربوينت",
            desc: "تصميم شرائح Presentation استثنائية لمناقشة أبحاث علمية ودراسات جدوى اقتصادية. تم استخدام ألوان احترافية هادئة مع انيميشن انسيابي يركز على توصيل الفكرة وإقناع الجمهور بدون تشتيت بصري.",
            features: [
                "سلايدات حركية ديناميكية ومخططات تدفقية (SmartArt & Flowcharts)",
                "رسوم بيانية توضح نسب النمو والتوقعات المالية بطريقة مرئية مبهرة",
                "هيكلة إدارية منظمة تبرز أهم نقاط القوة واستراتيجيات العمل",
                "تسليم ملف مفتوح المصدر قابل للتعديل بالإضافة لنسخة PDF تفاعلية"
            ],
            tech: ["PowerPoint Advanced", "Motion Slides", "Executive Pitch Deck", "Data Visualization"]
        },
        5: {
            title: "بوابة الاختبارات وبنوك الأسئلة الذكية للمعلمين",
            category: "اختبارات إلكترونية",
            desc: "واجهة إلكترونية متطورة مخصصة لتشغيل الاختبارات الشهرية واختبارات تحديد المستوى؛ تتيح للطلاب خوض الاختبار مع مؤقت زمني وتمنع الغش من خلال خلط الأسئلة عشوائياً وتحديد مهلة لكل سؤال.",
            features: [
                "دعم الأسئلة المقالية والاختيار من متعدد والمسائل الرياضية والعلمية",
                "إظهار الإجابات النموذجية والشرح التوضيحي فور إنهاء الاختبار",
                "إصدار شهادات تقدير إلكترونية تلقائية للمتفوقين والحاصلين على أعلى الدرجات",
                "لوحة تقييم لأداء المعلم توضح الأسئلة التي تعثر فيها أغلب الطلاب"
            ],
            tech: ["JavaScript Engine", "Timer Algorithms", "Interactive UI", "Results Analytics"]
        },
        6: {
            title: "شيت إكسل إداري ومالي متطور لإدارة المراكز التعليمية",
            category: "نظم إكسل متقدمة",
            desc: "قالب مبرمج بدقة داخل Microsoft Excel يجمع بين السهولة المطلقة في الإدخال والتعقيد البرمجي في المعادلات والدوال؛ صمم ليكون بديلاً فعالاً للبرامج باهظة الثمن لأصحاب السناتر والمدرسين المستقلين.",
            features: [
                "استخدام دوال متقدمة (XLOOKUP, INDEX/MATCH, SUMIFS, Pivot Tables)",
                "تلوين شرطي تلقائي لتنبيه الإدارة عند تأخر سداد أي طالب",
                "كشوف حسابات قابلة للطباعة بضغطة زر واحدة بنظام Sheet Per Month",
                "حماية كاملة للمعادلات لمنع مسح الحسابات بالخطأ من الموظفين"
            ],
            tech: ["Microsoft Excel", "Financial Models", "Conditional Formatting", "Automated Sheets"]
        }
    };

    const projectModalBackdrop = document.getElementById('projectModalBackdrop');
    const modalBody = document.getElementById('modalBody');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    window.openProjectModal = function(projectId) {
        const data = projectDetailsData[projectId];
        if (!data || !modalBody) return;

        let imgHtml = '';
        if (data.imgSrc) {
            imgHtml = `<div class="modal-project-img"><img src="${data.imgSrc}" alt="${data.title}"></div>`;
        }

        const featuresHtml = data.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> <span>${f}</span></li>`).join('');
        const tagsHtml = data.tech.map(t => `<span>${t}</span>`).join('');

        modalBody.innerHTML = `
            ${imgHtml}
            <span class="project-tag-badge" style="position:static; display:inline-block; margin-bottom:0.75rem;">${data.category}</span>
            <h2 class="modal-project-title">${data.title}</h2>
            <p class="modal-project-desc">${data.desc}</p>
            <h3 class="modal-features-title">أهم مميزات ومواصفات المشروع:</h3>
            <ul class="modal-features-list">
                ${featuresHtml}
            </ul>
            <div class="project-tech-tags" style="margin-bottom:1.75rem;">
                ${tagsHtml}
            </div>
            <div class="modal-actions">
                <a href="https://wa.me/201031472257?text=مرحباً%20مصطفى%2C%20أريد%20الاستفسار%20عن%20تفاصيل%20مشروع%20${encodeURIComponent(data.title)}" target="_blank" class="btn btn-whatsapp">
                    <i class="fa-brands fa-whatsapp"></i> طلب مشروع مماثل عبر واتساب
                </a>
                <button class="btn btn-secondary" onclick="closeProjectModal()">إغلاق النافذة</button>
            </div>
        `;

        projectModalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeProjectModal = function() {
        if (projectModalBackdrop) {
            projectModalBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
    if (projectModalBackdrop) {
        projectModalBackdrop.addEventListener('click', (e) => {
            if (e.target === projectModalBackdrop) closeProjectModal();
        });
    }

    // --------------------------------------------------------------------------
    // 13. CV Modal Handler
    // --------------------------------------------------------------------------
    const openCvModalBtn = document.getElementById('openCvModalBtn');
    const cvModalBackdrop = document.getElementById('cvModalBackdrop');
    const cvModalCloseBtn = document.getElementById('cvModalCloseBtn');

    function openCvModal() {
        if (cvModalBackdrop) {
            cvModalBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCvModal() {
        if (cvModalBackdrop) {
            cvModalBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (openCvModalBtn) openCvModalBtn.addEventListener('click', openCvModal);
    if (cvModalCloseBtn) cvModalCloseBtn.addEventListener('click', closeCvModal);
    if (cvModalBackdrop) {
        cvModalBackdrop.addEventListener('click', (e) => {
            if (e.target === cvModalBackdrop) closeCvModal();
        });
    }

    // Escape Key Listener for Modals
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
            closeCvModal();
            closeDrawer();
        }
    });

    // --------------------------------------------------------------------------
    // 14. Toast Notification Utility
    // --------------------------------------------------------------------------
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMsg');
    let toastTimeout;

    function showToast(message) {
        if (!toast || !toastMsg) return;
        toastMsg.textContent = message;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }
});
