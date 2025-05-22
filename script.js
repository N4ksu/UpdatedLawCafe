document.addEventListener("DOMContentLoaded", function () {
  // Mobile Nav Menu
  const navbarLinks = document.querySelectorAll(".nav-menu .nav-link");
  const menuOpenButton = document.querySelector("#menu-open-button");
  const menuCloseButton = document.querySelector("#menu-close-button");

  if (menuOpenButton && menuCloseButton) {
    menuOpenButton.addEventListener("click", () => {
      document.body.classList.toggle("show-mobile-menu");
    });

    menuCloseButton.addEventListener("click", () => {
      document.body.classList.remove("show-mobile-menu");
    });

    navbarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("show-mobile-menu");
      });
    });
  }

  // Swiper
  new Swiper(".slider-wrapper", {
    loop: true,
    grabCursor: true,
    spaceBetween: 25,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  // Modal Reservation Logic
  const openBtn = document.getElementById("open-reservation");
  const closeBtn = document.getElementById("close-reservation");
  const modal = document.getElementById("reservation-modal");

  if (openBtn && closeBtn && modal) {
    openBtn.addEventListener("click", () => modal.classList.add("active"));
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }
document.getElementById("reservation-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Stop the form from reloading the page

  const form = e.target;
  const formData = new FormData(form);

  fetch("reserve.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((result) => {
      alert("✅ " + result); // Show success message
      form.reset(); // Clear the form
      document.getElementById("reservation-modal").classList.remove("active"); // Close modal
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("❌ Something went wrong. Please try again.");
    });
});

  // Contact Form Validation
  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const messageInput = document.getElementById("contact-message");




      // Clear previous errors
      removeError(nameInput);
      removeError(emailInput);
      removeError(messageInput);



  // Feedback message from PHP redirect
  const params = new URLSearchParams(window.location.search);

if (params.get("contact") === "success") {
  alert("✅ Your message has been sent successfully!");

  // Remove the URL parameter
  if (window.history.replaceState) {
    window.history.replaceState(null, "", window.location.pathname);
  }
}
  
  function removeError(inputElement) {
    const next = inputElement.nextElementSibling;
    if (next && next.classList.contains("inline-error")) {
      next.remove();
    }
  }
  
});
// Swiper for Testimonials
const testimonialSwiper = new Swiper(".slider-wrapper", {
  loop: true,
  grabCursor: true,
  allowTouchMove: true,
  slidesPerView: 1,
  spaceBetween: 30,
  speed: 3000,
  autoplay: {
    delay: 0, 
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});


// Add black background to navbar on scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
  window.addEventListener("load", function () {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      // Scroll to top first, then smooth scroll to target
      window.scrollTo(0, 0);
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }
});
});
// Fade-in each section/footer on scroll (once)
document.addEventListener("DOMContentLoaded", function () {
  // Select all main sections and the footer
  const revealSections = [
    ...document.querySelectorAll("section"),
    ...document.querySelectorAll("footer.footer-section")
  ];

  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.92;
    revealSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        section.classList.add("section-visible");
      }
    });
  }

  // Initial check and on scroll
  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll, { passive: true });
});

