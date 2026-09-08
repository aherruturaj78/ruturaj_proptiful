/* ==========================================================================
   Ruturaj Aher - Portfolio JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initTypingEffect();
    initStatsCounter();
    initSkillFilters();
    initScrollAnimations();
    initBackToTop();
    initQuizSimulator();
});

/* --- THEME TOGGLE (DARK / LIGHT) --- */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('ruturaj_portfolio_theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('ruturaj_portfolio_theme', newTheme);
        
        showToast(`Switched to ${newTheme.toUpperCase()} mode`, 'info');
    });
}

/* --- NAVBAR & MOBILE MENU --- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting on scroll
        let currentSection = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Hamburger Menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

/* --- DYNAMIC TYPING EFFECT --- */
function initTypingEffect() {
    const typingTextElement = document.getElementById('typing-text');
    const phrases = [
        "Computer Science Graduate",
        "Full-Stack Python Developer",
        "Web Tech & MySQL Engineer",
        "Data Science & AI Explorer"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pause at end of phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before new phrase
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* --- STATS COUNTER ANIMATION --- */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNumbers.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 1500; // ms
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                });
            }
        });
    }, { threshold: 0.5 });

    const statsBar = document.querySelector('.stats-bar-container');
    if (statsBar) observer.observe(statsBar);
}

