/* ==========================================================================
   ELVERNEL, NAJWA & CO. — ADVOCATES & SOLICITORS
   Data Management & State Synchronization
   Persistent storage via browser localStorage
   ========================================================================== */

const FIRM_CONFIG = {
  name: "Elvernel, Najwa & Co.",
  subtitle: "Advocates & Solicitors",
  address: "No. 12, Jalan Kristal K7/K, Seksyen 7, 40000 Shah Alam, Selangor, Malaysia",
  phone: "+60 3-9876 5432",
  fax: "+60 3-9876 5433",
  email: "contact@elvernelnajwa.com",
  practice: "Corporate & Commercial, focusing on SaaS contracts, technology disputes, and cross-border commercial law.",
  partners: [
    {
      id: "partner-1",
      name: "Elvernel Leosard Raymond Abin",
      qualification: "LL.B (UiTM)",
      role: "Managing Partner",
      specialization: "SaaS Contracts & High Court Commercial Advocacy",
      phone: "+60 11-7121 1583",
      email: "elvernel@elvernelnajwa.com",
      initials: "EA"
    },
    {
      id: "partner-2",
      name: "Nik Najwa Nabilah Binti Nik Fakhzan Fahmi",
      qualification: "LL.B (UiTM)",
      role: "Partner",
      specialization: "Technology Law, Cloud Agreements & Data Licensing",
      phone: "+60 13-348 0744",
      email: "najwa@elvernelnajwa.com",
      initials: "NN"
    },
    {
      id: "partner-3",
      name: "Muthusamy A/L Gopal",
      qualification: "LL.B (UUM)",
      role: "Partner",
      specialization: "Corporate Litigation & Contracts Act 1950 Remedies",
      phone: "+60 19-567 8080",
      email: "muthusamy@elvernelnajwa.com",
      initials: "MG"
    },
    {
      id: "partner-4",
      name: "Vincent Chee",
      qualification: "LL.B (UM)",
      role: "Partner",
      specialization: "Cross-Border Commercial Law & APAC Transactions",
      phone: "+60 10-248 5288",
      email: "vincentch@elvernelnajwa.com",
      initials: "VC"
    }
  ]
};

// Work status options required by prompt
const WORK_STATUSES = [
  "Under Review",
  "Initial Consultation",
  "Documents Requested",
  "In Progress",
  "Awaiting Client",
  "Settlement Negotiation",
  "Filed in Court",
  "Completed"
];

