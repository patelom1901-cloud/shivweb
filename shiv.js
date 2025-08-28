// ===== Slider Functionality =====
const slides = document.querySelectorAll(".crazy-slider .slide");
const prev = document.querySelector(".crazy-slider .prev");
const next = document.querySelector(".crazy-slider .next");
const dots = document.querySelectorAll(".crazy-slider .dot");

let index = 0;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.remove("active");
    dots[idx].classList.remove("active");
  });
  slides[i].classList.add("active");
  dots[i].classList.add("active");
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    index = i;
    showSlide(index);
  });
});

// Auto-slide
setInterval(nextSlide, 3000);

// ===== DOM Ready All Features =====
document.addEventListener("DOMContentLoaded", () => {
// ===== NEW Mobile Menu Toggle =====
const toggleButton = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

toggleButton.addEventListener('click', () => {
  navList.classList.toggle('show');
});
  // ===== Formspree Form Submission Alert =====
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      })
        .then(response => {
          if (response.ok) {
            alert("✅ Thank you! Your message has been sent successfully.");
            form.reset();
          } else {
            alert("❌ Oops! Something went wrong. Please try again.");
          }
        })
        .catch(error => {
          console.error("Form error:", error);
          alert("⚠️ Failed to send message. Please check your connection.");
        });
    });
  }

  // ===== Scroll to Top Button =====
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", () => {
    scrollToTopBtn.style.display = window.scrollY > 100 ? "block" : "none";
  });

  scrollToTopBtn.addEventListener("click", () => {
    smoothScrollToTop();
  });

  function smoothScrollToTop() {
    const duration = 1000; // 1 second
    const start = window.scrollY;
    const startTime = performance.now();

    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      window.scrollTo(0, start * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  }
});

// ===== Reveal Elements on Scroll =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('.fade-in, .slide-in, .zoom-in, .flip-in, .bounce-in').forEach((el) => {
  observer.observe(el);
});