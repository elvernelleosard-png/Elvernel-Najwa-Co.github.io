/* ==========================================================================
   ELVERNEL, NAJWA & CO. — ADVOCATES & SOLICITORS
   Part 2: Client & Firm Case Management System Logic
   - Dual-role simulation (Client vs Firm Staff)
   - Google Docs-style spreadsheet case progress tracker
   - Correspondence viewer with formal legal letterheads
   - Meeting scheduling & milestone progress tracking
   - Consultation request intake review & client onboarding
   ========================================================================== */

let currentRole = "client"; // 'client' or 'firm'
let activeCaseRef = "EN-2026-084"; // Default active client case

document.addEventListener("DOMContentLoaded", function () {
  // Check URL parameters for role or case
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("role") === "firm") {
    currentRole = "firm";
  }
  if (urlParams.get("case")) {
    activeCaseRef = urlParams.get("case");
  }

  initRoleSwitcher();
  renderPortal();
  initDocumentViewerModal();
});

/* ==========================================================================
   ROLE SWITCHING (CLIENT VS FIRM STAFF)
   ========================================================================== */
function initRoleSwitcher() {
  const btnClient = document.getElementById("btnRoleClient");
  const btnFirm = document.getElementById("btnRoleFirm");

  if (btnClient) {
    btnClient.addEventListener("click", () => switchRole("client"));
  }
  if (btnFirm) {
    btnFirm.addEventListener("click", () => switchRole("firm"));
  }
}

function switchRole(newRole) {
  currentRole = newRole;
  const btnClient = document.getElementById("btnRoleClient");
  const btnFirm = document.getElementById("btnRoleFirm");
  const roleIndicator = document.getElementById("roleIndicatorText");
  const roleDot = document.getElementById("roleIndicatorDot");

  if (btnClient && btnFirm) {
    btnClient.classList.toggle("active", newRole === "client");
    btnFirm.classList.toggle("active", newRole === "firm");
  }

  if (roleIndicator && roleDot) {
    if (newRole === "client") {
      roleIndicator.textContent = "Client Portal: CloudTech Solutions Sdn Bhd (Ref: EN-2026-084)";
      roleDot.classList.remove("firm-role");
    } else {
      roleIndicator.textContent = "Advocate & Solicitor Portal: Elvernel Leosard Raymond Abin (Managing Partner)";
      roleDot.classList.add("firm-role");
    }
  }

  renderPortal();
}

/* ==========================================================================
   MAIN PORTAL RENDERING
   ========================================================================== */
function renderPortal() {
  const clientView = document.getElementById("clientViewContainer");
  const firmView = document.getElementById("firmViewContainer");

  if (currentRole === "client") {
    if (clientView) clientView.style.display = "block";
    if (firmView) firmView.style.display = "none";
    renderClientDashboard();
  } else {
    if (clientView) clientView.style.display = "none";
    if (firmView) firmView.style.display = "block";
    renderFirmDashboard();
  }
}

/* ==========================================================================
   CLIENT VIEW IMPLEMENTATION
   ========================================================================== */
function renderClientDashboard() {
  const cases = StorageManager.getCases();
  const currentCase = cases.find(c => c.ref === activeCaseRef) || cases[0];

  // Update Case Meta Header
  const titleEl = document.getElementById("clientCaseTitle");
  const refEl = document.getElementById("clientCaseRef");
  const partnerEl = document.getElementById("clientCasePartner");
  const statusEl = document.getElementById("clientCaseStatus");
  const forumEl = document.getElementById("clientCaseForum");
  const claimEl = document.getElementById("clientCaseClaim");

  if (titleEl) titleEl.textContent = currentCase.matter;
  if (refEl) refEl.textContent = currentCase.ref;
  if (partnerEl) partnerEl.textContent = currentCase.leadPartner;
  if (statusEl) {
    statusEl.textContent = currentCase.status;
    statusEl.dataset.status = currentCase.status;
  }
  if (forumEl) forumEl.textContent = currentCase.courtForum;
  if (claimEl) claimEl.textContent = currentCase.claimAmount;

  // Render Milestone Progress Bar
  renderClientMilestones(currentCase.status);

  // Render Tabs Content
  renderClientCorrespondence(currentCase.ref);
  renderClientMeetings(currentCase.ref);
  initClientDocUpload(currentCase.ref);
  initClientMeetingRequest();
  initClientTabs();
}