// Initial mock cases for demonstration and testing
const DEFAULT_CASES = [
  {
    id: "case-001",
    ref: "EN-2026-084",
    clientName: "CloudTech Solutions Sdn Bhd",
    clientEmail: "azman.iskandar@cloudtech.com.my",
    clientPhone: "+60 12-345 6789",
    matter: "SaaS Implementation Default & Liquidated Damages Claim",
    opposingParty: "DataForge Cloud Ltd",
    leadPartner: "Elvernel Leosard Raymond Abin, LL.B (UiTM)",
    dateCommenced: "12 Jan 2026",
    status: "Settlement Negotiation",
    claimAmount: "RM 1,850,000",
    courtForum: "High Court of Malaya at Shah Alam (Commercial Division)",
    currentMilestone: 4
  },
  {
    id: "case-002",
    ref: "EN-2026-079",
    clientName: "NexaPay Gateway Sdn Bhd",
    clientEmail: "legal@nexapay.com.my",
    clientPhone: "+60 17-889 1234",
    matter: "Cross-Border Master SaaS & Regional Payment Gateway Licensing",
    opposingParty: "Pacific FinTech Holdings Pte Ltd (Singapore)",
    leadPartner: "Vincent Chee, LL.B (UM)",
    dateCommenced: "05 Feb 2026",
    status: "In Progress",
    claimAmount: "USD 620,000",
    courtForum: "AIAC Arbitration / Cross-Border Advisory",
    currentMilestone: 3
  },
  {
    id: "case-003",
    ref: "EN-2026-071",
    clientName: "OmniRetail Technologies Sdn Bhd",
    clientEmail: "operations@omniretail.my",
    clientPhone: "+60 13-902 3344",
    matter: "SaaS Warranty Repudiation & High Court Writ for Critical Outage",
    opposingParty: "Vortex Cloud Infrastructure Inc",
    leadPartner: "Muthusamy A/L Gopal, LL.B (UUM)",
    dateCommenced: "18 Nov 2025",
    status: "Filed in Court",
    claimAmount: "RM 2,400,000",
    courtForum: "High Court of Malaya at Kuala Lumpur",
    currentMilestone: 4
  },
  {
    id: "case-004",
    ref: "EN-2026-062",
    clientName: "BioHealth APAC Systems",
    clientEmail: "counsel@biohealth-apac.com",
    clientPhone: "+60 16-778 9900",
    matter: "Cloud SLA Failure & Multi-Tier Service Credit Renegotiation",
    opposingParty: "Apex Data Centres Berhad",
    leadPartner: "Nik Najwa Nabilah Binti Nik Fakhzan Fahmi, LL.B (UiTM)",
    dateCommenced: "04 Oct 2025",
    status: "Completed",
    claimAmount: "RM 750,000",
    courtForum: "Institutional Mediation & Contract Amendment",
    currentMilestone: 5
  },
  {
    id: "case-005",
    ref: "EN-2026-091",
    clientName: "SecureLedger AI Ltd",
    clientEmail: "founders@secureledger.io",
    clientPhone: "+60 11-2300 4567",
    matter: "Proprietary Algorithm Misuse & Escrow Agreement Enforcement",
    opposingParty: "Cognitive Synthetics Corp",
    leadPartner: "Elvernel Leosard Raymond Abin, LL.B (UiTM)",
    dateCommenced: "22 Mar 2026",
    status: "Initial Consultation",
    claimAmount: "RM 3,100,000",
    courtForum: "Advisory / Pre-Action Review",
    currentMilestone: 1
  }
];