/* --- SKILL CATEGORY FILTERS --- */
function initSkillFilters() {
    const tabs = document.querySelectorAll('.skill-tab');
    const cards = document.querySelectorAll('.skill-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            cards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* --- SCROLL ANIMATIONS --- */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-card, .pillar-card, .soft-card, .timeline-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/* --- BACK TO TOP BUTTON --- */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* --- MODAL FUNCTIONS --- */
function openResumeModal() {
    document.getElementById('resume-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeResumeModal() {
    document.getElementById('resume-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openDemoModal() {
    document.getElementById('demo-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
    resetQuiz();
}

function closeDemoModal() {
    document.getElementById('demo-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openArchitectureModal() {
    document.getElementById('arch-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeArchitectureModal() {
    document.getElementById('arch-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modals when clicking outside container
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

/* --- INTERACTIVE EDUQUIZ SIMULATOR ENGINE --- */
const quizQuestions = [
    {
        question: "Which data structure operates on a First-In-First-Out (FIFO) principle?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        correct: 1,
        explanation: "Queue is a linear structure following FIFO order where insertion happens at rear and deletion at front."
    },
    {
        question: "Which SQL clause is used to filter rows after aggregation with GROUP BY?",
        options: ["WHERE", "ORDER BY", "HAVING", "LIMIT"],
        correct: 2,
        explanation: "HAVING is used to filter aggregate records, whereas WHERE filters individual rows before grouping."
    },
    {
        question: "What is the primary function of Python's Pandas library?",
        options: ["Web Server Creation", "Data Analysis & Manipulation", "3D Rendering", "Network Socket Listener"],
        correct: 1,
        explanation: "Pandas provides high-performance DataFrames for data cleaning, transformation, and tabular analysis."
    },
    {
        question: "In Python, which built-in data structure is immutable?",
        options: ["List", "Dictionary", "Tuple", "Set"],
        correct: 2,
        explanation: "Tuples are immutable sequences in Python; their elements cannot be modified once created."
    },
    {
        question: "What does HTML stand for in modern web development?",
        options: ["HyperText Markup Language", "HighTechnical Machine Language", "Hyperlink Textual Modular Logic", "Host Text Management Layer"],
        correct: 0,
        explanation: "HTML (HyperText Markup Language) is the standard markup language for creating structured web pages."
    }
];

let currentQIndex = 0;
let userScore = 0;
let selectedOption = null;

function initQuizSimulator() {
    renderQuestion();
}

function renderQuestion() {
    const qBody = document.getElementById('quiz-q-body');
    const qCounter = document.getElementById('q-counter');
    const progress = document.getElementById('quiz-progress');
    const currentQ = quizQuestions[currentQIndex];

    qCounter.textContent = `Question ${currentQIndex + 1} of ${quizQuestions.length}`;
    progress.style.width = `${((currentQIndex + 1) / quizQuestions.length) * 100}%`;

    let optionsHtml = '';
    currentQ.options.forEach((opt, idx) => {
        optionsHtml += `
            <button class="option-btn" onclick="selectOption(${idx})">
                <strong>${String.fromCharCode(65 + idx)})</strong> ${opt}
            </button>
        `;
    });

    qBody.innerHTML = `
        <h3 class="q-title">${currentQIndex + 1}. ${currentQ.question}</h3>
        <div class="q-options-grid">${optionsHtml}</div>
        <div id="explanation-box" style="display: none; padding: 1rem; background: rgba(56,189,248,0.1); border: 1px solid var(--primary); border-radius: 12px; margin-top: 1rem; font-size: 0.9rem;"></div>
    `;

    selectedOption = null;
}

function selectOption(index) {
    if (selectedOption !== null) return; // Prevent changing after select
    selectedOption = index;

    const currentQ = quizQuestions[currentQIndex];
    const optionBtns = document.querySelectorAll('.option-btn');
    const expBox = document.getElementById('explanation-box');

    if (index === currentQ.correct) {
        optionBtns[index].classList.add('correct');
        userScore++;
        expBox.innerHTML = `<strong><i class="fa-solid fa-circle-check"></i> Correct!</strong> ${currentQ.explanation}`;
        expBox.style.color = "var(--accent-emerald)";
    } else {
        optionBtns[index].classList.add('incorrect');
        optionBtns[currentQ.correct].classList.add('correct');
        expBox.innerHTML = `<strong><i class="fa-solid fa-circle-xmark"></i> Incorrect.</strong> ${currentQ.explanation}`;
        expBox.style.color = "#ef4444";
    }

    expBox.style.display = 'block';
}

function nextQuestion() {
    if (selectedOption === null) {
        showToast("Please select an answer before proceeding!", "warning");
        return;
    }

    currentQIndex++;
    if (currentQIndex < quizQuestions.length) {
        renderQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    const qBody = document.getElementById('quiz-q-body');
    const nextBtn = document.getElementById('next-q-btn');

    nextBtn.style.display = 'none';

    const percentage = Math.round((userScore / quizQuestions.length) * 100);

    qBody.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem;">
            <div style="font-size: 4rem; color: var(--primary); margin-bottom: 1rem;">
                <i class="fa-solid fa-trophy"></i>
            </div>
            <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">Assessment Completed!</h2>
            <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 1.5rem;">
                Your EduQuiz Score: <strong>${userScore} / ${quizQuestions.length}</strong> (${percentage}%)
            </p>
            <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 12px; max-width: 400px; margin: 0 auto 2rem auto;">
                <span style="font-weight: 600; color: ${percentage >= 80 ? 'var(--accent-emerald)' : 'var(--primary)'};">
                    ${percentage >= 80 ? '🌟 Outstanding Technical Performance!' : '👍 Solid Foundation & Knowledge!'}
                </span>
            </div>
            <button class="btn btn-primary" onclick="resetQuiz()">
                <i class="fa-solid fa-rotate-right"></i> Try Again
            </button>
        </div>
    `;
}

function resetQuiz() {
    currentQIndex = 0;
    userScore = 0;
    selectedOption = null;
    const nextBtn = document.getElementById('next-q-btn');
    if (nextBtn) nextBtn.style.display = 'inline-flex';
    renderQuestion();
}

/* --- FORM SUBMISSION & TOAST NOTIFICATION --- */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('sender-name').value;
    const submitBtn = document.getElementById('submit-btn');

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...';

    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        
        document.getElementById('contact-form').reset();
        showToast(`Thank you ${name}! Your message has been sent to Ruturaj.`, 'success');
    }, 1200);
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'fa-circle-check';
    if (type === 'warning') icon = 'fa-triangle-exclamation';
    if (type === 'info') icon = 'fa-circle-info';

    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