function renderClientMilestones(status) {
  const steps = [
    { num: 1, title: "Initial Fact Finding & Cause of Action", desc: "UiTM / Bar protocols" },
    { num: 2, title: "Written Legal Opinion & Statutory Review", desc: "Contracts Act 1950 (s.74/75)" },
    { num: 3, title: "Letter of Demand & High Court Writ Draft", desc: "Statutory 14-day notice" },
    { num: 4, title: "Settlement Negotiation / Heads of Agreement", desc: "Without prejudice terms" },
    { num: 5, title: "Final Resolution & Court Disposal", desc: "Deed execution & sealing" }
  ];

  let activeIndex = 1;
  if (status === "Initial Consultation" || status === "Documents Requested") activeIndex = 1;
  else if (status === "In Progress" || status === "Awaiting Client") activeIndex = 2;
  else if (status === "Filed in Court") activeIndex = 3;
  else if (status === "Settlement Negotiation") activeIndex = 4;
  else if (status === "Completed") activeIndex = 5;

  const container = document.getElementById("milestonesStepList");
  if (!container) return;

  container.innerHTML = "";
  steps.forEach(step => {
    const item = document.createElement("div");
    item.className = "milestone-step-item";
    if (step.num < activeIndex) item.classList.add("completed");
    else if (step.num === activeIndex) item.classList.add("active");

    item.innerHTML = `
      <div class="milestone-circle">${step.num < activeIndex ? "✓" : step.num}</div>
      <div class="milestone-label">${step.title}</div>
      <div class="milestone-date">${step.desc}</div>
    `;
    container.appendChild(item);
  });
}

function renderClientCorrespondence(caseRef) {
  const docs = StorageManager.getCorrespondence(caseRef);
  const tbody = document.getElementById("clientDocTableBody");
  const countBadge = document.getElementById("clientDocCountBadge");

  if (countBadge) countBadge.textContent = docs.length;
  if (!tbody) return;

  tbody.innerHTML = "";

  if (docs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--color-text-dim);">No formal correspondence filed for this case yet.</td></tr>`;
    return;
  }

  docs.forEach(doc => {
    const tr = document.createElement("tr");

    let badgeClass = "badge-letter";
    if (doc.type === "Opinion") badgeClass = "badge-opinion";
    else if (doc.type === "Memorandum") badgeClass = "badge-memorandum";
    else if (doc.type === "Agreement") badgeClass = "badge-agreement";
    else if (doc.type === "Email") badgeClass = "badge-email";

    tr.innerHTML = `
      <td><span style="font-family: monospace; font-size: 0.8rem; color: var(--color-pure-mint);">${doc.refNumber}</span></td>
      <td><span class="doc-type-badge ${badgeClass}">${doc.type}</span></td>
      <td>
        <div style="font-weight: 600; color: var(--color-pure-white);">${doc.title}</div>
        <div style="font-size: 0.78rem; color: var(--color-text-dim); margin-top: 0.2rem;">${doc.summary}</div>
      </td>
      <td style="font-size: 0.82rem; color: var(--color-text-muted);">${doc.date}</td>
      <td>
        <button class="btn btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;" onclick="viewDocument('${doc.id}')">View</button>
        <button class="btn btn-outline" style="padding: 0.35rem 0.75rem; font-size: 0.75rem; margin-left: 0.35rem;" onclick="downloadDocument('${doc.id}')">Download</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderClientMeetings(caseRef) {
  const meetings = StorageManager.getMeetings(caseRef);
  const container = document.getElementById("clientMeetingsContainer");
  const countBadge = document.getElementById("clientMeetingCountBadge");

  if (countBadge) countBadge.textContent = meetings.length;
  if (!container) return;

  container.innerHTML = "";

  if (meetings.length === 0) {
    container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--color-text-dim); background: rgba(10,37,54,0.5); border-radius: 8px;">No formal meetings currently scheduled. Formal meetings are held strictly at key case milestones.</div>`;
    return;
  }

  meetings.forEach(meet => {
    const card = document.createElement("div");
    card.className = "meeting-card";

    const dateObj = new Date(meet.date);
    const day = dateObj.getDate() || 18;
    const month = dateObj.toLocaleDateString("en-GB", { month: "short" }) || "OCT";

    card.innerHTML = `
      <div class="meeting-header">
        <div>
          <div class="meeting-title serif-font">${meet.title}</div>
          <div class="meeting-venue">📍 ${meet.format}</div>
        </div>
        <div class="meeting-date-badge">
          <div class="meeting-day">${day}</div>
          <div class="meeting-month">${month}</div>
        </div>
      </div>
      <div class="meeting-agenda">
        <strong style="color: var(--color-pure-mint); display: block; margin-bottom: 0.25rem;">Formal Agenda & Milestone Scope:</strong>
        ${meet.agenda}
      </div>
      <div style="font-size: 0.8rem; color: var(--color-text-dim); margin-top: auto;">
        Presiding Advocate: <strong style="color: var(--color-pure-white);">${meet.partner}</strong> | Time: <strong style="color: var(--color-pure-mint);">${meet.time}</strong>
      </div>
    `;
    container.appendChild(card);
  });
}

