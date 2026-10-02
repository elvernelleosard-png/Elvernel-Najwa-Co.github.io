# Elvernel, Najwa & Co. — Advocates & Solicitors
## Corporate & Commercial Practice Website & Case Management System

Welcome to the official digital platform for **Elvernel, Najwa & Co.**, a premier Malaysian law firm based in Shah Alam, Selangor. This project is built using clean, modular **HTML5, CSS3, and modern JavaScript**, designed to be accessible, elegant, and straightforward to run without any prior programming experience.

---

## 📁 Project Structure & File Guide

```
Firm Website/
│
├── index.html              # PART 1: Public Law Firm Website
├── portal.html             # PART 2: Client & Firm Case Management System
│
├── css/
│   ├── style.css           # Brand palette, typography, hero pinwheel cards, responsive layouts
│   └── portal.css          # Case tracker table, milestone progress bar, formal document letterheads
│
├── js/
│   ├── data.js             # Firm configuration, partner profiles, initial cases, and localStorage engine
│   ├── main.js             # Hero clockwise scroll rotation, interactive cards, consultation form intake
│   └── portal.js           # Case status dropdowns (Google Docs style), document viewer, meeting scheduler
│
├── assets/
│   └── images/
│       └── logo.png        # Official firm logo with "EN" monogram & typography
│
└── README.md               # User guide, running instructions & Malaysian legal compliance advisory
```

---

## 🚀 Step-by-Step Instructions: How to Run the Website

You **do not need to install any software, servers, or compilers**. Everything runs directly in your web browser.

### Option 1: Open Directly in Any Browser (Zero Installation)
1. Open your computer's **File Explorer**.
2. Navigate to your folder: `Downloads\Firm Website`.
3. **Double-click `index.html`** to launch **Part 1 (Public Website)** in your default browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).
4. To test **Part 2 (Case Management System)**:
   - Click the **"Case Management Portal →"** button in the top navigation bar of `index.html`, OR
   - Double-click `portal.html` directly in your folder.

### Option 2: Using VS Code Live Server (If using an editor)
1. If you use Visual Studio Code, open the `Firm Website` folder.
2. Right-click `index.html` and select **"Open with Live Server"**.
3. It will open at `http://127.0.0.1:5500/index.html`.

---

## 🌟 Features Overview

### Part 1: Public Law Firm Website (`index.html`)
1. **Hero Pinwheel Rotation (Inspiration Design)**:
   - Centered around the firm's elegant **"EN" monogram**.
   - As you scroll down the page, **the 6 cards smoothly rotate clockwise**.
   - You can also click the manual **"Rotate ↻"** buttons.
   - **Interactive Cards**: Clicking any card opens a preview modal detailing that practice area, with a direct button to request a consultation.
2. **Firm Overview**: Highlights the firm's focus on Corporate & Commercial law, SaaS contracts, and High Court advocacy.
3. **Areas of Practice**:
   - SaaS Contracts (MSAs, SLAs, liability caps, data residency).
   - Technology Disputes (High Court writs, Contracts Act 1950 s.74/s.75, liquidated damages).
   - Cross-Border Commercial Law (APAC transactions, AIAC/SIAC arbitration).
4. **Our Consultation Approach (UK-Style, Formal)**:
   - Simple 4-stage workflow: *Initial Consultation → Progress Updates → Client Meetings → Documentation*.
   - Strict protocol: No casual instant messaging; all communications are formal and documented.
5. **How We Can Help in a SaaS Dispute (3 Strategic Cards)**:
   - **Litigation**: High Court writ, damages under Contracts Act 1950 (s.74/s.75), liquidated damages.
   - **Settlement**: Refund + partial compensation, Heads of Agreement (HoA), faster & relationship-preserving.
   - **Renegotiation**: Restructuring fees, liability caps, and service credit clauses.
