document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // SCROLLED HEADER TRANSITION
  // ==========================================
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once in case page starts scrolled

  // ==========================================
  // MOBILE HAMBURGER MENU
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link a');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinkItems.forEach(item => {
    item.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ==========================================
  // NAVIGATION ACTIVE LINK SPY (SCROLLSPY)
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const scrollSpy = () => {
    const scrollPosition = window.scrollY + 120; // offset for nav height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link a[href="#${sectionId}"]`);

      if (activeLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active'));
          activeLink.parentElement.classList.add('active');
        }
      }
    });

    // Special case for top of page
    if (window.scrollY < 100) {
      document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active'));
      const homeLink = document.querySelector('.nav-link a[href="#inicio"]');
      if (homeLink) homeLink.parentElement.classList.add('active');
    }
  };
  window.addEventListener('scroll', scrollSpy);
  scrollSpy();

  // ==========================================
  // INTERACTIVE TESTIMONIALS SLIDER
  // ==========================================
  const container = document.querySelector('.testimonials-container');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.querySelector('.testimonials-nav');
  const prevBtn = document.querySelector('.arrow-prev');
  const nextBtn = document.querySelector('.arrow-next');

  let currentSlide = 0;
  const slideCount = slides.length;
  let autoplayTimer = null;

  if (slideCount > 0) {
    // Generate dots
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.classList.add('nav-dot');
      if (idx === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Ir para depoimento ${idx + 1}`);
      dotsContainer.appendChild(dot);

      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetAutoplay();
      });
    });

    const dots = document.querySelectorAll('.nav-dot');

    const updateSlidePosition = () => {
      container.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, idx) => {
        if (idx === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    const goToSlide = (index) => {
      currentSlide = (index + slideCount) % slideCount;
      updateSlidePosition();
    };

    const nextSlide = () => {
      goToSlide(currentSlide + 1);
    };

    const prevSlide = () => {
      goToSlide(currentSlide - 1);
    };

    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });

    // Autoplay function
    const startAutoplay = () => {
      autoplayTimer = setInterval(nextSlide, 7000);
    };

    const resetAutoplay = () => {
      clearInterval(autoplayTimer);
      startAutoplay();
    };

    startAutoplay();
  }

  // ==========================================
  // FAQ FLUID ACCORDION
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items first
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-content').style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // ==========================================
  // SCROLL REVEAL ANIMATIONS
  // ==========================================
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  setTimeout(revealOnScroll, 100);

  // ==========================================
  // INTERACTIVE TEASER FORM WIDGET
  // ==========================================
  const serviceOptions = document.querySelectorAll('.teaser-options .teaser-btn');
  const selectServiceInput = document.getElementById('assunto');
  const appointmentPreviewText = document.getElementById('appointment-date-text');

  // Set up service selection in the hero teaser card
  serviceOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      serviceOptions.forEach(btn => btn.classList.remove('selected'));
      opt.classList.add('selected');

      const value = opt.getAttribute('data-value');
      
      if (selectServiceInput) {
        selectServiceInput.value = value;
      }

      setTimeout(() => {
        const contactSection = document.getElementById('contato');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    });
  });

  // Live appointment teaser
  if (appointmentPreviewText) {
    appointmentPreviewText.innerText = `Atendimento domiciliar disponível em Curitiba e RMC`;
  }

  // ==========================================
  // MODERN GLOWING WHATSAPP WIDGET & CHAT WINDOW
  // ==========================================
  const whatsappFab = document.getElementById('whatsappFab');
  const whatsappChatWindow = document.getElementById('whatsappChatWindow');
  const closeChatBtn = document.getElementById('closeChatBtn');
  const chatActionBtn = document.getElementById('chatActionBtn');
  const notificationBadge = document.querySelector('.fab-notification-badge');

  // Helper redirection function
  const redirectToWhatsApp = (msg = 'Olá! Tenho interesse nos serviços da Regenera Estomacare.') => {
    const phoneNumber = '5541988335199'; // Real WhatsApp Number provided by user
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // Toggle Chat Window
  const toggleChatWindow = () => {
    whatsappChatWindow.classList.toggle('active');
    
    // Hide notification badge when user opens the chat
    if (notificationBadge) {
      notificationBadge.style.opacity = '0';
      notificationBadge.style.pointerEvents = 'none';
    }
  };

  if (whatsappFab) {
    whatsappFab.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleChatWindow();
    });
  }

  if (closeChatBtn) {
    closeChatBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      whatsappChatWindow.classList.remove('active');
    });
  }

  // Prevent closing when clicking inside the chat body
  if (whatsappChatWindow) {
    whatsappChatWindow.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Close chat window if clicking anywhere else on the document
  document.addEventListener('click', () => {
    if (whatsappChatWindow) {
      whatsappChatWindow.classList.remove('active');
    }
  });

  // Action button redirection
  if (chatActionBtn) {
    chatActionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      redirectToWhatsApp();
    });
  }

  // Auto-trigger chat window opening after 5.5 seconds to catch attention
  setTimeout(() => {
    if (whatsappChatWindow && !whatsappChatWindow.classList.contains('active')) {
      whatsappChatWindow.classList.add('active');
    }
  }, 5500);

  // ==========================================
  // FORM REDIRECTION & INTEGRATION
  // ==========================================
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('nome').value;
      const phone = document.getElementById('telefone').value;
      const service = document.getElementById('assunto').value;
      const message = document.getElementById('mensagem').value;

      const serviceMap = {
        'feridas': 'Tratamento Avançado de Feridas',
        'estomias': 'Estomaterapia & Estomias',
        'podiatria': 'Podiatria Clínica',
        'consultoria': 'Consultoria em Prevenção de Feridas'
      };

      const serviceName = serviceMap[service] || 'Estomaterapia / Cuidados Especiais';

      // Custom professional Curitiba message
      const customMessage = `Olá! Meu nome é ${name}. Tenho interesse nos serviços domiciliares da Regenera Estomacare em Curitiba e RMC, focado em *${serviceName}*. \n\n*Contato:* ${phone}\n*Detalhes do caso:* ${message || 'Gostaria de agendar uma avaliação inicial.'}`;

      const submitBtn = bookingForm.querySelector('.btn-primary');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = `
        <svg class="btn-icon" style="animation: spin 1s linear infinite;" viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        Direcionando ao WhatsApp...
      `;
      submitBtn.disabled = true;

      if (!document.getElementById('spin-animation')) {
        const style = document.createElement('style');
        style.id = 'spin-animation';
        style.textContent = '@keyframes spin { 100% { transform: rotate(360deg); } }';
        document.head.appendChild(style);
      }

      setTimeout(() => {
        redirectToWhatsApp(customMessage);
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        bookingForm.reset();
      }, 1200);
    });
  }

  // ==========================================
  // SOFTHOVER ON INTERACTIVE ITEMS
  // ==========================================
  const primaryButtons = document.querySelectorAll('.btn-primary');
  primaryButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty('--x', `${x}px`);
      btn.style.setProperty('--y', `${y}px`);
    });
  });
});