function initClientDocUpload(caseRef) {
  const form = document.getElementById("clientUploadForm");
  const fileInput = document.getElementById("clientDocFileInput");
  const docTypeSelect = document.getElementById("clientDocTypeSelect");
  const docDesc = document.getElementById("clientDocDesc");

  if (!form) return;

  form.onsubmit = function (e) {
    e.preventDefault();

    if (!fileInput.files.length) {
      alert("Please select a document to upload.");
      return;
    }

    const file = fileInput.files[0];
    const newDoc = {
      id: `doc-${Date.now()}`,
      caseRef: caseRef,
      refNumber: `CLIENT/SUB/${Date.now().toString().slice(-4)}`,
      type: docTypeSelect.value,
      title: `${file.name} (Client Submission)`,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      signatory: "Client / Deponent",
      summary: docDesc.value || "Supporting evidentiary document submitted by client.",
      content: `DOCUMENT UPLOADED BY CLIENT: ${file.name}\nTYPE: ${docTypeSelect.value}\nDESCRIPTION: ${docDesc.value || "No additional commentary provided."}\nDATE RECEIVED: ${new Date().toLocaleString()}`
    };

    StorageManager.addCorrespondence(newDoc);
    alert("Document successfully uploaded to case file and dispatched to Counsel.");
    form.reset();
    renderClientCorrespondence(caseRef);
  };
}

function initClientMeetingRequest() {
  const form = document.getElementById("requestMeetingForm");
  if (!form) return;

  form.onsubmit = function (e) {
    e.preventDefault();
    const milestoneReason = document.getElementById("reqMeetingMilestone").value;
    const preferredDate = document.getElementById("reqMeetingDate").value;
    const notes = document.getElementById("reqMeetingNotes").value;

    const newMeeting = {
      id: `meet-${Date.now()}`,
      caseRef: activeCaseRef,
      title: `Client Requested Milestone Conference: ${milestoneReason}`,
      date: preferredDate || "2026-11-05",
      time: "11:00 AM (MYT)",
      format: "Video Conference (Secured)",
      partner: "Elvernel Leosard Raymond Abin, LL.B (UiTM)",
      agenda: `Client formal request. Scope: ${notes || "Review of case settlement positioning."}`
    };

    StorageManager.addMeeting(newMeeting);
    alert("Formal milestone meeting request submitted. The firm will confirm within 24 hours.");
    form.reset();
    renderClientMeetings(activeCaseRef);
  };
}

function initClientTabs() {
  const tabs = document.querySelectorAll(".portal-tab-btn");
  tabs.forEach(tab => {
    tab.onclick = function () {
      tabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");

      const target = this.dataset.tab;
      document.querySelectorAll(".portal-tab-pane").forEach(pane => {
        pane.style.display = (pane.id === target) ? "block" : "none";
      });
    };
  });
}

/* ==========================================================================
   FIRM STAFF VIEW IMPLEMENTATION
   ========================================================================== */
function renderFirmDashboard() {
  renderStaffCaseTracker();
  renderStaffConsultationRequests();
  initStaffDocDispatch();
  initStaffMeetingScheduler();
  initStaffTabs();
}

