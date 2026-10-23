/**
 * SOVEREIGN PORTFOLIO - REHAB REFAAT | DIGITAL SKILLS TRAINER
 * Master JavaScript File (Pure Vanilla JS)
 * Features: Dark/Light Mode, Mobile Navigation, Scrollspy,
 * Course Filters, Interactive Typing Tester, Form Validation,
 * Evaluator Widget, and Scroll Reveal Animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========================================================================
  // 1. Theme Management (Dark / Light Mode)
  // ========================================================================
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('sovereign-theme') || 'dark';
  setTheme(savedTheme);

  function setTheme(theme) {
    if (theme === 'light') {
      htmlRoot.setAttribute('data-theme', 'light');
      localStorage.setItem('sovereign-theme', 'light');
      updateThemeAria('Switch to dark mode');
    } else {
      htmlRoot.removeAttribute('data-theme');
      localStorage.setItem('sovereign-theme', 'dark');
      updateThemeAria('Switch to light mode');
    }
  }

  function updateThemeAria(label) {
    themeToggleBtns.forEach(btn => {
      btn.setAttribute('aria-label', label);
    });
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isLight = htmlRoot.getAttribute('data-theme') === 'light';
      setTheme(isLight ? 'dark' : 'light');
    });
  });

  // ========================================================================
  // 2. Sticky Header & Scroll Effects
  // ========================================================================
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // ========================================================================
  // 3. Mobile Navigation Drawer
  // ========================================================================
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.querySelector('.mobile-drawer-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-drawer .nav-link, .mobile-drawer .btn');

  function openDrawer() {
    mobileToggle.classList.add('open');
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileToggle.classList.remove('open');
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      isOpen ? closeDrawer() : openDrawer();
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // ========================================================================
  // 4. Active Navigation Highlighting (Scrollspy)
  // ========================================================================
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-menu .nav-link');
  const allNavLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        allNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
  highlightNavOnScroll();

  // ========================================================================
  // 5. Scroll Reveal Animations (IntersectionObserver)
  // ========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // ========================================================================
  // 6. Course Filter Tabs
  // ========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // ========================================================================
  // 7. Course Pre-Selection -> Jump to Contact Form
  // ========================================================================
  const enrollBtns = document.querySelectorAll('.enroll-course-btn');
  const courseSelect = document.getElementById('courseSelect');
  const contactSection = document.getElementById('contact');

  enrollBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseTarget = btn.getAttribute('data-course-value');
      if (courseSelect && courseTarget) {
        courseSelect.value = courseTarget;
        
        // Gentle highlight animation on select element
        courseSelect.focus();
        courseSelect.style.borderColor = 'var(--gold-primary)';
        courseSelect.style.boxShadow = '0 0 0 4px rgba(212, 175, 55, 0.3)';
        setTimeout(() => {
          courseSelect.style.boxShadow = '';
        }, 1500);
      }
    });
  });

  // ========================================================================
  // 8. Interactive Readiness Evaluator Widget
  // ========================================================================
  const evaluatorOptions = document.querySelectorAll('.evaluator-option-btn');
  const evaluatorHeading = document.getElementById('evaluatorHeading');
  const evaluatorDesc = document.getElementById('evaluatorDesc');
  const evaluatorCta = document.getElementById('evaluatorCta');

  const recommendations = {
    beginner: {
      title: 'المسار المقترح: أساسيات الحاسوب ونظام التشغيل (من الصفر للاحتراف)',
      desc: 'المسار الأمثل للبدء. سنزيل تماماً أي خوف أو رهبة من التعامل مع الكمبيوتر، ونتعلم خطوة بخطوة إدارة الملفات، التحكم بالفأرة ولوحة المفاتيح، وقواعد الأمان الرقمي.',
      courseVal: 'fundamentals',
      ctaText: 'التسجيل في أساسيات الحاسوب'
    },
    office: {
      title: 'المسار المقترح: حزمة مايكروسوفت أوفيس المتكاملة (Word, Excel, PowerPoint)',
      desc: 'مصمم للمهام الأكاديمية والعملية. ستتعلم تنسيق الأبحاث والـ CV باحترافية، وإجراء العمليات الحسابية والجداول في إكسيل، وتصميم عروض تقديمية مميزة.',
      courseVal: 'office',
      ctaText: 'التسجيل في مسار الأوفيس'
    },
    speed: {
      title: 'المسار المقترح: احتراف الطباعة باللمس وسرعة لوحة المفاتيح (عربي وإنجليزي)',
      desc: 'توقف عن النظر إلى لوحة المفاتيح وضاعف سرعتك. تدريب عملي لبناء الذاكرة العضلية للأصابع باللغتين العربية والإنجليزية، مع اختصارات لوحة المفاتيح الاحترافية.',
      courseVal: 'typing',
      ctaText: 'التسجيل في سرعة الطباعة'
    }
  };

  evaluatorOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      evaluatorOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');

      const level = opt.getAttribute('data-level');
      const rec = recommendations[level];

      if (rec && evaluatorHeading && evaluatorDesc && evaluatorCta) {
        evaluatorHeading.textContent = rec.title;
        evaluatorDesc.textContent = rec.desc;
        evaluatorCta.setAttribute('data-course-value', rec.courseVal);
        evaluatorCta.textContent = rec.ctaText;
      }
    });
  });

  if (evaluatorCta) {
    evaluatorCta.addEventListener('click', () => {
      const val = evaluatorCta.getAttribute('data-course-value');
      if (courseSelect && val) {
        courseSelect.value = val;
        courseSelect.focus();
      }
    });
  }

  // ========================================================================
  // 9. Interactive Typing Speed Mini-Tester
  // ========================================================================
  const typingDisplay = document.getElementById('typingDisplay');
  const typingInput = document.getElementById('typingInput');
  const typingWpm = document.getElementById('typingWpm');
  const typingAccuracy = document.getElementById('typingAccuracy');
  const typingFeedback = document.getElementById('typingFeedback');
  const langBtns = document.querySelectorAll('.typing-lang-btn');

  const typingSamples = {
    en: [
      "Digital skills empower students to learn with clarity and achieve independent success.",
      "Mastering the keyboard and essential office tools builds lasting confidence for your career.",
      "Step by step practice transforms technical hesitation into genuine digital independence."
    ],
    ar: [
      "تعلّم المهارات الرقمية بوضوح يمنحك الثقة والقدرة على استخدام الحاسوب باستقلالية تامة.",
      "التدريب العملي خطوة بخطوة هو المفتاح الأساسي لإتقان برامج الأوفيس وسرعة الطباعة.",
      "في سوفرين نساعدك على بناء مهاراتك من الصفر لتنجز مهامك الأكاديمية والعملية بكفاءة."
    ]
  };

  let currentLang = 'ar';
  let currentSampleIndex = 0;
  let targetText = typingSamples[currentLang][currentSampleIndex];
  let startTime = null;
  let timerInterval = null;

  function initTypingSample() {
    targetText = typingSamples[currentLang][currentSampleIndex];
    if (!typingDisplay) return;

    typingDisplay.innerHTML = '';
    if (currentLang === 'ar') {
      typingDisplay.style.direction = 'rtl';
      if (typingInput) typingInput.style.direction = 'rtl';
    } else {
      typingDisplay.style.direction = 'ltr';
      if (typingInput) typingInput.style.direction = 'ltr';
    }

    targetText.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      if (index === 0) span.classList.add('current');
      typingDisplay.appendChild(span);
    });

    if (typingInput) typingInput.value = '';
    if (typingWpm) typingWpm.textContent = '0';
    if (typingAccuracy) typingAccuracy.textContent = '100%';
    if (typingFeedback) typingFeedback.textContent = currentLang === 'ar' ? 'ابدأ بالكتابة لقياس سرعتك ودقتك في الوقت الفعلي!' : 'Start typing to measure your real-time speed and accuracy!';
    startTime = null;
    clearInterval(timerInterval);
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLang = btn.getAttribute('data-lang');
      currentSampleIndex = 0;
      initTypingSample();
    });
  });

  if (typingInput) {
    typingInput.addEventListener('input', () => {
      const inputVal = typingInput.value;
      const charSpans = typingDisplay.querySelectorAll('span');

      if (!startTime && inputVal.length > 0) {
        startTime = new Date();
      }

      let correctChars = 0;
      let completed = true;

      charSpans.forEach((span, i) => {
        const targetChar = targetText[i];
        const typedChar = inputVal[i];

        span.className = '';

        if (typedChar == null) {
          if (i === inputVal.length) {
            span.classList.add('current');
          }
          completed = false;
        } else if (typedChar === targetChar) {
          span.classList.add('correct');
          correctChars++;
        } else {
          span.classList.add('incorrect');
          completed = false;
        }
      });

      // Calculate WPM and Accuracy
      if (startTime && inputVal.length > 0) {
        const timeElapsedMinutes = (new Date() - startTime) / 60000;
        const wordsTyped = inputVal.length / 5;
        const wpm = timeElapsedMinutes > 0 ? Math.round(wordsTyped / timeElapsedMinutes) : 0;
        const accuracy = Math.round((correctChars / inputVal.length) * 100);

        if (typingWpm) typingWpm.textContent = wpm;
        if (typingAccuracy) typingAccuracy.textContent = `${accuracy}%`;

        if (completed && inputVal.length >= targetText.length) {
          clearInterval(timerInterval);
          if (typingFeedback) {
            if (wpm >= 40 && accuracy >= 95) {
              typingFeedback.innerHTML = `🌟 <strong>ممتاز جداً!</strong> ${wpm} كلمة/دقيقة بدقة ${accuracy}%. تمتلك سرعة طباعة مميزة!`;
            } else {
              typingFeedback.innerHTML = `👏 <strong>أحسنت!</strong> ${wpm} كلمة/دقيقة. مع برنامج رحاب رفعت للطباعة باللمس يمكنك مضاعفة سرعتك في أسابيع قليلة!`;
            }
          }
        }
      }
    });
  }

  initTypingSample();

  // ========================================================================
  // 10. Client-Side Registration Form Validation & Feedback
  // ========================================================================
  const registrationForm = document.getElementById('registrationForm');
  const successBanner = document.getElementById('formSuccessBanner');
  const successLearnerName = document.getElementById('successLearnerName');

  if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      const nameInput = document.getElementById('fullName');
      const phoneInput = document.getElementById('phoneNumber');
      const courseInput = document.getElementById('courseSelect');
      const levelInput = document.getElementById('skillLevel');

      // Helper function to mark errors
      function validateField(input, condition) {
        const parent = input.closest('.form-group');
        if (!condition) {
          parent.classList.add('has-error');
          isValid = false;
        } else {
          parent.classList.remove('has-error');
        }
      }

      // Name validation (at least 3 characters)
      validateField(nameInput, nameInput.value.trim().length >= 3);

      // Phone validation (digits, minimum 8 characters)
      const phoneVal = phoneInput.value.trim();
      const phoneRegex = /^[+0-9\s\-()]{8,20}$/;
      validateField(phoneInput, phoneRegex.test(phoneVal));

      // Course selection validation
      validateField(courseInput, courseInput.value !== '');

      if (isValid) {
        const learnerName = nameInput.value.trim();
        
        // Show success banner
        if (successBanner) {
          if (successLearnerName) {
            successLearnerName.textContent = learnerName;
          }
          successBanner.classList.add('visible');
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Generate instant WhatsApp redirect preparation (optional prefill)
        const selectedCourseText = courseInput.options[courseInput.selectedIndex].text;
        const customMessage = `مرحباً كوتش رحاب، أنا ${learnerName}. أود الاستفسار والتسجيل في برنامج "${selectedCourseText}".`;
        const whatsappBtn = document.getElementById('dynamicWhatsAppBtn');
        if (whatsappBtn) {
          whatsappBtn.href = `https://wa.me/201155221338?text=${encodeURIComponent(customMessage)}`;
        }

        // Reset form inputs after brief delay
        registrationForm.reset();

        setTimeout(() => {
          // Re-enable after viewing
        }, 8000);
      }
    });

    // Clear error on input
    registrationForm.querySelectorAll('.form-control').forEach(control => {
      control.addEventListener('input', () => {
        const parent = control.closest('.form-group');
        if (parent) parent.classList.remove('has-error');
      });
    });
  }

  // ========================================================================
  // 11. Back to Top Smooth Scroll
  // ========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========================================================================
  // 12. Interactive & Editable Lecture Schedule Management
  // ========================================================================
  const defaultScheduleData = [
    {
      id: 'lec-1',
      day: 'السبت والإثنين',
      time: '٠٥:٠٠ م - ٠٦:٣٠ م',
      course: 'أساسيات الحاسوب ونظام ويندوز (من الصفر)',
      category: 'fundamentals',
      type: 'مجموعة صغيرة (حضوري / أونلاين)',
      status: 'available',
      statusText: 'متاح للحجز',
      seats: 'متاح ٣ مقاعد فقط'
    },
    {
      id: 'lec-2',
      day: 'الأحد والأربعاء',
      time: '٠٦:٠٠ م - ٠٧:٣٠ م',
      course: 'مايكروسوفت وورد وتنسيق الأبحاث والـ CV',
      category: 'office',
      type: 'تدريب تطبيقي مباشر',
      status: 'limited',
      statusText: 'مقاعد محدودة',
      seats: 'متبقي مقعدان فقط'
    },
    {
      id: 'lec-3',
      day: 'الثلاثاء والخميس',
      time: '٠٥:٠٠ م - ٠٦:٣٠ م',
      course: 'احتراف سرعة الطباعة باللمس (عربي وإنجليزي)',
      category: 'typing',
      type: 'تمارين مكثفة وبناء الذاكرة العضلية',
      status: 'available',
      statusText: 'متاح للحجز',
      seats: 'متاح ٤ مقاعد'
    },
    {
      id: 'lec-4',
      day: 'الجمعة (مكثف)',
      time: '٠٤:٠٠ م - ٠٦:٠٠ م',
      course: 'مايكروسوفت إكسيل للمبتدئين (الجداول والمعادلات)',
      category: 'office',
      type: 'ورشة عمل تطبيقية مكثفة',
      status: 'available',
      statusText: 'متاح للحجز',
      seats: 'متاح ٥ مقاعد'
    },
    {
      id: 'lec-5',
      day: 'مواعيد مرنة حسب جدولك',
      time: 'يتم تنسيقها معكِ شخصياً',
      course: 'التوجيه الرقمي الخاص 1-على-1 (منهج مخصص)',
      category: 'mentorship',
      type: 'جلسات فردية خاصة ومكثفة',
      status: 'private',
      statusText: 'حجز فردي خاص',
      seats: 'جلسة خاصة 100%'
    }
  ];

  const scheduleTableBody = document.getElementById('scheduleTableBody');
  const scheduleContainer = document.getElementById('scheduleContainer');
  const toggleAdminBtn = document.getElementById('toggleAdminScheduleBtn');
  const adminAddBtn = document.getElementById('adminAddLectureBtn');
  const adminResetBtn = document.getElementById('adminResetScheduleBtn');
  const scheduleFilterBtns = document.querySelectorAll('.schedule-filter-btn');

  // Modal Elements
  const modalOverlay = document.getElementById('scheduleModalOverlay');
  const modalCloseBtn = document.getElementById('scheduleModalCloseBtn');
  const modalCancelBtn = document.getElementById('scheduleModalCancelBtn');
  const modalForm = document.getElementById('scheduleEditForm');
  const modalTitle = document.getElementById('scheduleModalTitle');
  const editSessionId = document.getElementById('editSessionId');
  const editSessionDay = document.getElementById('editSessionDay');
  const editSessionTime = document.getElementById('editSessionTime');
  const editSessionCourse = document.getElementById('editSessionCourse');
  const editSessionCategory = document.getElementById('editSessionCategory');
  const editSessionType = document.getElementById('editSessionType');
  const editSessionStatus = document.getElementById('editSessionStatus');
  const editSessionSeats = document.getElementById('editSessionSeats');

  let currentScheduleFilter = 'all';

  function getSchedule() {
    try {
      const stored = localStorage.getItem('sovereign-schedule');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading schedule from localStorage', e);
    }
    return [...defaultScheduleData];
  }

  function saveSchedule(data) {
    try {
      localStorage.setItem('sovereign-schedule', JSON.stringify(data));
    } catch (e) {
      console.error('Error saving schedule to localStorage', e);
    }
  }

  function renderScheduleTable() {
    if (!scheduleTableBody) return;
    const items = getSchedule();
    scheduleTableBody.innerHTML = '';

    const filtered = items.filter(item => {
      if (currentScheduleFilter === 'all') return true;
      return item.category === currentScheduleFilter;
    });

    if (filtered.length === 0) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td colspan="5" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
        لا توجد مواعيد مضافة في هذا التصنيف حالياً. يمكنك تصفح التصنيفات الأخرى أو طلب موعد مخصص.
      </td>`;
      scheduleTableBody.appendChild(tr);
      return;
    }

    filtered.forEach(item => {
      const tr = document.createElement('tr');
      tr.setAttribute('data-id', item.id);
      tr.setAttribute('data-category', item.category);

      let statusBadgeClass = 'status-available';
      if (item.status === 'limited') statusBadgeClass = 'status-limited';
      else if (item.status === 'full') statusBadgeClass = 'status-full';
      else if (item.status === 'private') statusBadgeClass = 'status-private';

      tr.innerHTML = `
        <td data-label="اليوم والتوقيت">
          <div class="session-day-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>${item.day}</span>
          </div>
          <div class="session-time">${item.time}</div>
        </td>
        <td data-label="المحاضرة / الكورس">
          <div class="session-course-title">${item.course}</div>
          <div class="session-type-pill">${item.type}</div>
        </td>
        <td data-label="حالة المقاعد">
          <span class="schedule-status-badge ${statusBadgeClass}">
            <span>●</span>
            <span>${item.statusText || 'متاح'}</span>
          </span>
          <div class="seats-detail-note">${item.seats || ''}</div>
        </td>
        <td data-label="حجز الموعد">
          <div class="schedule-row-actions">
            <button type="button" class="btn btn-outline-gold btn-sm book-session-btn" data-course-id="${item.category}" data-session-desc="${item.course} (${item.day} - ${item.time})">
              <span>احجز هذا الموعد</span>
            </button>
            <button type="button" class="btn btn-secondary btn-sm admin-only-btn edit-session-btn" data-id="${item.id}" title="تعديل هذا الموعد">
              <span>✏️ تعديل</span>
            </button>
            <button type="button" class="btn btn-secondary btn-sm admin-only-btn delete-session-btn" data-id="${item.id}" title="حذف هذا الموعد" style="color: #ef4444; border-color: rgba(239, 68, 68, 0.3);">
              <span>🗑️ حذف</span>
            </button>
          </div>
        </td>
      `;

      scheduleTableBody.appendChild(tr);
    });

    bindScheduleActionButtons();
  }

  function bindScheduleActionButtons() {
    // Book buttons
    document.querySelectorAll('.book-session-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-course-id');
        const desc = btn.getAttribute('data-session-desc');
        const courseSelect = document.getElementById('courseSelect');
        const formMessage = document.getElementById('formMessage');
        const contactSec = document.getElementById('contact');

        if (courseSelect && cat) {
          courseSelect.value = cat;
        }

        if (formMessage && desc) {
          formMessage.value = `أود حجز مقعد في الموعد التالي: ${desc}`;
        }

        if (contactSec) {
          contactSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (courseSelect) {
            courseSelect.focus();
            courseSelect.style.borderColor = 'var(--gold-primary)';
            courseSelect.style.boxShadow = '0 0 0 4px rgba(212, 175, 55, 0.3)';
            setTimeout(() => {
              courseSelect.style.boxShadow = '';
            }, 1800);
          }
        }
      });
    });

    // Edit buttons (Admin)
    document.querySelectorAll('.edit-session-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openEditModal(id);
      });
    });

    // Delete buttons (Admin)
    document.querySelectorAll('.delete-session-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm('هل أنتِ متأكدة من رغبتك في حذف هذا الموعد من الجدول؟')) {
          let items = getSchedule();
          items = items.filter(it => it.id !== id);
          saveSchedule(items);
          renderScheduleTable();
        }
      });
    });
  }

  // Filter Buttons
  scheduleFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scheduleFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentScheduleFilter = btn.getAttribute('data-filter');
      renderScheduleTable();
    });
  });

  // Toggle Admin Mode
  if (toggleAdminBtn && scheduleContainer) {
    toggleAdminBtn.addEventListener('click', () => {
      const isActive = scheduleContainer.classList.contains('admin-active');
      if (isActive) {
        scheduleContainer.classList.remove('admin-active');
        toggleAdminBtn.innerHTML = `<span>⚙️ وضع إدارة الجدول (للمدربة)</span>`;
      } else {
        scheduleContainer.classList.add('admin-active');
        toggleAdminBtn.innerHTML = `<span>✕ إنهاء وضع التعديل</span>`;
      }
    });
  }

  // Add New Session
  if (adminAddBtn) {
    adminAddBtn.addEventListener('click', () => {
      openEditModal(null);
    });
  }

  // Reset to Defaults
  if (adminResetBtn) {
    adminResetBtn.addEventListener('click', () => {
      if (confirm('هل ترغبين في إعادة ضبط جدول المواعيد للبيانات الافتراضية؟ ستفقدين أي تعديلات مخصصة قمتِ بها.')) {
        saveSchedule(defaultScheduleData);
        renderScheduleTable();
      }
    });
  }

  // Modal Functions
  function openEditModal(id) {
    if (!modalOverlay) return;
    if (id) {
      // Edit existing
      const items = getSchedule();
      const item = items.find(it => it.id === id);
      if (item) {
        modalTitle.textContent = 'تعديل موعد محاضرة';
        editSessionId.value = item.id;
        editSessionDay.value = item.day || '';
        editSessionTime.value = item.time || '';
        editSessionCourse.value = item.course || '';
        editSessionCategory.value = item.category || 'fundamentals';
        editSessionType.value = item.type || '';
        editSessionStatus.value = item.status || 'available';
        editSessionSeats.value = item.seats || '';
      }
    } else {
      // Add new
      modalTitle.textContent = 'إضافة موعد محاضرة جديد';
      editSessionId.value = '';
      if (modalForm) modalForm.reset();
      editSessionCategory.value = 'fundamentals';
      editSessionStatus.value = 'available';
    }
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeEditModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeEditModal);
  if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeEditModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeEditModal();
    });
  }

  // Form Submit
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = editSessionId.value;
      const items = getSchedule();

      const statusMap = {
        available: 'متاح للحجز',
        limited: 'مقاعد محدودة',
        full: 'مكتمل العدد',
        private: 'حجز فردي خاص'
      };

      const sessionObj = {
        id: id ? id : 'lec-' + Date.now(),
        day: editSessionDay.value.trim(),
        time: editSessionTime.value.trim(),
        course: editSessionCourse.value.trim(),
        category: editSessionCategory.value,
        type: editSessionType.value.trim() || 'جلسات تدريبية',
        status: editSessionStatus.value,
        statusText: statusMap[editSessionStatus.value] || 'متاح',
        seats: editSessionSeats.value.trim()
      };

      if (!sessionObj.day || !sessionObj.time || !sessionObj.course) {
        alert('يرجى ملء الحقول الأساسية: اليوم، التوقيت، واسم الكورس.');
        return;
      }

      if (id) {
        const index = items.findIndex(it => it.id === id);
        if (index !== -1) {
          items[index] = sessionObj;
        }
      } else {
        items.push(sessionObj);
      }

      saveSchedule(items);
      renderScheduleTable();
      closeEditModal();
    });
  }

  // Initial Schedule Table Render
  renderScheduleTable();

});