// Formal Correspondence records for Client Case EN-2026-084
const DEFAULT_CORRESPONDENCE = [
  {
    id: "doc-001",
    caseRef: "EN-2026-084",
    refNumber: "EN/LIT/2026/084-OPN1",
    type: "Opinion",
    title: "Written Legal Opinion: Cause of Action under Contracts Act 1950 (s.74, s.75)",
    date: "18 Jan 2026",
    signatory: "Elvernel Leosard Raymond Abin, LL.B (UiTM)",
    summary: "Formal opinion analyzing Vendor's failure to deploy Core Milestone 3. Grounds established under Section 74 Contracts Act 1950 for consequential loss and enforceability of liquidated damages clause.",
    content: `IN THE MATTER OF AN INTENDED CLAIM
BETWEEN: CLOUDTECH SOLUTIONS SDN BHD (CLIENT)
AND: DATAFORGE CLOUD LTD (VENDOR)

WRITTEN LEGAL OPINION ON LIABILITY AND DAMAGES
COUNSEL: Elvernel Leosard Raymond Abin, LL.B (UiTM)
DATE: 18th January 2026

1. INSTRUCTIONS
We have been instructed by CloudTech Solutions Sdn Bhd to advise on rights, contractual remedies, and quantum of damages arising from DataForge Cloud Ltd's non-performance under the Enterprise SaaS Master Agreement dated 14th June 2024.

2. FACTUAL MATRIX & CAUSE OF ACTION
The Vendor committed fundamental breach by failing to deliver Core API Integration Modules (Milestone 3) within the agreed cure period.

3. STATUTORY ASSESSMENT UNDER THE CONTRACTS ACT 1950
(a) Section 74 (Compensation for Loss or Damage Caused by Breach):
Under the rule in Hadley v Baxendale as codified in s.74, our client is entitled to compensation for direct loss naturally arising in the usual course of things, amounting to RM 1,150,000 in operational losses.

(b) Section 75 (Liquidated Ascertained Damages):
Applying the Federal Court principles in Cubic Electronics Sdn Bhd v Mars Telecommunications Sdn Bhd [2019] 6 MLJ 15, the liquidated damages stipulation of RM 700,000 is legally enforceable as reasonable compensation without requiring strict proof of identical actual loss.

4. RECOMMENDATION
We advise immediate service of a formal Letter of Demand, while simultaneously drafting a Heads of Agreement to explore structured settlement prior to filing a Writ in the High Court.`
  },
  {
    id: "doc-002",
    caseRef: "EN-2026-084",
    refNumber: "EN/LIT/2026/084-LOD",
    type: "Letter",
    title: "Formal Letter of Demand (Without Prejudice Save as to Costs)",
    date: "26 Jan 2026",
    signatory: "Elvernel Leosard Raymond Abin, LL.B (UiTM)",
    summary: "Statutory notice of breach dispatched to DataForge Cloud Ltd, demanding remedy of default or payment of RM 1,850,000 within fourteen (14) days.",
    content: `ELVERNEL, NAJWA & CO.
ADVOCATES & SOLICITORS
No. 12, Jalan Kristal K7/K, Seksyen 7, 40000 Shah Alam, Selangor

26th January 2026
BY REGISTERED POST & COURIER

To: The Board of Directors
DataForge Cloud Ltd
Level 22, Menara Horizon, 50450 Kuala Lumpur

DEAR SIRS / MADAMS,

RE: DEMAND FOR PAYMENT OF RM 1,850,000 AND NOTICE OF FUNDAMENTAL BREACH OF ENTERPRISE SAAS MASTER SERVICE AGREEMENT DATED 14 JUNE 2024

We act for and on behalf of CloudTech Solutions Sdn Bhd.

TAKE NOTICE that your company has committed repudiatory breach of Clause 8.2 (Service Level Specifications) and Clause 14 (Milestone Deadlines).

WE HEREBY DEMAND on behalf of our client that you make full payment of the liquidated sum of RM 1,850,000 within FOURTEEN (14) DAYS from the date hereof, failing which we have strict instructions to file a Writ of Summons and Statement of Claim in the High Court of Malaya without further reference to you.

Yours faithfully,
ELVERNEL, NAJWA & CO.
Advocates & Solicitors`
  },
  {
    id: "doc-003",
    caseRef: "EN-2026-084",
    refNumber: "EN/ADV/2026/084-MEMO",
    type: "Memorandum",
    title: "Privileged Client Memorandum: Strategic Settlement vs High Court Writ",
    date: "14 Feb 2026",
    signatory: "Muthusamy A/L Gopal, LL.B (UUM)",
    summary: "Privileged memorandum comparing litigation timeline in the High Court of Malaya against structured Heads of Agreement settlement with service credit concessions.",
    content: `PRIVILEGED & CONFIDENTIAL (SOLICITOR-CLIENT PRIVILEGE)
MEMORANDUM FOR THE BOARD OF CLOUDTECH SOLUTIONS SDN BHD
PREPARED BY: Muthusamy A/L Gopal & Elvernel Leosard

COMPARATIVE ANALYSIS OF DISPUTE PATHWAYS:
Option 1 (Litigation): Filing Writ in Shah Alam High Court. Estimated timeline 12-18 months. Strong probability of success under Contracts Act 1950, but exposes operational architecture to public trial discovery.
Option 2 (Settlement via Heads of Agreement): Negotiating partial refund of RM 950,000 cash plus RM 400,000 in immediate service credits with revised liability caps.
We strongly recommend proceeding with Option 2 at the scheduled milestone conference.`
  },
  {
    id: "doc-004",
    caseRef: "EN-2026-084",
    refNumber: "EN/AGR/2026/084-HOA",
    type: "Agreement",
    title: "Draft Heads of Agreement (Settlement & Covenant Restructuring)",
    date: "02 Mar 2026",
    signatory: "Vincent Chee, LL.B (UM)",
    summary: "Structured settlement agreement encompassing cash restitution of RM 950,000, 24-month waiver of tier-1 support fees, and mutual confidentiality discharge.",
    content: `HEADS OF AGREEMENT (SETTLEMENT AND COVENANT RESTRUCTURING)
DRAFT FOR CLIENT REVIEW
DATED THIS 2ND DAY OF MARCH 2026

BETWEEN
(1) CLOUDTECH SOLUTIONS SDN BHD
(2) DATAFORGE CLOUD LTD

KEY COMMERCIAL TERMS:
1. Restitution Payment: DataForge Cloud Ltd agrees to pay the sum of RM 950,000 into the client account of Elvernel, Najwa & Co. within 14 banking days.
2. Service Credits: RM 400,000 credited towards future cloud consumption.
3. Revision of Terms: Mutual amendment of SLA uptime guarantee from 99.0% to 99.95% with immediate penalty triggers.
4. Mutual Release: Complete discharge of High Court claims upon full receipt.`
  },
  {
    id: "doc-005",
    caseRef: "EN-2026-084",
    refNumber: "EN/COR/2026/084-EML",
    type: "Email",
    title: "Formal Dispatch: Notice of Vendor's Acceptance of Settlement Framework",
    date: "25 Mar 2026",
    signatory: "Elvernel Leosard Raymond Abin, LL.B (UiTM)",
    summary: "Confirmation that opposing counsel (Messrs. Tan & Partners) has agreed in principle to the Heads of Agreement terms pending executive signing.",
    content: `FORMAL ELECTRONIC DISPATCH
DATE: 25th March 2026, 17:15 MYT
FROM: Elvernel Leosard Raymond Abin (elvernel@elvernelnajwa.com)
TO: Azman Iskandar, Director (CloudTech Solutions Sdn Bhd)

Dear Mr. Azman,

We write to confirm that opposing counsel for DataForge Cloud Ltd has formally communicated acceptance of our proposed Heads of Agreement draft terms.
A formal milestone meeting is scheduled for 18th October 2026 at our Shah Alam Chambers for final execution of the deed.

Sincerely,
Elvernel Leosard Raymond Abin
Managing Partner, Elvernel, Najwa & Co.`
  }
];