6. **Legal Outcomes**: Representative case results with clearly marked placeholder badges ready for firm updates.
7. **Our Partners (4 Profile Cards)**:
   - Elvernel Leosard Raymond Abin, LL.B (UiTM) — Managing Partner
   - Nik Najwa Nabilah Binti Nik Fakhzan Fahmi, LL.B (UiTM) — Partner
   - Muthusamy A/L Gopal, LL.B (UUM) — Partner
   - Vincent Chee, LL.B (UM) — Partner
8. **Consultation Request Form**:
   - Collects Name, Email, Phone, Matter Category, Case Summary, and supporting document uploads (PDF, Word, Images).
   - Submissions **automatically save to Part 2** for review by the firm!

---

### Part 2: Client & Firm Case Management System (`portal.html`)
Seamlessly styled with the same visual identity (Cape Cod `#0A2536`, Obsidian `#33566D`, Pure Mint `#DAF6EF`, Pure White `#F3FAFF`).

#### Role Switcher Bar (Top of Portal)
Toggle between two experiences with a single click:
- **Client View** (e.g. `CloudTech Solutions Sdn Bhd - Ref: EN-2026-084`)
- **Firm Staff / Advocate View** (e.g. `Managing Partner: Elvernel Leosard Raymond Abin`)

#### For Clients:
- **Case Progress & Milestone Tracker**: Visual step-by-step indicator showing the active phase of the dispute.
- **Correspondence & Legal Opinions**: View and download formal letters, written legal opinions, memoranda, agreements, and formal emails in reverse date order. Clicking "View" opens a formal chambers letterhead with complete legal text; clicking "Download" generates a formal letter copy.
- **Scheduled Meetings**: View upcoming in-person and secure video conferences.
- **Upload Documents**: Submit additional contracts, downtime reports, and invoices directly to the case file.
- **Request Milestone Meeting**: Formally submit a meeting request tied to key case milestones.

#### For the Firm:
- **Case Progress Tracker (Google Docs / Spreadsheet style table)**:
  - Table of all active matters.
  - **Live Work Status Dropdown**: Change status directly within each row (*Under Review, Initial Consultation, Documents Requested, In Progress, Awaiting Client, Settlement Negotiation, Filed in Court, Completed*). Changes save immediately and sync with the client's dashboard!
- **Consultation Requests Queue**:
  - View inquiries submitted via Part 1.
  - **Accept Button**: Automatically registers a new case, creates a case file, and displays the client's direct access link.
  - **Decline Button**: Formally declines the request.
- **Upload & Dispatch Formal Documents**: Issue new formal letters, written legal opinions, memoranda, agreements, or formal emails to any client's case.
- **Schedule Milestone Conferences**: Schedule in-person or video meetings directly onto the client's calendar.

---

## 🔒 Security & Malaysian Data Protection Requirements (CRITICAL ADVISORY)

> [!IMPORTANT]
> **Please read this section carefully before putting this system into production with real clients.**

The code provided uses **HTML, CSS, JavaScript, and browser `localStorage`**. This is ideal for demonstration, client walkthroughs, and interface testing without needing a complex server setup. However, **`localStorage` stores data in your web browser on that specific computer and is NOT encrypted or secure enough for real, confidential client casework.**

Because your firm handles confidential legal disputes, trade secrets, and privileged documents, here is what you need to know and do:

### 1. Malaysian Legal & Regulatory Framework

#### (A) Legal Profession Act 1976 & Evidence Act 1950 (Advocate-Client Privilege)
* Under **Sections 126 and 129 of the Evidence Act 1950**, communications between an advocate & solicitor and their client are strictly privileged and protected from disclosure in court.
* Under the **Legal Profession (Practice and Etiquette) Rules 1978**, lawyers owe a fiduciary duty of absolute confidentiality to their clients.
* If confidential case files or letters of demand are stored on an unsecured server or accessible by third parties, you risk breaching advocate-client privilege and facing disciplinary proceedings before the **Malaysian Bar Council Disciplinary Board**.

