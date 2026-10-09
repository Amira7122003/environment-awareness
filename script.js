/* ============================================================
   ENVIRONMENTAL AWARENESS WEBSITE  |  script.js
   All interactive JavaScript — no frameworks required.

   Table of Contents:
   01. Initialisation (DOMContentLoaded)
   02. Theme Toggle (Dark / Light Mode)
   03. Mobile Navigation Menu
   04. Smooth Scrolling
   05. Scroll Effects (navbar shadow + scroll-to-top visibility)
   06. Scroll-to-Top Button
   07. Active Nav Link Highlighting
   08. Fade-in Animations on Scroll (IntersectionObserver)
   09. Animated Counters (IntersectionObserver)
   10. Interactive Quiz
   11. Contact Form Validation
   12. Newsletter Subscription
============================================================ */

'use strict';

/* ====================================================
   01. INITIALISATION
   All features are wired up after the DOM is ready.
==================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initTheme();
    initMobileMenu();
    initSmoothScroll();
    initScrollEffects();
    initScrollToTop();
    initActiveNavLinks();
    initFadeInAnimations();
    initCounters();
    initQuiz();
    initContactForm();
    initNewsletter();
});


/* ====================================================
   02. THEME TOGGLE  (Dark / Light Mode)
   Persists the user's preference in localStorage.
==================================================== */
function initTheme() {
    const toggleBtn  = document.getElementById('themeToggle');
    const themeIcon  = document.getElementById('themeIcon');
    const htmlEl     = document.documentElement;

    // Restore saved preference, or default to 'light'
    const saved = localStorage.getItem('ecoaware-theme') || 'light';
    applyTheme(saved, themeIcon, htmlEl);

    toggleBtn.addEventListener('click', () => {
        const current = htmlEl.getAttribute('data-theme');
        const next    = current === 'light' ? 'dark' : 'light';
        applyTheme(next, themeIcon, htmlEl);
        localStorage.setItem('ecoaware-theme', next);
    });
}

/**
 * Apply a theme and update the toggle icon.
 * @param {string} theme  - 'light' or 'dark'
 * @param {Element} icon  - The <i> element inside the toggle button
 * @param {Element} html  - The <html> element
 */
function applyTheme(theme, icon, html) {
    html.setAttribute('data-theme', theme);
    // Sun icon in dark mode, moon icon in light mode
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}


/* ====================================================
   03. MOBILE NAVIGATION MENU
   Hamburger open/close + close on outside click or link tap.
==================================================== */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('navMenu');
    const navLinks  = document.querySelectorAll('.nav-link');

    function openMenu() {
        navMenu.classList.add('open');
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.contains('open') ? closeMenu() : openMenu();
    });

    // Close when a nav link is clicked
    navLinks.forEach(link => link.addEventListener('click', closeMenu));

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMenu();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
}


/* ====================================================
   04. SMOOTH SCROLLING
   Accounts for the fixed navbar height so content
   is not hidden behind it after a hash-link click.
==================================================== */
function initSmoothScroll() {
    const navbar    = document.getElementById('navbar');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const navHeight     = navbar.offsetHeight;
            const targetTop     = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;

            window.scrollTo({ top: targetTop, behavior: 'smooth' });
        });
    });
}


/* ====================================================
   05. SCROLL EFFECTS
   Adds a shadow to the navbar on scroll, and controls
   the visibility of the scroll-to-top button.
==================================================== */
function initScrollEffects() {
    const navbar      = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar: add shadow after scrolling 60px
        navbar.classList.toggle('scrolled', scrollY > 60);

        // Scroll-to-top: show after 400px
        scrollTopBtn.classList.toggle('visible', scrollY > 400);
    }, { passive: true });
}


/* ====================================================
   06. SCROLL-TO-TOP BUTTON
==================================================== */
function initScrollToTop() {
    document.getElementById('scrollTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


/* ====================================================
   07. ACTIVE NAV LINK HIGHLIGHTING
   Uses IntersectionObserver to detect which section is
   currently in the viewport and highlights the matching link.
==================================================== */
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, {
        // Trigger when the middle 50% of a section enters the viewport
        rootMargin: '-45% 0px -45% 0px'
    });

    sections.forEach(section => observer.observe(section));
}


/* ====================================================
   08. FADE-IN ANIMATIONS ON SCROLL
   Each element with class .fade-in starts invisible
   (opacity:0, translateY) and becomes visible (class
   "visible" added) once it enters the viewport.
   Only triggers once per element.
==================================================== */
function initFadeInAnimations() {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // fire once
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.12   // 12% of element must be visible
    });

    elements.forEach(el => observer.observe(el));
}