// Scheduled and Milestone Meetings
const DEFAULT_MEETINGS = [
  {
    id: "meet-001",
    caseRef: "EN-2026-084",
    title: "Milestone 4: Heads of Agreement Terms & Settlement Execution",
    date: "2026-10-18",
    time: "10:30 AM (MYT)",
    format: "In-Person (Level 3 Boardroom, Shah Alam Chambers)",
    partner: "Elvernel Leosard Raymond Abin, LL.B (UiTM)",
    agenda: "Review final execution copies of the Settlement Deed, verify telegraphic transfer escrows, and execute discharge covenants."
  },
  {
    id: "meet-002",
    caseRef: "EN-2026-084",
    title: "Pre-Execution Risk Assessment & Tax Review",
    date: "2026-10-25",
    time: "02:30 PM (MYT)",
    format: "Secured Encrypted Video Conference",
    partner: "Vincent Chee, LL.B (UM)",
    agenda: "Cross-border tax implications of SaaS settlement restitution and execution of Malaysian Bar Council compliance disclosures."
  }
];

// Initial Consultation Requests from Part 1 public form
const DEFAULT_REQUESTS = [
  {
    id: "req-101",
    name: "Datuk Seri Imran Razak",
    email: "imran@fintechhorizons.my",
    phone: "+60 12-229 8811",
    practiceArea: "Technology Dispute",
    summary: "Critical failure of core banking SaaS modules deployed by regional software provider. Seeking advice on High Court writ and liquidated damages under Section 74 Contracts Act 1950.",
    date: "01 Oct 2026",
    status: "Pending",
    files: ["CoreBanking_SLA_Agreement.pdf", "Audit_Downtime_Report.docx"]
  },
  {
    id: "req-102",
    name: "Elena Tan Siew Lan",
    email: "elena.tan@vanguard-logistics.com",
    phone: "+60 17-654 3210",
    practiceArea: "Cross-Border Commercial",
    summary: "Dispute involving US-headquartered cloud ERP vendor demanding unilateral fee escalation. Need renegotiation and Heads of Agreement draft.",
    date: "28 Sep 2026",
    status: "Pending",
    files: ["Master_Services_Agreement_2023.pdf"]
  }
];

