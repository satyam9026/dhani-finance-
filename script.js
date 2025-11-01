    // Mobile Menu Toggle
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');

        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            // Close menu when a link is clicked
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update active nav link
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-menu a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Testimonials Slider
        const testimonialsWrapper = document.getElementById('testimonialsWrapper');
        const sliderDots = document.querySelectorAll('.slider-dot');
        
        // Add more testimonial cards (in a real scenario, this would come from a data source)
        const testimonials = [
            {
                initials: "PS",
                text: "I've been using Dhani Finance for my investment needs and the returns have been excellent. The platform is user-friendly and their customer support is outstanding.",
                author: "Priya Sharma",
                role: "Teacher"
            },
            {
                initials: "AK",
                text: "The insurance plans offered by Dhani Finance are comprehensive and affordable. They helped me choose the right plan for my family's needs.",
                author: "Amit Kumar",
                role: "Software Engineer"
            }
        ];
        
        // Add testimonial cards to the wrapper
        testimonials.forEach(testimonial => {
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card';
            testimonialCard.innerHTML = `
                <div class="testimonial-avatar">${testimonial.initials}</div>
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-author">${testimonial.author}</div>
                <div class="testimonial-role">${testimonial.role}</div>
            `;
            testimonialsWrapper.appendChild(testimonialCard);
        });
        
        // Slider functionality
        let currentTestimonial = 0;
        const totalTestimonials = testimonialsWrapper.children.length;
        
        function showTestimonial(index) {
            testimonialsWrapper.style.transform = `translateX(-${index * 100}%)`;
            
            // Update active dot
            sliderDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            currentTestimonial = index;
        }
        
        // Add click events to dots
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
        
        // Auto-advance testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            showTestimonial(currentTestimonial);
        }, 5000);

        // Contact Form Validation
        const contactForm = document.getElementById('contactForm');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const phone = document.getElementById('phone').value.trim();
                const subject = document.getElementById('subject').value.trim();
                const message = document.getElementById('message').value.trim();

                // Basic validation
                if (!name || !email || !phone || !subject || !message) {
                    alert('Please fill in all fields');
                    return;
                }

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address');
                    return;
                }

                // Phone validation (basic)
                const phoneRegex = /^[0-9]{10,}$/;
                if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
                    alert('Please enter a valid phone number');
                    return;
                }

                // If validation passes
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            });
        }