/* ====================================================
   09. ANIMATED COUNTERS
   Reads data-target (number) and data-suffix (string)
   from each .stat-number element and counts up using
   requestAnimationFrame with an ease-out curve.
   Starts when the statistics section enters the viewport.
   Digits are rendered in the active language's numeral
   style (e.g. Eastern Arabic ٠١٢٣ for Arabic) and reformat
   instantly on language change without restarting the count.
==================================================== */

/** Tracks the current raw numeric value shown in each .stat-number element. */
const statNumberValues = new WeakMap();

/**
 * Resolve a stat card's unit suffix (e.g. "kg" / "كغ") for the active
 * language. Prefers the translated data-suffix-key lookup and falls
 * back to the raw data-suffix attribute if no key/translation exists.
 * @param {Element} element - .stat-number element
 * @returns {string}
 */
function getStatSuffix(element) {
    const key = element.getAttribute('data-suffix-key');
    if (key) {
        const translated = t(key);
        if (translated !== key) return translated;
    }
    return element.getAttribute('data-suffix') || '';
}

function initCounters() {
    const statsSection = document.getElementById('statistics');
    if (!statsSection) return;

    const statEls = statsSection.querySelectorAll('.stat-number');
    let started    = false;

    statEls.forEach(el => statNumberValues.set(el, 0));

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            started = true;
            statEls.forEach(el => animateCounter(el));
            observer.disconnect();
        }
    }, { threshold: 0.4 });

    observer.observe(statsSection);

    // Re-render the currently displayed values in the new language's
    // numeral style (e.g. Arabic-Indic digits) and translated unit
    // suffix, without restarting the count.
    document.addEventListener('languagechange', () => {
        statEls.forEach(el => {
            const value = statNumberValues.get(el) || 0;
            el.textContent = formatNumber(value) + getStatSuffix(el);
        });
    });
}

/**
 * Count from 0 to data-target over ~2.6 seconds.
 * @param {Element} element - .stat-number element
 */
function animateCounter(element) {
    const target   = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2600; // ms
    const start    = performance.now();

    /** Ease-out cubic: fast start, gentle finish */
    function easeOut(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function tick(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const current  = Math.floor(easeOut(progress) * target);
        const suffix   = getStatSuffix(element);

        // Localise large numbers (e.g. 2,500,000 / ٢٬٥٠٠٬٠٠٠ in Arabic)
        statNumberValues.set(element, current);
        element.textContent = formatNumber(current) + suffix;

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            // Ensure exact final value
            statNumberValues.set(element, target);
            element.textContent = formatNumber(target) + suffix;
        }
    }

    requestAnimationFrame(tick);
}


/* ====================================================
   10. INTERACTIVE QUIZ
   5 multiple-choice environmental questions.
   Shows question-by-question with instant feedback,
   then a personalised result screen.
   Question/answer content comes from QUIZ_DATA_I18N
   (see i18n.js) and updates instantly on language change.
==================================================== */

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