// LocalStorage Helper Engine
const StorageManager = {
  getCases: function() {
    const data = localStorage.getItem("en_cases");
    if (!data) {
      localStorage.setItem("en_cases", JSON.stringify(DEFAULT_CASES));
      return DEFAULT_CASES;
    }
    return JSON.parse(data);
  },

  saveCases: function(cases) {
    localStorage.setItem("en_cases", JSON.stringify(cases));
  },

  updateCaseStatus: function(caseRef, newStatus) {
    const cases = this.getCases();
    const targetCase = cases.find(c => c.ref === caseRef);
    if (targetCase) {
      targetCase.status = newStatus;
      this.saveCases(cases);
      return true;
    }
    return false;
  },

  getCorrespondence: function(caseRef = "EN-2026-084") {
    const data = localStorage.getItem("en_correspondence");
    if (!data) {
      localStorage.setItem("en_correspondence", JSON.stringify(DEFAULT_CORRESPONDENCE));
      return DEFAULT_CORRESPONDENCE.filter(d => d.caseRef === caseRef);
    }
    const allDocs = JSON.parse(data);
    return allDocs.filter(d => d.caseRef === caseRef);
  },

  addCorrespondence: function(doc) {
    let allDocs = [];
    const data = localStorage.getItem("en_correspondence");
    if (data) {
      allDocs = JSON.parse(data);
    } else {
      allDocs = [...DEFAULT_CORRESPONDENCE];
    }
    allDocs.unshift(doc);
    localStorage.setItem("en_correspondence", JSON.stringify(allDocs));
  },

  getMeetings: function(caseRef = "EN-2026-084") {
    const data = localStorage.getItem("en_meetings");
    if (!data) {
      localStorage.setItem("en_meetings", JSON.stringify(DEFAULT_MEETINGS));
      return DEFAULT_MEETINGS.filter(m => m.caseRef === caseRef);
    }
    const allMeetings = JSON.parse(data);
    return allMeetings.filter(m => m.caseRef === caseRef);
  },

  addMeeting: function(meeting) {
    let allMeetings = [];
    const data = localStorage.getItem("en_meetings");
    if (data) {
      allMeetings = JSON.parse(data);
    } else {
      allMeetings = [...DEFAULT_MEETINGS];
    }
    allMeetings.push(meeting);
    localStorage.setItem("en_meetings", JSON.stringify(allMeetings));
  },

  getRequests: function() {
    const data = localStorage.getItem("en_requests");
    if (!data) {
      localStorage.setItem("en_requests", JSON.stringify(DEFAULT_REQUESTS));
      return DEFAULT_REQUESTS;
    }
    return JSON.parse(data);
  },

  addRequest: function(req) {
    const requests = this.getRequests();
    requests.unshift(req);
    localStorage.setItem("en_requests", JSON.stringify(requests));
  },

  updateRequestStatus: function(requestId, newStatus) {
    const requests = this.getRequests();
    const req = requests.find(r => r.id === requestId);
    if (req) {
      req.status = newStatus;
      localStorage.setItem("en_requests", JSON.stringify(requests));
      return req;
    }
    return null;
  }
};