// Google Docs / Spreadsheet style Case Tracker Table
function renderStaffCaseTracker() {
  const cases = StorageManager.getCases();
  const tbody = document.getElementById("staffCaseTableBody");
  const searchInput = document.getElementById("staffSearchInput");

  if (!tbody) return;

  function buildTable(list) {
    tbody.innerHTML = "";
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--color-text-dim);">No active cases match search filter.</td></tr>`;
      return;
    }

    list.forEach(c => {
      const tr = document.createElement("tr");

      // Generate status dropdown
      let statusOptionsHtml = "";
      WORK_STATUSES.forEach(status => {
        const isSelected = c.status === status ? "selected" : "";
        statusOptionsHtml += `<option value="${status}" ${isSelected}>${status}</option>`;
      });

      tr.innerHTML = `
        <td><strong style="font-family: monospace; color: var(--color-pure-mint);">${c.ref}</strong></td>
        <td>
          <div style="font-weight: 700; color: var(--color-pure-white);">${c.clientName}</div>
          <div style="font-size: 0.76rem; color: var(--color-text-dim);">${c.clientEmail}</div>
        </td>
        <td>
          <div style="font-size: 0.88rem; color: var(--color-pure-white);">${c.matter}</div>
          <div style="font-size: 0.76rem; color: var(--color-text-muted);">Opposing: ${c.opposingParty}</div>
        </td>
        <td style="font-size: 0.82rem; color: var(--color-pure-mint);">${c.leadPartner}</td>
        <td style="font-size: 0.82rem; color: var(--color-text-muted);">${c.dateCommenced}</td>
        <td>
          <select class="status-select" data-status="${c.status}" onchange="handleStaffStatusChange('${c.ref}', this.value, this)">
            ${statusOptionsHtml}
          </select>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  buildTable(cases);

  if (searchInput) {
    searchInput.oninput = function () {
      const q = this.value.toLowerCase();
      const filtered = cases.filter(c => 
        c.ref.toLowerCase().includes(q) ||
        c.clientName.toLowerCase().includes(q) ||
        c.matter.toLowerCase().includes(q) ||
        c.status.toLowerCase().includes(q)
      );
      buildTable(filtered);
    };
  }
}

// Dropdown change updates status in real-time
function handleStaffStatusChange(caseRef, newStatus, selectElement) {
  StorageManager.updateCaseStatus(caseRef, newStatus);
  selectElement.dataset.status = newStatus;
  
  // Show brief feedback toast
  showToast(`Case ${caseRef} status updated to "${newStatus}"`);
}
window.handleStaffStatusChange = handleStaffStatusChange;

// Consultation Requests Queue
function renderStaffConsultationRequests() {
  const requests = StorageManager.getRequests();
  const container = document.getElementById("staffRequestsContainer");
  const countBadge = document.getElementById("staffRequestCountBadge");

  const pendingCount = requests.filter(r => r.status === "Pending").length;
  if (countBadge) countBadge.textContent = pendingCount;
  if (!container) return;

  container.innerHTML = "";

  if (requests.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 3rem; color: var(--color-text-dim); background: rgba(10,37,54,0.5); border-radius: 8px;">No new consultation requests pending review.</div>`;
    return;
  }

  requests.forEach(req => {
    const card = document.createElement("div");
    card.className = "consultation-request-card";

    let badgeClass = "req-badge-pending";
    if (req.status === "Accepted") badgeClass = "req-badge-accepted";
    if (req.status === "Declined") badgeClass = "req-badge-declined";

    const filesList = req.files && req.files.length 
      ? req.files.map(f => `📄 ${f}`).join(", ") 
      : "No attachments";

    card.innerHTML = `
      <div class="req-header">
        <div>
          <span style="font-family: monospace; font-size: 0.78rem; color: var(--color-pure-mint); margin-right: 0.5rem;">${req.id}</span>
          <span class="req-client-name">${req.name}</span>
        </div>
        <span class="req-badge-status ${badgeClass}">${req.status}</span>
      </div>

      <div class="req-details-grid">
        <div>Email: <strong style="color: var(--color-pure-white);">${req.email}</strong></div>
        <div>Phone: <strong style="color: var(--color-pure-white);">${req.phone}</strong></div>
        <div>Field: <strong style="color: var(--color-pure-mint);">${req.practiceArea}</strong></div>
      </div>

      <div class="req-summary-box">
        <strong style="color: var(--color-pure-mint); display: block; margin-bottom: 0.25rem;">Case Summary:</strong>
        ${req.summary}
      </div>

      <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 1rem;">
        Supporting Documents: <span style="color: var(--color-pure-white);">${filesList}</span> | Received: ${req.date}
      </div>

      ${req.status === "Pending" ? `
        <div class="req-actions-bar">
          <button class="btn btn-primary" style="font-size: 0.82rem; padding: 0.45rem 1.1rem;" onclick="acceptConsultationRequest('${req.id}')">Accept & Create Case</button>
          <button class="btn btn-outline" style="font-size: 0.82rem; padding: 0.45rem 1.1rem; border-color: rgba(224,82,82,0.4); color: #e05252;" onclick="declineConsultationRequest('${req.id}')">Decline</button>
        </div>
      ` : `
        <div style="font-size: 0.82rem; color: var(--color-text-dim); text-align: right;">
          Action recorded. ${req.status === "Accepted" ? "Client account & case file established." : "Formal declination issued."}
        </div>
      `}
    `;
    container.appendChild(card);
  });
}

