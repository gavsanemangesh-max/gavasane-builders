/* Minimal vanilla JS: mobile menu toggle + YouTube walkthrough modal */

(function () {
  var menuBtn = document.getElementById("menuBtn");
  var mobileNav = document.getElementById("mobileNav");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", function () {
      mobileNav.classList.toggle("is-open");
    });
    mobileNav.addEventListener("click", function (e) {
      if (e.target && e.target.tagName === "A") mobileNav.classList.remove("is-open");
    });
  }

  var triggers = document.querySelectorAll("[data-youtube-trigger]");
  var modal = document.getElementById("ytModal");
  var closeBtn = document.getElementById("ytClose");
  var frame = document.getElementById("ytFrame");
  var base = "https://www.youtube.com/embed/";

  function openModal(videoId) {
    if (!modal || !frame) return;
    frame.src = base + (videoId || "YOUR_VIDEO_ID") + "?autoplay=1&rel=0";
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal || !frame) return;
    modal.classList.remove("is-open");
    frame.src = "";
    document.body.style.overflow = "";
  }

  if (triggers && triggers.length) {
    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var id = trigger.getAttribute("data-youtube-id") || "YOUR_VIDEO_ID";
        openModal(id);
      });
      trigger.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(trigger.getAttribute("data-youtube-id"));
        }
      });
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.classList.contains("is-open")) closeModal();
  });

  // Prestige home intro: premium stacked card carousel (3-image loop)
  (function () {
    var stack = document.querySelector(".prestige-stack");
    if (!stack) return;

    var cards = Array.prototype.slice.call(
      stack.querySelectorAll(".prestige-card")
    );
    if (!cards.length) return;

    var currentIndex = 0;
    var intervalMs = 4000;

    function applyRoles() {
      var front = currentIndex;
      var middle = (currentIndex + 1) % cards.length;
      var back = (currentIndex + 2) % cards.length;

      cards.forEach(function (card, index) {
        card.classList.remove("is-front", "is-middle", "is-back");
        if (index === front) card.classList.add("is-front");
        else if (index === middle) card.classList.add("is-middle");
        else if (index === back) card.classList.add("is-back");
      });
    }

    applyRoles();

    setInterval(function () {
      currentIndex = (currentIndex + 1) % cards.length;
      applyRoles();
    }, intervalMs);
  })();

  // Homepage Completed Projects: stacked 4-image carousel with active text
  (function () {
    var stack = document.querySelector(".completed-stack");
    var nameEl = document.querySelector(".completed-project-name");
    var metaEl = document.querySelector(".completed-project-meta");
    if (!stack || !nameEl || !metaEl) return;

    var cards = Array.prototype.slice.call(
      stack.querySelectorAll(".completed-card")
    );
    if (!cards.length) return;

    // Order must match `.completed-card` DOM order: Ravi, Moraya, Mangalmurty, Siddhidata.
    var projects = [
      {
        name: "Ravi Arcade",
        meta: "2 Retail Spaces · 16 × 2BHK Residences"
      },
      {
        name: "Moraya Residency",
        meta: "18 × 2BHK Residences"
      },
      {
        name: "MangalMurty Residency",
        meta: "18 × 2BHK Residences"
      },
      {
        name: "Siddhidata Residency",
        meta: "18 × 2BHK Residences"
      }
    ];

    var currentIndex = 0;
    var intervalMs = 4000;

    function applyRoles() {
      var front = currentIndex;
      var middle = (currentIndex + 1) % cards.length;
      var back = (currentIndex + 2) % cards.length;

      cards.forEach(function (card, index) {
        card.classList.remove("is-front", "is-middle", "is-back");
        if (index === front) card.classList.add("is-front");
        else if (index === middle) card.classList.add("is-middle");
        else if (index === back) card.classList.add("is-back");
      });

      var project = projects[front] || projects[0];
      nameEl.textContent = project.name;
      metaEl.textContent = project.meta;
    }

    applyRoles();

    setInterval(function () {
      currentIndex = (currentIndex + 1) % cards.length;
      applyRoles();
    }, intervalMs);
  })();

  // Scroll reveal: repeat each time element enters viewport (premium Lodha-style behavior)
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -12% 0px"
      }
    );

    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else if (revealEls.length) {
    revealEls.forEach(function (el) {
      el.classList.add("active");
    });
  }
})();
