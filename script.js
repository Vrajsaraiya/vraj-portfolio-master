const body = document.body;
const nav = document.querySelector("nav");
const navBar = document.querySelector(".navbar");
const scrollBtn = document.querySelector(".scroll-button a");
const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const navLinks = document.querySelectorAll(".menu li a");
const sections = document.querySelectorAll("section[id]");
const revealItems = document.querySelectorAll(".reveal");

const handleScrollState = () => {
  const isScrolled = window.scrollY > 24;

  nav.classList.toggle("sticky", isScrolled);
  scrollBtn.classList.toggle("show", window.scrollY > 260);

  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSectionId}`;
    link.classList.toggle("active-link", isActive);
  });
};

const openNavMenu = () => {
  navBar.classList.add("active");
  body.style.overflow = "hidden";
};

const hideNavMenu = () => {
  navBar.classList.remove("active");
  body.style.overflow = "";
};

menuBtn.addEventListener("click", openNavMenu);
cancelBtn.addEventListener("click", hideNavMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", hideNavMenu);
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

window.addEventListener("scroll", handleScrollState);
window.addEventListener("load", handleScrollState);