function initQuiz() {
    const quizContent  = document.getElementById('quizContent');
    const quizResult   = document.getElementById('quizResult');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const retakeBtn    = document.getElementById('retakeBtn');

    if (!quizContent) return;

    let quizData     = getQuizData();
    let currentIndex = 0;
    let score        = 0;
    let answered     = false;
    let resultShown  = false;

    /** Update the "Question X of Y" progress label for the current state */
    function updateProgressText() {
        if (resultShown) {
            progressText.textContent = t('quiz.complete');
        } else {
            progressText.textContent = t('quiz.questionOf', { current: currentIndex + 1, total: quizData.length });
        }
    }

    /** Render a specific question by index */
    function renderQuestion(index) {
        const q  = quizData[index];
        answered = false;

        // Update progress bar
        const pct = (index / quizData.length) * 100;
        progressFill.style.width    = `${pct}%`;
        progressFill.parentElement.setAttribute('aria-valuenow', Math.round(pct));
        updateProgressText();

        // Build option buttons HTML
        const optionsHtml = q.options.map((opt, i) => `
            <button class="option-btn" data-idx="${i}" aria-label="Option ${OPTION_LETTERS[i]}: ${opt}">
                <span class="option-letter" aria-hidden="true">${OPTION_LETTERS[i]}</span>
                ${escapeHTML(opt)}
            </button>
        `).join('');

        const isLast = index === quizData.length - 1;

        quizContent.innerHTML = `
            <div class="question-block">
                <p class="question-text">${escapeHTML(q.question)}</p>
                <div class="options-list" role="group" aria-label="Answer options">
                    ${optionsHtml}
                </div>
                <div id="feedbackBox"></div>
                <div class="quiz-nav">
                    <button class="btn btn-primary" id="nextBtn" style="display:none;">
                        ${isLast
                            ? `${escapeHTML(t('quiz.seeResults'))} <i class="fas fa-trophy" aria-hidden="true"></i>`
                            : `${escapeHTML(t('quiz.next'))} <i class="fas fa-arrow-right" aria-hidden="true"></i>`
                        }
                    </button>
                </div>
            </div>
        `;

        // Attach option click listeners
        quizContent.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (answered) return;
                answered = true;
                handleAnswer(parseInt(btn.getAttribute('data-idx'), 10), q.correct, q.explanation);
            });
        });

        // Attach next-button listener
        document.getElementById('nextBtn').addEventListener('click', () => {
            currentIndex++;
            if (currentIndex < quizData.length) {
                renderQuestion(currentIndex);
            } else {
                showResult();
            }
        });
    }

    /**
     * Handle an answer selection.
     * @param {number} selected   - Index of chosen option
     * @param {number} correct    - Index of correct option
     * @param {string} explanation - Explanatory text shown after answering
     */
    function handleAnswer(selected, correct, explanation) {
        const optionBtns = quizContent.querySelectorAll('.option-btn');
        const feedbackBox = document.getElementById('feedbackBox');
        const nextBtn     = document.getElementById('nextBtn');
        const isCorrect   = selected === correct;

        if (isCorrect) score++;

        // Style all buttons to show correct / incorrect
        optionBtns.forEach((btn, i) => {
            btn.disabled = true;
            if (i === correct)                  btn.classList.add('correct');
            else if (i === selected && !isCorrect) btn.classList.add('incorrect');
        });

        // Show feedback message
        const icon = isCorrect ? 'check-circle' : 'times-circle';
        const word = isCorrect ? t('quiz.correct') : t('quiz.incorrect');
        feedbackBox.innerHTML = `
            <div class="quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}">
                <i class="fas fa-${icon}" aria-hidden="true"></i>
                <span><strong>${escapeHTML(word)}</strong> ${escapeHTML(explanation)}</span>
            </div>
        `;

        // Show the Next / Results button
        nextBtn.style.display = 'inline-flex';
    }

    /** Render the personalised result screen */
    function showResult() {
        resultShown = true;
        progressFill.style.width = '100%';
        progressFill.parentElement.setAttribute('aria-valuenow', 100);
        updateProgressText();

        quizContent.style.display = 'none';
        quizResult.style.display  = 'block';

        renderResultMessage();
    }

    /** Populate the result screen's icon/message/score using current translations */
    function renderResultMessage() {
        const pct = (score / quizData.length) * 100;
        let emoji, messageKey;

        if (pct === 100) {
            emoji = '🏆'; messageKey = 'quiz.resultPerfect';
        } else if (pct >= 80) {
            emoji = '🌟'; messageKey = 'quiz.resultExcellent';
        } else if (pct >= 60) {
            emoji = '🌿'; messageKey = 'quiz.resultGood';
        } else if (pct >= 40) {
            emoji = '📚'; messageKey = 'quiz.resultOk';
        } else {
            emoji = '🌱'; messageKey = 'quiz.resultLow';
        }

        document.getElementById('resultIcon').textContent    = emoji;
        document.getElementById('resultMessage').textContent = t(messageKey);
        document.getElementById('scoreDisplay').textContent   = score;
        document.getElementById('scoreOutOf').textContent     = t('quiz.outOf', { total: quizData.length });
    }

    // Retake button resets state and re-renders the first question
    retakeBtn.addEventListener('click', () => {
        currentIndex = 0;
        score        = 0;
        answered     = false;
        resultShown  = false;
        quizContent.style.display = 'block';
        quizResult.style.display  = 'none';
        renderQuestion(0);
    });

    // Refresh in place when the language changes: reload the question
    // bank for the new language and re-render whatever is on screen,
    // preserving the learner's current progress and score.
    document.addEventListener('languagechange', () => {
        quizData = getQuizData();
        if (resultShown) {
            renderResultMessage();
            updateProgressText();
        } else {
            renderQuestion(Math.min(currentIndex, quizData.length - 1));
        }
    });

    // Kick off the quiz
    renderQuestion(0);
}

/**
 * Escape HTML special characters to prevent XSS when
 * inserting any dynamic string into innerHTML.
 * @param {string} str
 * @returns {string}
 */
