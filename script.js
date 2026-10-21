/**
 * DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING — JECRC INSTITUTE OF TECHNOLOGY
 * Vanilla JavaScript Functionality & Interactions (script.js)
 * 
 * Features:
 * 1. Mobile Navigation Hamburger Menu
 * 2. Sticky Header & Active Nav Link Observer
 * 3. Gallery Category Filtering
 * 4. HTML5 <dialog> Image Lightbox Modal
 * 5. Course Syllabus Details Modal
 * 6. Contact Form Validation & Real-time Feedback
 * 7. Smooth Accessibility & Focus Management
 */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------------
  // 1. MOBILE NAVIGATION TOGGLE
  // -------------------------------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNavigation');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navToggle.classList.toggle('open');
      primaryNav.classList.toggle('open');
    });

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (primaryNav.classList.contains('open')) {
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.classList.remove('open');
          primaryNav.classList.remove('open');
        }
      });
    });

    // Close menu if clicked outside
    document.addEventListener('click', (e) => {
      if (primaryNav.classList.contains('open') && 
          !primaryNav.contains(e.target) && 
          !navToggle.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('open');
        primaryNav.classList.remove('open');
      }
    });
  }

  // -------------------------------------------------------------------
  // 2. STICKY HEADER & ACTIVE NAVIGATION LINK HIGHLIGHTING
  // -------------------------------------------------------------------
  const siteHeader = document.getElementById('siteHeader');
  const sections = document.querySelectorAll('main section[id]');

  const handleScroll = () => {
    // Header shadow on scroll
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // Active link highlighting via scroll position
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // -------------------------------------------------------------------
  // 3. IMAGE GALLERY FILTERING
  // -------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active filter button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.3s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // -------------------------------------------------------------------
  // 4. HTML5 <dialog> IMAGE GALLERY LIGHTBOX
  // -------------------------------------------------------------------
  const galleryModal = document.getElementById('galleryModal');
  const closeGalleryModal = document.getElementById('closeGalleryModal');
  const modalImage = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');

  // Descriptions for each gallery image
  const galleryMetadata = {
    'labs': {
      title: 'High-Performance AI Laboratory',
      category: 'Computer Labs',
      desc: 'Equipped with dedicated NVIDIA Tensor-Core workstations, distributed Linux server clusters, and Gigabit switches supporting large-scale deep learning training.'
    },
    'hackathons': {
      title: 'CodeStorm 24-Hour Hackathon',
      category: 'Hackathons & Coding',
      desc: 'Our flagship overnight coding competition where over 250 students collaborate to engineer AI prototypes, web applications, and smart city hardware solutions.'
    },
    'workshops': {
      title: 'Cloud Infrastructure & DevOps Workshop',
      category: 'Workshops',
      desc: 'Hands-on practical session led by certified industry mentors covering Docker containerization, Kubernetes clusters, and automated CI/CD deployment pipelines.'
    },
    'robotics': {
      title: 'IoT & Smart Robotics Prototyping',
      category: 'Student Projects',
      desc: 'Demonstration of autonomous wheeled robots, micro-sensor telemetry, and edge-computing microcontrollers fabricated in the department innovation incubator.'
    },
    'projects': {
      title: 'Capstone Innovation Expo',
      category: 'Student Projects',
      desc: 'Annual evaluation day where graduating senior students present production-ready software systems, mobile applications, and research prototypes to industry evaluators.'
    },
    'campus': {
      title: 'Tech Commons & Digital Library',
      category: 'Campus Life',
      desc: 'A quiet, collaborative academic space featuring high-speed digital research terminals, IEEE/ACM journals archive, and comfortable group brainstorming pods.'
    }
  };

  if (galleryModal) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('.gallery-thumb');
        const categoryKey = item.getAttribute('data-category');
        const captionText = item.querySelector('.gallery-caption strong').textContent;
        const tagText = item.querySelector('.gallery-tag').textContent;

        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalCaption.textContent = captionText;
        modalCategory.textContent = tagText;

        const info = galleryMetadata[categoryKey] || { desc: 'Department of Computer Science & Engineering, JECRC.' };
        modalDesc.textContent = info.desc;

        galleryModal.showModal();
      });
    });

    closeGalleryModal.addEventListener('click', () => {
      galleryModal.close();
    });

    // Close when clicking dialog backdrop
    galleryModal.addEventListener('click', (e) => {
      const dialogRect = galleryModal.getBoundingClientRect();
      const isInDialog = (
        e.clientX >= dialogRect.left &&
        e.clientX <= dialogRect.right &&
        e.clientY >= dialogRect.top &&
        e.clientY <= dialogRect.bottom
      );
      if (!isInDialog) {
        galleryModal.close();
      }
    });
  }

  // -------------------------------------------------------------------
  // 5. COURSE SYLLABUS & LEARN MORE MODAL
  // -------------------------------------------------------------------
  const courseModal = document.getElementById('courseModal');
  const closeCourseModal = document.getElementById('closeCourseModal');
  const closeCourseModalBtn = document.getElementById('closeCourseModalBtn');
  const courseModalTitle = document.getElementById('courseModalTitle');
  const courseModalBadge = document.getElementById('courseModalBadge');
  const courseModalBody = document.getElementById('courseModalBody');
  const courseInquireBtn = document.getElementById('courseInquireBtn');
  const courseSelect = document.getElementById('courseSelect');

  const courseDetailsData = {
    'btech-cse': {
      title: 'B.Tech in Computer Science & Engineering',
      badge: '4-Year Undergraduate Program',
      selectValue: 'btech-cse',
      html: `
        <p><strong>Program Overview:</strong> The Bachelor of Technology in CSE is our flagship program providing comprehensive training in computer science theory and contemporary software engineering.</p>
        <h5>Semester Syllabus Highlights:</h5>
        <ul>
          <li><strong>Sem 1 & 2:</strong> Problem Solving via C/Python, Discrete Mathematics, Digital Electronics, Linux Lab.</li>
          <li><strong>Sem 3 & 4:</strong> Data Structures & Algorithms, Computer Architecture, OOP with Java/C++, Database Systems (SQL/NoSQL).</li>
          <li><strong>Sem 5 & 6:</strong> Operating Systems, Computer Networks, Theory of Computation, Compiler Design, Software Engineering.</li>
          <li><strong>Sem 7 & 8:</strong> Cloud Computing, Information Security, Capstone Project Phase I & II, Industry Internship.</li>
        </ul>
        <h5>Key Industry Accreditations & Facilities:</h5>
        <p>Taught in state-of-the-art laboratories with certified curriculum modules from AWS Academy and Oracle University.</p>
      `
    },
    'btech-aiml': {
      title: 'B.Tech in Artificial Intelligence & Machine Learning',
      badge: '4-Year Specialized Degree',
      selectValue: 'btech-aiml',
      html: `
        <p><strong>Program Overview:</strong> Tailored for candidates aspiring to lead the revolution in neural computing, cognitive models, generative AI, and intelligent agent systems.</p>
        <h5>Semester Syllabus Highlights:</h5>
        <ul>
          <li><strong>Sem 1 & 2:</strong> Applied Linear Algebra, Calculus for ML, Python for Scientific Computing.</li>
          <li><strong>Sem 3 & 4:</strong> Probability & Statistics, Advanced Data Structures, Supervised & Unsupervised Machine Learning.</li>
          <li><strong>Sem 5 & 6:</strong> Deep Neural Networks (PyTorch/TensorFlow), Computer Vision, Natural Language Processing.</li>
          <li><strong>Sem 7 & 8:</strong> Reinforcement Learning, Generative AI & LLMs, Ethics in AI, Capstone Research Thesis.</li>
        </ul>
        <h5>Key Facilities:</h5>
        <p>Access to our dedicated High-Performance NVIDIA GPU Computing Cluster for model training and scientific simulations.</p>
      `
    },
    'btech-ds': {
      title: 'B.Tech in Data Science',
      badge: '4-Year Analytics Degree',
      selectValue: 'btech-ds',
      html: `
        <p><strong>Program Overview:</strong> Combines computational statistics, massive parallel computing, data warehousing, predictive modeling, and strategic business intelligence.</p>
        <h5>Semester Syllabus Highlights:</h5>
        <ul>
          <li><strong>Sem 1 & 2:</strong> Foundations of Computational Thinking, Statistical Foundations, Python & R Programming.</li>
          <li><strong>Sem 3 & 4:</strong> Relational and NoSQL Databases, Exploratory Data Analysis, Data Wrangling at Scale.</li>
          <li><strong>Sem 5 & 6:</strong> Big Data Engineering (Apache Hadoop, Spark), Data Visualization (Tableau/D3.js), Time Series Modeling.</li>
          <li><strong>Sem 7 & 8:</strong> Cloud Data Pipelines, High-Dimensional Analytics, Industrial Capstone Project.</li>
        </ul>
        <h5>Career Trajectory:</h5>
        <p>Prepares students for high-demand roles as Data Scientists, Quantitative Analysts, and Big Data Architects.</p>
      `
    },
    'diploma-web': {
      title: 'Diploma in Full Stack Web Development',
      badge: '1-Year Professional Certificate',
      selectValue: 'diploma-web',
      html: `
        <p><strong>Program Overview:</strong> Fast-track professional certification designed to turn candidates into job-ready full-stack software engineers using modern industry tooling.</p>
        <h5>Module Syllabus Highlights:</h5>
        <ul>
          <li><strong>Module 1:</strong> Advanced HTML5 Semantics, CSS3 Flexbox/Grid, Responsive Web Design & Web Accessibility (WCAG).</li>
          <li><strong>Module 2:</strong> Modern ECMAScript (ES6+), DOM Manipulation, Asynchronous JS, Fetch APIs.</li>
          <li><strong>Module 3:</strong> Backend Engineering with Node.js, Express, RESTful APIs, JWT Authentication, and PostgreSQL/MongoDB.</li>
          <li><strong>Module 4:</strong> Web Performance Optimization, Git Workflows, Docker Basics, and Cloud Deployment on AWS/Vercel.</li>
        </ul>
        <h5>Industry Exposure:</h5>
        <p>Includes building 4 live production web projects for portfolio presentation during recruitment drives.</p>
      `
    }
  };

  const courseButtons = document.querySelectorAll('.course-modal-btn');

  if (courseModal) {
    courseButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const courseKey = btn.getAttribute('data-course');
        const course = courseDetailsData[courseKey];
        if (course) {
          courseModalTitle.textContent = course.title;
          courseModalBadge.textContent = course.badge;
          courseModalBody.innerHTML = course.html;

          courseInquireBtn.onclick = () => {
            courseModal.close();
            if (courseSelect) {
              courseSelect.value = course.selectValue;
            }
          };

          courseModal.showModal();
        }
      });
    });

    const closeCourse = () => courseModal.close();
    closeCourseModal.addEventListener('click', closeCourse);
    closeCourseModalBtn.addEventListener('click', closeCourse);

    courseModal.addEventListener('click', (e) => {
      const dialogRect = courseModal.getBoundingClientRect();
      const isInDialog = (
        e.clientX >= dialogRect.left &&
        e.clientX <= dialogRect.right &&
        e.clientY >= dialogRect.top &&
        e.clientY <= dialogRect.bottom
      );
      if (!isInDialog) {
        courseModal.close();
      }
    });
  }

  // -------------------------------------------------------------------
  // 6. CONTACT FORM VALIDATION & HANDLING
  // -------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');
  const successSummaryText = document.getElementById('successSummaryText');
  const charCounter = document.getElementById('charCounter');
  const messageText = document.getElementById('messageText');

  // Real-time character counter for textarea
  if (messageText && charCounter) {
    messageText.addEventListener('input', () => {
      const length = messageText.value.length;
      charCounter.textContent = `${length} / 600 characters`;
      if (length >= 580) {
        charCounter.style.color = 'var(--color-danger)';
      } else {
        charCounter.style.color = 'var(--text-subtle)';
      }
    });
  }

  // Helper to display error message
  const setFieldError = (inputElement, errorElementId, message) => {
    inputElement.classList.add('input-error');
    const errEl = document.getElementById(errorElementId);
    if (errEl) {
      errEl.textContent = message;
    }
  };

  // Helper to clear error message
  const clearFieldError = (inputElement, errorElementId) => {
    inputElement.classList.remove('input-error');
    const errEl = document.getElementById(errorElementId);
    if (errEl) {
      errEl.textContent = '';
    }
  };

  if (contactForm) {
    // Form Input Validation on change/blur
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('emailAddress');
    const phoneInput = document.getElementById('phoneNumber');
    const courseInput = document.getElementById('courseSelect');
    const subjectInput = document.getElementById('subjectInput');
    const agreeTermsInput = document.getElementById('agreeTerms');

    fullNameInput.addEventListener('input', () => {
      if (fullNameInput.value.trim().length >= 3) {
        clearFieldError(fullNameInput, 'nameError');
      }
    });

    emailInput.addEventListener('input', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(emailInput.value.trim())) {
        clearFieldError(emailInput, 'emailError');
      }
    });

    phoneInput.addEventListener('input', () => {
      const phoneDigits = phoneInput.value.replace(/\D/g, '');
      phoneInput.value = phoneDigits; // enforce digits only
      if (phoneDigits.length === 10) {
        clearFieldError(phoneInput, 'phoneError');
      }
    });

    courseInput.addEventListener('change', () => {
      if (courseInput.value !== '') {
        clearFieldError(courseInput, 'courseError');
      }
    });

    subjectInput.addEventListener('input', () => {
      if (subjectInput.value.trim().length >= 5) {
        clearFieldError(subjectInput, 'subjectError');
      }
    });

    messageText.addEventListener('input', () => {
      if (messageText.value.trim().length >= 10) {
        clearFieldError(messageText, 'messageError');
      }
    });

    agreeTermsInput.addEventListener('change', () => {
      if (agreeTermsInput.checked) {
        clearFieldError(agreeTermsInput, 'termsError');
      }
    });

    // Form submission validation
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // 1. Validate Full Name
      const nameVal = fullNameInput.value.trim();
      if (!nameVal || nameVal.length < 3) {
        setFieldError(fullNameInput, 'nameError', 'Please enter your full name (at least 3 characters).');
        isValid = false;
      } else {
        clearFieldError(fullNameInput, 'nameError');
      }

      // 2. Validate Email
      const emailVal = emailInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailPattern.test(emailVal)) {
        setFieldError(emailInput, 'emailError', 'Please provide a valid email address (e.g. name@domain.com).');
        isValid = false;
      } else {
        clearFieldError(emailInput, 'emailError');
      }

      // 3. Validate Phone Number
      const phoneVal = phoneInput.value.trim();
      if (!phoneVal || phoneVal.length !== 10) {
        setFieldError(phoneInput, 'phoneError', 'Please enter a valid 10-digit mobile number.');
        isValid = false;
      } else {
        clearFieldError(phoneInput, 'phoneError');
      }

      // 4. Validate Course Selection
      if (!courseInput.value) {
        setFieldError(courseInput, 'courseError', 'Please select a program of interest from the dropdown.');
        isValid = false;
      } else {
        clearFieldError(courseInput, 'courseError');
      }

      // 5. Validate Subject
      const subjVal = subjectInput.value.trim();
      if (!subjVal || subjVal.length < 5) {
        setFieldError(subjectInput, 'subjectError', 'Please provide an inquiry subject (minimum 5 characters).');
        isValid = false;
      } else {
        clearFieldError(subjectInput, 'subjectError');
      }

      // 6. Validate Message
      const msgVal = messageText.value.trim();
      if (!msgVal || msgVal.length < 10) {
        setFieldError(messageText, 'messageError', 'Please elaborate on your query (minimum 10 characters).');
        isValid = false;
      } else {
        clearFieldError(messageText, 'messageError');
      }

      // 7. Validate Terms Checkbox
      if (!agreeTermsInput.checked) {
        setFieldError(agreeTermsInput, 'termsError', 'You must consent to receive academic notifications to proceed.');
        isValid = false;
      } else {
        clearFieldError(agreeTermsInput, 'termsError');
      }

      // If valid, show success alert
      if (isValid) {
        const preferredMethod = document.querySelector('input[name="contactMethod"]:checked')?.value || 'email';
        const courseName = courseInput.options[courseInput.selectedIndex].text;

        successSummaryText.innerHTML = `
          Thank you, <strong>${escapeHTML(nameVal)}</strong>! Your inquiry regarding <strong>${escapeHTML(courseName)}</strong> has been registered with reference ID <strong>#JECRC-CSE-${Math.floor(1000 + Math.random() * 9000)}</strong>. 
          Our department coordinator will reach out to you via <strong>${preferredMethod.toUpperCase()}</strong> shortly.
        `;

        formSuccessAlert.style.display = 'flex';
        formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Reset form controls
        contactForm.reset();
        charCounter.textContent = '0 / 600 characters';
      }
    });

    // Reset button handler
    contactForm.addEventListener('reset', () => {
      const inputs = contactForm.querySelectorAll('.form-control, .form-select, .form-textarea');
      inputs.forEach(input => input.classList.remove('input-error'));
      const errorSpans = contactForm.querySelectorAll('.form-error');
      errorSpans.forEach(span => span.textContent = '');
      formSuccessAlert.style.display = 'none';
      if (charCounter) charCounter.textContent = '0 / 600 characters';
    });
  }

  // -------------------------------------------------------------------
  // 7. SANITIZE HELPER
  // -------------------------------------------------------------------
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

});