#### (B) Personal Data Protection Act 2010 (PDPA)
The PDPA 2010 applies to any commercial organization processing personal data in Malaysia. You must comply with the **7 Data Protection Principles**:
1. **General Principle**: Personal data cannot be processed without written consent.
2. **Notice and Choice Principle**: You must provide a formal PDPA Notice (in both **English and Bahasa Malaysia**) informing clients what data is collected, why, and how it is protected.
3. **Disclosure Principle**: Client information cannot be disclosed to third parties without authorization.
4. **Security Principle (Section 9)**: You must implement technical security measures to prevent loss, misuse, modification, unauthorized access, or accidental disclosure.
5. **Retention Principle**: Documents must not be kept longer than necessary (though Malaysian Bar guidelines recommend retaining closed legal files for at least 7 to 12 years).
6. **Data Integrity Principle**: Ensure client records are accurate and up to date.
7. **Access Principle**: Clients have the legal right to request access to and correction of their personal data.

#### (C) Cybersecurity Act 2024
Malaysia's Cybersecurity Act 2024 imposes obligations regarding cybersecurity incident response and mandatory reporting of critical data breaches.

---

### 2. What Must Be Done to Make It Safe for Real Clients

To transition from this prototype to a production-ready legal system:

1. **User Authentication & Passwords**:
   - Clients and lawyers must log in with encrypted passwords.
   - Passwords must be hashed using industry-standard algorithms (such as `bcrypt` or `Argon2`).
   - Implement **Two-Factor Authentication (2FA)** via SMS OTP or an Authenticator App (Google Authenticator / Microsoft Authenticator).

2. **End-to-End Encryption**:
   - **In Transit**: Use **HTTPS with TLS 1.3** so data cannot be intercepted while travelling across the internet.
   - **At Rest**: Legal PDF/Word documents stored on the server must be encrypted with **AES-256**.

3. **Role-Based Access Control (RBAC)**:
   - A strict security rule ensuring that Client A can only view Client A's case files, with zero access to Client B's records.
   - Only authorized partners and associates assigned to a matter can view or edit its documents.

4. **Immutable Audit Trails**:
   - The system must record a log entry every time a document is viewed, uploaded, edited, or downloaded (recording timestamp, user ID, and IP address) to provide evidential integrity.

---

### 3. Simplest Recommended Backend Option (For Non-Coders)

Since HTML, CSS, and JavaScript alone cannot run a secure database or server-side encryption, here is the simplest, most practical path forward:

#### ⭐ Recommendation: Use **Supabase** (Easiest & Most Cost-Effective)
* **What it is**: Supabase is an all-in-one modern backend platform.
* **Why it fits your firm**:
  - It provides **user login with 2FA** out of the box with zero complex server management.
  - It provides an **encrypted PostgreSQL database** (which looks and feels just like an Excel spreadsheet).
  - It provides **Encrypted Private Document Storage** for legal files (PDF, Word, Excel) with signed expiration links.
  - It has a generous **Free Tier**, and paid tiers are very economical.
  - You can connect this website's existing HTML/CSS/JS directly to Supabase in less than an hour using the Supabase JavaScript library.

#### Alternative: Local Malaysian Cloud Hosting
* Under data residency recommendations, you can host your backend on cloud servers located physically in Malaysia (for example, **AWS Asia Pacific [Malaysia] Region**, launched in 2024, or Microsoft Azure / Google Cloud infrastructure in Kuala Lumpur/Cyberjaya) to guarantee that all legal data remains within Malaysian sovereign territory.

---

## 📞 Firm Chambers Contact Details

**Elvernel, Najwa & Co.**  
*Advocates & Solicitors*  
No. 12, Jalan Kristal K7/K, Seksyen 7, 40000 Shah Alam, Selangor, Malaysia  
- **Telephone:** +60 3-9876 5432  
- **Facsimile:** +60 3-9876 5433  
- **Email:** contact@elvernelnajwa.com  
- **Practice:** Corporate & Commercial Law | SaaS Contracts | Technology Disputes | Cross-Border Law  
