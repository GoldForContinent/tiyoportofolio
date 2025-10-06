  // Counter Animation for Stats
        let countersAnimated = false;

        function animateCounters() {
            if (countersAnimated) return;
            
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
            });
            
            countersAnimated = true;
        }

        // Trigger counter animation on page load
        window.addEventListener('load', () => {
            setTimeout(animateCounters, 500);
        });

        // Word drop animation for About section
        function animateWords() {
            const aboutText = document.getElementById('aboutText');
            const text = aboutText.textContent;
            const words = text.split(' ');
            
            aboutText.innerHTML = '';
            
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.className = 'word';
                span.textContent = word + ' ';
                span.style.animationDelay = `${index * 0.05}s`;
                aboutText.appendChild(span);
            });
        }

        // Observe about section for animation trigger
        const aboutSection = document.querySelector('.about');
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateWords();
                    // Trigger lanyard animation
                    document.getElementById('lanyardCard').classList.add('animated');
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        aboutObserver.observe(aboutSection);

        // Observe contact section for badge animation
        const contactSection = document.querySelector('.contact');
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.getElementById('contactBadge').classList.add('animated');
                    contactObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        contactObserver.observe(contactSection);

        // Event gallery data
        const eventGalleries = [
            {
                title: 'M&A Trends 2024 - J.P. Morgan',
                images: [
                    'Panel Discussion - Main Stage',
                    'Networking Reception',
                    'Q&A Session with Sarah Johnson',
                    'Event Certificate & Group Photo'
                ]
            },
            {
                title: 'Quantitative Trading Strategies - Goldman Sachs',
                images: [
                    'Workshop Session - Trading Floor',
                    'Algorithmic Trading Demo',
                    'Team Collaboration Exercise',
                    'Closing Remarks & Awards'
                ]
            },
            {
                title: 'Federal Reserve Policy & ESG Events',
                images: [
                    'Keynote Speaker Presentation',
                    'Interactive Policy Discussion',
                    'Networking with Industry Leaders',
                    'Event Venue & Attendees'
                ]
            }
        ];

        let currentSlide = 0;
        let slideInterval;
        let currentGallery = [];

        // Open event modal
        function openModal(eventIndex) {
            const modal = document.getElementById('eventModal');
            const gallery = eventGalleries[eventIndex];
            
            document.getElementById('modalTitle').textContent = gallery.title;
            currentGallery = gallery.images;
            currentSlide = 0;
            
            createSlideshow();
            modal.style.display = 'block';
            startSlideshow();
        }

        function closeModal() {
            const modal = document.getElementById('eventModal');
            modal.style.display = 'none';
            stopSlideshow();
        }

        function createSlideshow() {
            const container = document.getElementById('slideshowContainer');
            const navContainer = document.getElementById('slideNav');
            
            container.innerHTML = '';
            navContainer.innerHTML = '';
            
            currentGallery.forEach((image, index) => {
                const slide = document.createElement('div');
                slide.className = 'slide' + (index === 0 ? ' active' : '');
                slide.innerHTML = `
                    <div class="slide-media">
                        <div style="text-align: center;">
                            <div style="font-size: 3rem; margin-bottom: 1rem;"><i class="fas fa-camera"></i></div>
                            <div style="font-size: 1.2rem; color: #fff; margin-bottom: 0.5rem;">${image}</div>
                            <div style="font-size: 0.9rem; color: #888;">Photo ${index + 1} of ${currentGallery.length}</div>
                        </div>
                    </div>
                `;
                container.appendChild(slide);
                
                const dot = document.createElement('span');
                dot.className = 'dot' + (index === 0 ? ' active' : '');
                dot.onclick = () => goToSlide(index);
                navContainer.appendChild(dot);
            });
        }

        function goToSlide(n) {
            const slides = document.querySelectorAll('#slideshowContainer .slide');
            const dots = document.querySelectorAll('#slideNav .dot');
            
            if (slides.length === 0) return;
            
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = n;
            if (currentSlide >= slides.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = slides.length - 1;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextEventSlide() {
            const slides = document.querySelectorAll('#slideshowContainer .slide');
            if (slides.length === 0) return;
            goToSlide(currentSlide + 1);
        }

        function previousEventSlide() {
            const slides = document.querySelectorAll('#slideshowContainer .slide');
            if (slides.length === 0) return;
            goToSlide(currentSlide - 1);
        }

        function nextSlide() {
            nextEventSlide();
        }

        function startSlideshow() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function stopSlideshow() {
            clearInterval(slideInterval);
        }

        // Project Modal Data
        const projectsData = [
            {
                title: 'Quantitative Strategy: Pairs Trading on S&P 500',
                slides: [
                    {
                        type: 'details',
                        title: 'Project Overview',
                        content: `
                            <p><strong>Objective:</strong> Develop and backtest a pairs trading strategy to exploit mean-reversion opportunities in cointegrated stock pairs within the S&P 500.</p>
                            <p><strong>Duration:</strong> 3 months (Fall 2023)</p>
                            <p><strong>Team Size:</strong> Individual Project</p>
                            <h4 style="color: #ff6b00; margin-top: 2rem;">Methodology:</h4>
                            <ul>
                                <li>Conducted cointegration analysis using Johansen test on 100+ stock pairs</li>
                                <li>Implemented z-score based entry/exit signals with dynamic threshold adjustment</li>
                                <li>Built comprehensive backtesting framework with transaction cost modeling</li>
                                <li>Applied risk management through position sizing and stop-loss mechanisms</li>
                            </ul>
                        `
                    },
                    {
                        type: 'details',
                        title: 'Technical Implementation',
                        content: `
                            <p><strong>Technologies Used:</strong></p>
                            <ul>
                                <li>Python (NumPy, Pandas, Statsmodels) for data analysis</li>
                                <li>yfinance API for historical market data</li>
                                <li>Matplotlib and Seaborn for visualization</li>
                                <li>Jupyter Notebooks for documentation</li>
                            </ul>
                            <h4 style="color: #ff6b00; margin-top: 2rem;">Key Features:</h4>
                            <ul>
                                <li>Automated pair selection based on correlation and cointegration</li>
                                <li>Dynamic hedge ratio calculation using rolling regression</li>
                                <li>Real-time signal generation system</li>
                                <li>Portfolio-level risk metrics tracking</li>
                            </ul>
                        `
                    },
                    {
                        type: 'media',
                        title: 'Results & Performance'
                    },
                    {
                        type: 'media',
                        title: 'Code Repository'
                    }
                ]
            },
            {
                title: 'LBO Model for Tech Acquisition',
                slides: [
                    {
                        type: 'details',
                        title: 'Project Overview',
                        content: `
                            <p><strong>Objective:</strong> Build a comprehensive leveraged buyout model to evaluate acquisition feasibility for a hypothetical $500M SaaS company.</p>
                            <p><strong>Duration:</strong> 2 months (Spring 2024)</p>
                            <p><strong>Context:</strong> Advanced Corporate Finance Course Project</p>
                            <h4 style="color: #ff6b00; margin-top: 2rem;">Model Components:</h4>
                            <ul>
                                <li>Historical financial statement analysis (3 years)</li>
                                <li>5-year revenue and EBITDA projections with multiple scenarios</li>
                                <li>Detailed debt schedule with multiple tranches</li>
                                <li>Complete sources and uses of funds</li>
                                <li>Exit analysis with sensitivity tables</li>
                            </ul>
                        `
                    },
                    {
                        type: 'details',
                        title: 'Financial Assumptions & Analysis',
                        content: `
                            <p><strong>Key Assumptions:</strong></p>
                            <ul>
                                <li>Revenue CAGR: 15% (Base Case), 12-18% (Scenarios)</li>
                                <li>EBITDA Margin Expansion: 25% to 30% over 5 years</li>
                                <li>Debt Structure: 60% leverage with 4.5x Senior Debt, 2x Subordinated</li>
                                <li>Exit Multiple: 12x EBITDA (comparable transactions analysis)</li>
                            </ul>
                            <h4 style="color: #ff6b00; margin-top: 2rem;">Valuation Results:</h4>
                            <ul>
                                <li>Base Case IRR: 25.3%</li>
                                <li>Upside Case IRR: 32.1%</li>
                                <li>Downside Case IRR: 18.7%</li>
                                <li>Money-on-Money Multiple: 3.2x (Base Case)</li>
                            </ul>
                        `
                    },
                    {
                        type: 'media',
                        title: 'Model Screenshots'
                    },
                    {
                        type: 'media',
                        title: 'Presentation Deck'
                    }
                ]
            },
            {
                title: 'Portfolio Risk Analytics Dashboard',
                slides: [
                    {
                        type: 'details',
                        title: 'Project Overview',
                        content: `
                            <p><strong>Objective:</strong> Develop an interactive risk analytics platform for real-time portfolio monitoring and stress testing.</p>
                            <p><strong>Duration:</strong> 2.5 months (Winter 2024)</p>
                            <p><strong>Stakeholder:</strong> Tufts University Investment Club</p>
                            <h4 style="color: #ff6b00; margin-top: 2rem;">Dashboard Features:</h4>
                            <ul>
                                <li>Real-time portfolio composition and performance tracking</li>
                                <li>Value-at-Risk (VaR) calculation using multiple methodologies</li>
                                <li>Monte Carlo simulation for tail risk analysis</li>
                                <li>Correlation matrices and factor exposure analysis</li>
                                <li>Historical stress testing against market crises</li>
                            </ul>
                        `
                    },
                    {
                        type: 'details',
                        title: 'Technical Stack & Methodology',
                        content: `
                            <p><strong>Technologies:</strong></p>
                            <ul>
                                <li>Python backend with pandas and NumPy for calculations</li>
                                <li>Tableau for interactive visualization</li>
                                <li>Bloomberg API for live market data</li>
                                <li>PostgreSQL for historical data storage</li>
                            </ul>
                            <h4 style="color: #ff6b00; margin-top: 2rem;">Risk Metrics Implemented:</h4>
                            <ul>
                                <li>95% and 99% VaR (Historical, Parametric, Monte Carlo)</li>
                                <li>Expected Shortfall (CVaR)</li>
                                <li>Maximum Drawdown Analysis</li>
                                <li>Sharpe Ratio, Sortino Ratio, Information Ratio</li>
                                <li>Beta and Factor Exposures</li>
                            </ul>
                        `
                    },
                    {
                        type: 'media',
                        title: 'Dashboard Demo'
                    },
                    {
                        type: 'media',
                        title: 'Documentation'
                    }
                ]
            }
        ];

        let currentProjectSlide = 0;
        let currentProjectData = null;

        function openProjectModal(projectIndex) {
            const modal = document.getElementById('projectModal');
            currentProjectData = projectsData[projectIndex];
            currentProjectSlide = 0;
            
            document.getElementById('projectModalTitle').textContent = currentProjectData.title;
            createProjectSlideshow();
            modal.style.display = 'block';
        }

        function closeProjectModal() {
            document.getElementById('projectModal').style.display = 'none';
        }

        function createProjectSlideshow() {
            const container = document.getElementById('projectSlideshow');
            const navContainer = document.getElementById('projectNav');
            
            // Remove existing slides but keep arrows
            const existingSlides = container.querySelectorAll('.modal-slide');
            existingSlides.forEach(slide => slide.remove());
            
            navContainer.innerHTML = '';
            
            currentProjectData.slides.forEach((slide, index) => {
                const slideDiv = document.createElement('div');
                slideDiv.className = 'modal-slide' + (index === 0 ? ' active' : '');
                
                if (slide.type === 'details') {
                    slideDiv.innerHTML = `
                        <div class="modal-slide-content">
                            <h3>${slide.title}</h3>
                            ${slide.content}
                        </div>
                    `;
                } else {
                    slideDiv.innerHTML = `
                        <div class="modal-slide-content">
                            <h3>${slide.title}</h3>
                            <div class="slide-media">
                                <div style="text-align: center;">
                                    <div style="font-size: 3rem; margin-bottom: 1rem;"><i class="fas fa-image"></i></div>
                                    <div style="font-size: 1.2rem; color: #fff;">${slide.title}</div>
                                    <div style="font-size: 0.9rem; color: #888; margin-top: 0.5rem;">Media content placeholder</div>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                container.appendChild(slideDiv);
                
                const dot = document.createElement('span');
                dot.className = 'modal-dot' + (index === 0 ? ' active' : '');
                dot.onclick = () => goToProjectSlide(index);
                navContainer.appendChild(dot);
            });
            
            updateSlideCounter();
        }

        function updateSlideCounter() {
            const counter = document.getElementById('slideCounter');
            const totalSlides = currentProjectData.slides.length;
            counter.textContent = `Slide ${currentProjectSlide + 1} of ${totalSlides}`;
        }

        function goToProjectSlide(n) {
            const slides = document.querySelectorAll('#projectSlideshow .modal-slide');
            const dots = document.querySelectorAll('#projectNav .modal-dot');
            
            slides[currentProjectSlide].classList.remove('active');
            dots[currentProjectSlide].classList.remove('active');
            
            currentProjectSlide = n;
            if (currentProjectSlide >= slides.length) currentProjectSlide = 0;
            if (currentProjectSlide < 0) currentProjectSlide = slides.length - 1;
            
            slides[currentProjectSlide].classList.add('active');
            dots[currentProjectSlide].classList.add('active');
            
            updateSlideCounter();
        }

        function nextProjectSlide() {
            goToProjectSlide(currentProjectSlide + 1);
        }

        function previousProjectSlide() {
            goToProjectSlide(currentProjectSlide - 1);
        }

        // Keyboard navigation for event and certification modals
        document.addEventListener('keydown', function(e) {
            const projectModal = document.getElementById('projectModal');
            const eventModal = document.getElementById('eventModal');
            
            if (projectModal.style.display === 'block') {
                if (e.key === 'ArrowRight') {
                    nextProjectSlide();
                } else if (e.key === 'ArrowLeft') {
                    previousProjectSlide();
                } else if (e.key === 'Escape') {
                    closeProjectModal();
                }
            }
            
            if (eventModal.style.display === 'block') {
                if (e.key === 'ArrowRight') {
                    nextEventSlide();
                } else if (e.key === 'ArrowLeft') {
                    previousEventSlide();
                } else if (e.key === 'Escape') {
                    closeModal();
                }
            }
        });

        // Certifications functionality
        let currentCert = 0;
        let certInterval;

        function setCertification(n) {
            const slides = document.querySelectorAll('.cert-slide');
            const dots = document.querySelectorAll('.cert-dot');
            
            slides[currentCert].classList.remove('active');
            dots[currentCert].classList.remove('active');
            
            currentCert = n;
            if (currentCert >= slides.length) currentCert = 0;
            if (currentCert < 0) currentCert = slides.length - 1;
            
            slides[currentCert].classList.add('active');
            dots[currentCert].classList.add('active');
            
            clearInterval(certInterval);
            startCertRotation();
        }

        function nextCertSlide() {
            let next = currentCert + 1;
            if (next >= document.querySelectorAll('.cert-slide').length) {
                next = 0;
            }
            setCertification(next);
        }

        function previousCert() {
            let prev = currentCert - 1;
            if (prev < 0) {
                prev = document.querySelectorAll('.cert-slide').length - 1;
            }
            setCertification(prev);
        }

        function nextCert() {
            nextCertSlide();
        }

        function startCertRotation() {
            certInterval = setInterval(nextCert, 5000);
        }

        // Observe certifications section
        const certSection = document.querySelector('.certifications');
        const certObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCertRotation();
                    certObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        certObserver.observe(certSection);

        // Testimonials functionality
        let currentTestimonial = 0;
        let testimonialInterval;

        function animateTestimonialWords(testimonialIndex) {
            const slides = document.querySelectorAll('.testimonial-slide');
            const textElement = slides[testimonialIndex].querySelector('.testimonial-text');
            const text = textElement.textContent.trim();
            const words = text.split(' ');
            
            textElement.innerHTML = '';
            textElement.classList.remove('animate');
            
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.className = 'word';
                span.textContent = word + ' ';
                span.style.animationDelay = `${index * 0.03}s`;
                textElement.appendChild(span);
            });
            
            setTimeout(() => {
                textElement.classList.add('animate');
            }, 50);
        }

        function setTestimonial(n) {
            const slides = document.querySelectorAll('.testimonial-slide');
            const dots = document.querySelectorAll('.testimonial-dot');
            
            slides[currentTestimonial].classList.remove('active');
            dots[currentTestimonial].classList.remove('active');
            
            currentTestimonial = n;
            
            slides[currentTestimonial].classList.add('active');
            dots[currentTestimonial].classList.add('active');
            
            animateTestimonialWords(currentTestimonial);
            
            clearInterval(testimonialInterval);
            startTestimonialRotation();
        }

        function nextTestimonial() {
            let next = currentTestimonial + 1;
            if (next >= document.querySelectorAll('.testimonial-slide').length) {
                next = 0;
            }
            setTestimonial(next);
        }

        function startTestimonialRotation() {
            testimonialInterval = setInterval(nextTestimonial, 5000);
        }

        // Observe testimonials section
        const testimonialsSection = document.querySelector('.testimonials');
        const testimonialsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateTestimonialWords(0);
                    startTestimonialRotation();
                    testimonialsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        testimonialsObserver.observe(testimonialsSection);

        // Floating navigation
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Update active state
            document.querySelectorAll('.float-nav-btn').forEach(btn => btn.classList.remove('active'));
            event.currentTarget.classList.add('active');
        }

        // Floating navigation - show only near end of page
        function checkFloatingNav() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercentage = (scrollTop + windowHeight) / documentHeight;
            
            const floatingNav = document.querySelector('.floating-nav');
            
            // Show when user has scrolled 70% of the page
            if (scrollPercentage > 0.7) {
                floatingNav.classList.add('visible');
            } else {
                floatingNav.classList.remove('visible');
            }
        }

        // Update active floating nav button on scroll
        window.addEventListener('scroll', () => {
            checkFloatingNav();
            
            const sections = ['home', 'about', 'projects', 'seminars', 'contact'];
            const floatBtns = document.querySelectorAll('.float-nav-btn');
            
            let current = '';
            sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = sectionId;
                }
            });
            
            floatBtns.forEach((btn, index) => {
                btn.classList.remove('active');
                if (sections[index] === current) {
                    btn.classList.add('active');
                }
            });
        });

        // Close modals when clicking outside
        window.onclick = function(event) {
            const eventModal = document.getElementById('eventModal');
            const projectModal = document.getElementById('projectModal');
            if (event.target === eventModal) {
                closeModal();
            }
            if (event.target === projectModal) {
                closeProjectModal();
            }
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission handler
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });

        // Add scroll effect to navigation
        const nav = document.querySelector('nav');
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll <= 0) {
                nav.style.boxShadow = 'none';
            } else {
                nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
            }
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