function escapeHTML(str) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(str).replace(/[&<>"']/g, ch => map[ch]);
}


/* ====================================================
   11. CONTACT FORM VALIDATION
   Client-side only — no data is sent anywhere.
   Shows a success message on valid submit and simulates
   a short network delay with a spinner state.
==================================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Validate on submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearAllErrors();

        const name    = document.getElementById('name').value.trim();
        const email   = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        let valid = true;

        if (!name) {
            setError('nameError', 'name', t('contact.errors.nameRequired'));
            valid = false;
        } else if (name.length < 2) {
            setError('nameError', 'name', t('contact.errors.nameLength'));
            valid = false;
        }

        if (!email) {
            setError('emailError', 'email', t('contact.errors.emailRequired'));
            valid = false;
        } else if (!isValidEmail(email)) {
            setError('emailError', 'email', t('contact.errors.emailInvalid'));
            valid = false;
        }

        if (!subject) {
            setError('subjectError', 'subject', t('contact.errors.subjectRequired'));
            valid = false;
        }

        if (!message) {
            setError('messageError', 'message', t('contact.errors.messageRequired'));
            valid = false;
        } else if (message.length < 10) {
            setError('messageError', 'message', t('contact.errors.messageLength'));
            valid = false;
        }

        if (valid) submitForm();
    });

    // Clear individual field errors on input
    ['name', 'email', 'subject', 'message'].forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            const event = field.tagName === 'SELECT' ? 'change' : 'input';
            field.addEventListener(event, () => clearFieldError(fieldId + 'Error', fieldId));
        }
    });
}

/**
 * RFC-5322 inspired email validation (lightweight regex).
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

/**
 * Show an error message and mark a field as invalid.
 * @param {string} errorId  - ID of the <span> error element
 * @param {string} fieldId  - ID of the form field
 * @param {string} message  - Plain-text error message (not HTML)
 */
function setError(errorId, fieldId, message) {
    const errEl = document.getElementById(errorId);
    const field = document.getElementById(fieldId);
    if (errEl) errEl.textContent = message; // textContent prevents XSS
    if (field) field.classList.add('error');
}

/** Clear all form errors */
function clearAllErrors() {
    ['nameError', 'emailError', 'subjectError', 'messageError'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '';
    });
    ['name', 'email', 'subject', 'message'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('error');
    });
}

/**
 * Clear the error for a single field.
 * @param {string} errorId
 * @param {string} fieldId
 */
function clearFieldError(errorId, fieldId) {
    const errEl = document.getElementById(errorId);
    const field = document.getElementById(fieldId);
    if (errEl) errEl.textContent = '';
    if (field) field.classList.remove('error');
}

/**
 * Simulate form submission: show spinner, reset form, display success.
 * No data leaves the browser.
 */
function submitForm() {
    const submitBtn  = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');
    const form       = document.getElementById('contactForm');

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> ${escapeHTML(t('contact.form.sending'))}`;

    // Simulate a 1.5 s network delay
    setTimeout(() => {
        // Reset button
        submitBtn.disabled  = false;
        submitBtn.innerHTML = `<i class="fas fa-paper-plane" aria-hidden="true"></i> ${escapeHTML(t('contact.form.submit'))}`;

        // Clear form fields
        form.reset();
        clearAllErrors();

        // Show success banner
        formSuccess.style.display = 'flex';

        // Auto-hide after 7 seconds
        setTimeout(() => { formSuccess.style.display = 'none'; }, 7000);
    }, 1500);
}


/* ====================================================
   12. NEWSLETTER SUBSCRIPTION
   Validates the email address, shows inline feedback.
   Client-side only — no data is sent anywhere.
==================================================== */
function initNewsletter() {
    const btn   = document.getElementById('newsletterBtn');
    const input = document.getElementById('newsletterEmail');
    const msg   = document.getElementById('newsletterMsg');

    if (!btn || !input) return;

    btn.addEventListener('click', () => {
        const email = input.value.trim();

        if (!email) {
            showNewsletterMsg(t('footer.newsletterErrEmpty'), false);
            return;
        }

        if (!isValidEmail(email)) {
            showNewsletterMsg(t('footer.newsletterErrInvalid'), false);
            return;
        }

        // Simulate subscription
        btn.disabled     = true;
        btn.textContent  = t('footer.newsletterSending');

        setTimeout(() => {
            btn.disabled    = false;
            btn.textContent = t('footer.newsletterBtn');
            input.value     = '';
            showNewsletterMsg(t('footer.newsletterSuccess'), true);

            // Clear message after 5 s
            setTimeout(() => { if (msg) msg.textContent = ''; }, 5000);
        }, 800);
    });

    // Allow Enter key to trigger subscription
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') btn.click();
    });

    function showNewsletterMsg(text, isSuccess) {
        if (!msg) return;
        msg.textContent = text;
        msg.className   = 'newsletter-msg ' + (isSuccess ? 'success' : 'error');
    }
}