function acceptConsultationRequest(requestId) {
  const req = StorageManager.updateRequestStatus(requestId, "Accepted");
  if (!req) return;

  // Auto-generate new case ref and register into case tracker
  const newRef = `EN-2026-0${Math.floor(100 + Math.random() * 900)}`;
  const newCase = {
    id: `case-${Date.now()}`,
    ref: newRef,
    clientName: req.name,
    clientEmail: req.email,
    clientPhone: req.phone,
    matter: `${req.practiceArea}: ${req.summary.slice(0, 50)}...`,
    opposingParty: "Pending Identification at Initial Consultation",
    leadPartner: "Elvernel Leosard Raymond Abin, LL.B (UiTM)",
    dateCommenced: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    status: "Initial Consultation",
    claimAmount: "To Be Quantified",
    courtForum: "High Court of Malaya / Commercial Advisory",
    currentMilestone: 1
  };

  const cases = StorageManager.getCases();
  cases.unshift(newCase);
  StorageManager.saveCases(cases);

  // Show account activation modal for client
  const inviteModal = document.getElementById("clientInviteModal");
  const inviteRef = document.getElementById("inviteCaseRef");
  const inviteClient = document.getElementById("inviteClientName");
  const inviteLink = document.getElementById("inviteLinkText");

  if (inviteModal) {
    if (inviteRef) inviteRef.textContent = newRef;
    if (inviteClient) inviteClient.textContent = req.name;
    if (inviteLink) inviteLink.value = `${window.location.origin}${window.location.pathname}?role=client&case=${newRef}`;
    inviteModal.classList.add("active");
  }

  renderFirmDashboard();
}
window.acceptConsultationRequest = acceptConsultationRequest;

function declineConsultationRequest(requestId) {
  if (confirm("Are you sure you wish to formally decline this consultation request?")) {
    StorageManager.updateRequestStatus(requestId, "Declined");
    showToast("Request formally declined.");
    renderStaffConsultationRequests();
  }
}
window.declineConsultationRequest = declineConsultationRequest;

function initStaffDocDispatch() {
  const form = document.getElementById("staffDocDispatchForm");
  if (!form) return;

  form.onsubmit = function (e) {
    e.preventDefault();
    const caseRef = document.getElementById("dispatchCaseSelect").value;
    const docType = document.getElementById("dispatchDocType").value;
    const title = document.getElementById("dispatchTitle").value;
    const partner = document.getElementById("dispatchPartner").value;
    const content = document.getElementById("dispatchContent").value;
    const summary = document.getElementById("dispatchSummary").value;

    const newDoc = {
      id: `doc-${Date.now()}`,
      caseRef: caseRef,
      refNumber: `EN/${docType.slice(0,3).toUpperCase()}/2026/${Math.floor(100 + Math.random() * 900)}`,
      type: docType,
      title: title,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      signatory: partner,
      summary: summary || title,
      content: content
    };

    StorageManager.addCorrespondence(newDoc);
    alert(`Document successfully dispatched to Client Case ${caseRef}.`);
    form.reset();
  };
}

