/* ==========================================================================
   ELVERNEL, NAJWA & CO. — ADVOCATES & SOLICITORS
   Part 1: Public Website Interactive Logic
   - Clockwise scroll-linked pinwheel rotation
   - Interactive card modal previews
   - Consultation form handling & localStorage synchronization
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  initHeroPinwheel();
  initConsultationForm();
  initMobileNav();
  initSmoothScroll();
});

/* ==========================================================================
   HERO RADIAL PINWHEEL (CLOCKWISE ROTATION ON SCROLL)
   ========================================================================== */
function initHeroPinwheel() {
  const orbit = document.getElementById("pinwheelOrbit");
  const cards = document.querySelectorAll(".orbit-card");
  const btnRotateCw = document.getElementById("btnRotateCw");
  const btnRotateCcw = document.getElementById("btnRotateCcw");
  const modal = document.getElementById("practiceModal");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalTag = document.getElementById("modalTag");
  const modalDesc = document.getElementById("modalDesc");
  const modalActionBtn = document.getElementById("modalActionBtn");

  if (!orbit || cards.length === 0) return;

  const totalCards = cards.length;
  let currentRotation = 0;
  let isMobile = window.innerWidth <= 768;
  let radius = isMobile ? 150 : 255;

  // Position cards radially in a pinwheel formation
  function positionCards() {
    isMobile = window.innerWidth <= 768;
    radius = isMobile ? 150 : 255;

    cards.forEach((card, index) => {
      const angleDeg = (360 / totalCards) * index;
      const angleRad = (angleDeg * Math.PI) / 180;
      
      const x = Math.round(radius * Math.cos(angleRad));
      const y = Math.round(radius * Math.sin(angleRad));

      // Set position and base rotation
      card.style.left = `calc(50% + ${x}px)`;
      card.style.top = `calc(50% + ${y}px)`;
      card.dataset.baseAngle = angleDeg;
    });
  }

  positionCards();
  window.addEventListener("resize", positionCards);

  // Smooth scroll listener for CLOCKWISE rotation
  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const scrollY = window.scrollY;
        // Rotate clockwise proportionally to vertical scroll
        currentRotation = scrollY * 0.22;
        orbit.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
        
        // Update pagination indicator
        const activeIndex = Math.floor((currentRotation % 360) / 60);
        document.querySelectorAll(".dot-step").forEach((dot, idx) => {
          dot.classList.toggle("active", idx === Math.abs(activeIndex % 6));
        });

        ticking = false;
      });
      ticking = true;
    }
  });

  // Manual rotation controls
  if (btnRotateCw) {
    btnRotateCw.addEventListener("click", () => {
      currentRotation += 60;
      orbit.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
    });
  }

  if (btnRotateCcw) {
    btnRotateCcw.addEventListener("click", () => {
      currentRotation -= 60;
      orbit.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
    });
  }

  // Card Content Repository for interactive modals
  const CARD_DETAILS = {
    "1": {
      tag: "SaaS Contracts",
      title: "SaaS Agreements & Cloud Licensing",
      desc: "Our corporate team drafts, reviews, and negotiates mission-critical SaaS Master Service Agreements (MSAs), Service Level Agreements (SLAs), and Data Processing Agreements (DPAs). We protect enterprise clients against unilateral termination, liability caps, and cloud vendor lock-in.",
      actionTarget: "SaaS Dispute / Contract Review"
    },
    "2": {
      tag: "High Court Litigation",
      title: "Tech Dispute Litigation & Writs",
      desc: "When software implementation defaults occur, our litigation counsel file Writs of Summons in the High Court of Malaya. We enforce statutory remedies under Section 74 and Section 75 of the Malaysian Contracts Act 1950, seeking liquidated damages and restitution for operational loss.",
      actionTarget: "High Court Technology Litigation"
    },
    "3": {
      tag: "Commercial Settlement",
      title: "Heads of Agreement & Mediation",
      desc: "We negotiate without-prejudice commercial settlements, securing refunds, restructured service credits, and amended liability terms through binding Heads of Agreement (HoA) and Settlement Deeds—avoiding the costs and delays of prolonged courtroom battles.",
      actionTarget: "Commercial Settlement & HoA"
    },
    "4": {
      tag: "Cross-Border Law",
      title: "Cross-Border Commercial Transactions",
      desc: "Representing Malaysian and multinational companies in complex technology procurement across ASEAN, the UK, and North America. We advise on governing law clauses, international commercial arbitration (AIAC/SIAC), and foreign judgment enforcement.",
      actionTarget: "Cross-Border Commercial"
    },
    "5": {
      tag: "Formal Practice",
      title: "UK-Style Formal Legal Practice",
      desc: "Upholding the distinguished traditions of the Bar, all formal correspondence, written legal opinions, and privileged memoranda are delivered through documented channels. We do not conduct privileged legal business over informal messaging platforms.",
      actionTarget: "Formal Written Legal Opinion"
    },
    "6": {
      tag: "Partner-Led",
      title: "Direct Advocate & Solicitor Counsel",
      desc: "Every matter is spearheaded directly by our four partners: Elvernel Leosard Raymond Abin, Nik Najwa Nabilah, Muthusamy A/L Gopal, and Vincent Chee—ensuring senior expertise at every milestone from initial consultation to final resolution.",
      actionTarget: "Partner Consultation"
    }
  };

  // Card click interaction
  cards.forEach(card => {
    card.addEventListener("click", function () {
      const cardId = this.dataset.cardId;
      const detail = CARD_DETAILS[cardId];
      if (detail && modal) {
        modalTag.textContent = detail.tag;
        modalTitle.textContent = detail.title;
        modalDesc.textContent = detail.desc;
        modalActionBtn.textContent = `Request Consultation for ${detail.tag}`;
        modalActionBtn.dataset.practice = detail.actionTarget;
        modal.classList.add("active");
      }
    });
  });

  // Modal close
  if (modalClose) {
    modalClose.addEventListener("click", () => modal.classList.remove("active"));
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }

  // Action button in modal scrolls to contact form and preselects practice area
  if (modalActionBtn) {
    modalActionBtn.addEventListener("click", function () {
      if (modal) modal.classList.remove("active");
      const targetArea = this.dataset.practice;
      const practiceSelect = document.getElementById("practiceAreaSelect");
      if (practiceSelect && targetArea) {
        practiceSelect.value = targetArea;
      }
      const contactSection = document.getElementById("contactSection");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

/* ==========================================================================
   CONSULTATION REQUEST FORM (PART 1 -> SAVES TO PART 2 DATA STORE)
   ========================================================================== */
function initConsultationForm() {
  const form = document.getElementById("consultationForm");
  const fileInput = document.getElementById("caseDocuments");
  const filePreview = document.getElementById("fileListPreview");
  const successModal = document.getElementById("submissionSuccessModal");
  const successRef = document.getElementById("successRequestRef");
  const successCloseBtn = document.getElementById("successCloseBtn");

  if (!form) return;

  // File selection display
  if (fileInput && filePreview) {
    fileInput.addEventListener("change", function () {
      filePreview.innerHTML = "";
      if (this.files.length > 0) {
        Array.from(this.files).forEach(file => {
          const item = document.createElement("div");
          item.textContent = `📎 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
          filePreview.appendChild(item);
        });
      }
    });
  }

  // Handle Form Submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("emailAddress").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();
    const practiceArea = document.getElementById("practiceAreaSelect").value;
    const summary = document.getElementById("caseSummary").value.trim();

    if (!fullName || !email || !summary) {
      alert("Please fill in all mandatory fields (Name, Email, and Case Summary).");
      return;
    }

    // Capture attached file names
    const fileNames = [];
    if (fileInput && fileInput.files.length > 0) {
      Array.from(fileInput.files).forEach(file => fileNames.push(file.name));
    } else {
      fileNames.push("Preliminary_Information_Brief.pdf");
    }

    // Generate Request ID
    const randomNum = Math.floor(100 + Math.random() * 900);
    const requestId = `REQ-2026-${randomNum}`;

    const newRequest = {
      id: requestId,
      name: fullName,
      email: email,
      phone: phone || "Not provided",
      practiceArea: practiceArea,
      summary: summary,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Pending",
      files: fileNames
    };

    // Save into shared data store so Part 2 firm portal sees it!
    StorageManager.addRequest(newRequest);

    // Show formal legal acknowledgment modal
    if (successRef) successRef.textContent = requestId;
    if (successModal) successModal.classList.add("active");

    form.reset();
    if (filePreview) filePreview.innerHTML = "";
  });

  if (successCloseBtn && successModal) {
    successCloseBtn.addEventListener("click", () => {
      successModal.classList.remove("active");
    });
  }
}

/* ==========================================================================
   PARTNER DIRECT INQUIRY BUTTONS
   ========================================================================== */
function directPartnerInquiry(partnerName) {
  const summaryField = document.getElementById("caseSummary");
  const contactSection = document.getElementById("contactSection");
  if (summaryField) {
    summaryField.value = `[Attention: ${partnerName}]\nRe: `;
  }
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }
}
window.directPartnerInquiry = directPartnerInquiry;

/* ==========================================================================
   MOBILE NAVIGATION TOGGLE
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // Close when clicking nav links
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });
}

/* ==========================================================================
   SMOOTH SCROLLING FOR INTERNAL ANCHORS
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}