// Function to handle scroll animations
const setupScrollAnimations = () => {
    // Array to keep track of elements that have just animated due to nav click
    const animatingElements = new Set();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;

            // Only add/remove class if the element is not currently under a "nav click" animation
            // This prevents flicker if IntersectionObserver fires while we're manually animating
            if (animatingElements.has(element)) {
                return; // Skip if currently animating due to nav click
            }

            if (entry.isIntersecting) {
                // When an element enters the viewport, add the animation class
                // First, ensure it's not visible, then add the class to re-trigger animation
                element.classList.remove('is-visible'); // Remove to allow re-trigger
                // Use a small delay to ensure the class is removed and re-added,
                // forcing the animation to play from the beginning.
                setTimeout(() => {
                    element.classList.add('is-visible');
                }, 10);
            } else {
                // When an element leaves the viewport, remove the animation class
                // so it can animate again when scrolled back into view.
                element.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.2 // Adjust this value (0.0 to 1.0) to control when the animation triggers.
                        // 0.2 means 20% of the element must be visible.
    });

    // Select all elements you want to animate
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Handle navigation clicks to trigger animations
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Get the target section's ID from the href (e.g., #about)
            const targetId = this.getAttribute('href');

            // If it's an internal link, smooth scroll to it
            if (targetId && targetId.startsWith('#')) {
                event.preventDefault(); // Prevent default jump
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // Temporarily add a class to prevent observer from interfering
                    // This is for visual smoothness more than strict necessity
                    const sectionElements = targetSection.querySelectorAll('.animate-on-scroll');

                    sectionElements.forEach(el => {
                        el.classList.remove('is-visible'); // Reset before scroll
                        animatingElements.add(el); // Mark as manually animating
                    });

                    // Scroll to the target section
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });

                    // After scrolling, re-trigger animations for the target section
                    // Use a timeout that roughly matches your scroll behavior duration
                    // Plus a bit extra for good measure to ensure scroll is done.
                    setTimeout(() => {
                        sectionElements.forEach(el => {
                            el.classList.add('is-visible');
                            // After animation, remove from animatingElements set
                            setTimeout(() => {
                                animatingElements.delete(el);
                            }, 700); // Should be slightly longer than your CSS transition duration (0.6s)
                        });
                    }, 800); // Adjust this delay based on your smooth scroll speed
                             // This delay should be long enough for the scroll to finish

                }
            }
        });
    });
};

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupScrollAnimations);


// --- Keep your existing code below this line for modal, navbar scroll, and swiper ---

// Reservation Modal Logic
const reservationModal = document.getElementById('reservation-modal');
const openReservationButton = document.getElementById('open-reservation');
const closeReservationButton = document.getElementById('close-reservation');
const reservationForm = document.getElementById('reservation-form');
const reservationSuccessMessage = document.getElementById('reservation-success');

if (openReservationButton && reservationModal && closeReservationButton) {
    openReservationButton.addEventListener('click', () => {
        reservationModal.classList.add('active');
    });

    closeReservationButton.addEventListener('click', () => {
        reservationModal.classList.remove('active');
        reservationForm.reset();
        reservationSuccessMessage.style.display = 'none';
    });

    reservationModal.addEventListener('click', (e) => {
        if (e.target === reservationModal) {
            reservationModal.classList.remove('active');
            reservationForm.reset();
            reservationSuccessMessage.style.display = 'none';
        }
    });
}

if (reservationForm) {
    reservationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        console.log('Reservation Form Submitted!');
        const formData = new FormData(this);
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        if (reservationSuccessMessage) {
            reservationSuccessMessage.style.display = 'block';
            reservationForm.reset();
        }

        setTimeout(() => {
            reservationModal.classList.remove('active');
            reservationSuccessMessage.style.display = 'none';
        }, 3000);
    });
}

// Navbar scroll effect
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuOpenButton = document.getElementById('menu-open-button');
const menuCloseButton = document.getElementById('menu-close-button');
const navMenu = document.querySelector('.nav-menu');

if (menuOpenButton && menuCloseButton && navMenu) {
    menuOpenButton.addEventListener('click', () => {
        navMenu.classList.add('active');
    });

    menuCloseButton.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });

    // Close menu when clicking on a nav link (for single page navigation)
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Swiper initialization
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Swiper !== 'undefined') {
        new Swiper('.swiper', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            slidesPerView: 1,
            spaceBetween: 30,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
        });
    }
});

  const button = document.getElementById('open-reservation');
  const icon = button.querySelector('.coffee-icon');

  // Pause shake on hover
  button.addEventListener('mouseenter', () => {
    icon.classList.add('paused');
  });

  // Resume shake on mouse leave
  button.addEventListener('mouseleave', () => {
    icon.classList.remove('paused');
  });

  // Pause shake briefly on click (and then resume after 1s)
  button.addEventListener('click', () => {
    icon.classList.add('paused');
    setTimeout(() => {
      icon.classList.remove('paused');
    }, 1000);
  });