function initStaffMeetingScheduler() {
  const form = document.getElementById("staffScheduleMeetingForm");
  if (!form) return;

  form.onsubmit = function (e) {
    e.preventDefault();
    const caseRef = document.getElementById("schedCaseSelect").value;
    const title = document.getElementById("schedTitle").value;
    const date = document.getElementById("schedDate").value;
    const time = document.getElementById("schedTime").value;
    const format = document.getElementById("schedFormat").value;
    const partner = document.getElementById("schedPartner").value;
    const agenda = document.getElementById("schedAgenda").value;

    const newMeeting = {
      id: `meet-${Date.now()}`,
      caseRef: caseRef,
      title: title,
      date: date,
      time: time,
      format: format,
      partner: partner,
      agenda: agenda
    };

    StorageManager.addMeeting(newMeeting);
    alert(`Meeting scheduled and published to Client Case ${caseRef} dashboard.`);
    form.reset();
  };
}

function initStaffTabs() {
  const tabs = document.querySelectorAll(".staff-tab-btn");
  tabs.forEach(tab => {
    tab.onclick = function () {
      tabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");

      const target = this.dataset.tab;
      document.querySelectorAll(".staff-tab-pane").forEach(pane => {
        pane.style.display = (pane.id === target) ? "block" : "none";
      });
    };
  });
}

/* ==========================================================================
   DOCUMENT VIEWER & DOWNLOAD MODAL
   ========================================================================== */
function initDocumentViewerModal() {
  const modal = document.getElementById("docViewerModal");
  const closeBtn = document.getElementById("docViewerCloseBtn");

  if (closeBtn && modal) {
    closeBtn.onclick = () => modal.classList.remove("active");
  }
  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) modal.classList.remove("active");
    };
  }
}

function viewDocument(docId) {
  const docs = StorageManager.getCorrespondence(activeCaseRef);
  const doc = docs.find(d => d.id === docId);
  const modal = document.getElementById("docViewerModal");

  if (!doc || !modal) return;

  document.getElementById("viewDocRefNumber").textContent = doc.refNumber;
  document.getElementById("viewDocType").textContent = doc.type.toUpperCase();
  document.getElementById("viewDocDate").textContent = doc.date;
  document.getElementById("viewDocTitle").textContent = doc.title;
  document.getElementById("viewDocSignatory").textContent = doc.signatory;
  document.getElementById("viewDocContent").innerHTML = doc.content.replace(/\n/g, "<br>");

  modal.classList.add("active");
}
window.viewDocument = viewDocument;

function downloadDocument(docId) {
  const docs = StorageManager.getCorrespondence(activeCaseRef);
  const doc = docs.find(d => d.id === docId);
  if (!doc) return;

  // Generate plain text formal legal letterhead file
  const fullText = `====================================================================
ELVERNEL, NAJWA & CO. — ADVOCATES & SOLICITORS
No. 12, Jalan Kristal K7/K, Seksyen 7, 40000 Shah Alam, Selangor, Malaysia
Phone: +60 3-9876 5432 | Fax: +60 3-9876 5433 | contact@elvernelnajwa.com
====================================================================

REFERENCE NUMBER : ${doc.refNumber}
DOCUMENT TYPE    : ${doc.type.toUpperCase()}
DATE OF ISSUE    : ${doc.date}
SIGNING COUNSEL  : ${doc.signatory}
CASE MATTER      : ${doc.caseRef}

TITLE:
${doc.title}

--------------------------------------------------------------------
LEGAL TEXT & RECORD:
--------------------------------------------------------------------
${doc.content}

====================================================================
ISSUED PURSUANT TO THE LEGAL PROFESSION ACT 1976
STRICTLY PRIVILEGED & CONFIDENTIAL (EVIDENCE ACT 1950, S.126 & S.129)
====================================================================`;

  const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${doc.refNumber.replace(/[\/\\]/g, "_")}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
window.downloadDocument = downloadDocument;

/* ==========================================================================
   TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById("portalToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "portalToast";
    toast.style.position = "fixed";
    toast.style.bottom = "2rem";
    toast.style.right = "2rem";
    toast.style.background = "#0A2536";
    toast.style.border = "1px solid #DAF6EF";
    toast.style.color = "#F3FAFF";
    toast.style.padding = "0.85rem 1.4rem";
    toast.style.borderRadius = "4px";
    toast.style.boxShadow = "0 8px 24px rgba(0,0,0,0.5)";
    toast.style.zIndex = "3000";
    toast.style.fontSize = "0.85rem";
    toast.style.transition = "opacity 0.3s ease";
    document.body.appendChild(toast);
  }
  toast.textContent = `✓ ${message}`;
  toast.style.opacity = "1";
  setTimeout(() => {
    toast.style.opacity = "0";
  }, 2800);
}
