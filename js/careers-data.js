/* careers-data.js — what the opportunities board (js/careers.js) knows without the server.

   KINDS and CADRES label the posts health workers submit. DIRECTORY lists the
   official websites where real vacancies, scholarships and courses are
   announced: MedBridge does not run them and cannot check every call on them,
   so each one sends the reader to the organisation's own page. Every address
   was opened and checked when it was added. Nothing here is a vacancy. */
window.CAREERS = {
  KINDS: {
    job: { label: "Jobs", one: "Job", icon: "ward" },
    scholarship: { label: "Scholarships", one: "Scholarship", icon: "book" },
    fellowship: { label: "Fellowships & residency", one: "Fellowship", icon: "star" },
    training: { label: "Trainings & CPD", one: "Training", icon: "check" },
    conference: { label: "Conferences", one: "Conference", icon: "calendar" },
    research: { label: "Research & grants", one: "Research", icon: "clipboard" },
    volunteer: { label: "Volunteering", one: "Volunteer", icon: "users" }
  },
  MODES: { onsite: "On site", online: "Online", abroad: "Abroad", mixed: "Mixed" },
  CADRES: ["physician", "general practitioner", "resident", "health officer", "nurse", "midwife", "pharmacist", "anaesthetist", "emergency surgical officer", "paramedic", "student", "other"],
  DIRECTORY: [
    { group: "Jobs in Ethiopia", items: [
      { name: "Ministry of Health, Ethiopia", for: "Federal health vacancies, national programmes and announcements", url: "https://www.moh.gov.et/" },
      { name: "Ethiopian Public Health Institute (EPHI)", for: "Public health, laboratory and field epidemiology posts and trainings", url: "https://ephi.gov.et/" },
      { name: "Ethiopian Food and Drug Authority (EFDA)", for: "Regulatory and pharmacy posts and notices", url: "https://www.efda.gov.et/" },
      { name: "Ethiojobs", for: "Ethiopian job board: hospitals, NGOs and private clinics", url: "https://ethiojobs.net/" }
    ] },
    { group: "International and humanitarian jobs", items: [
      { name: "WHO careers", for: "World Health Organization posts, including the Ethiopia country office", url: "https://careers.who.int/" },
      { name: "WHO Regional Office for Africa", for: "News, programmes and calls across the African region", url: "https://www.afro.who.int/" },
      { name: "UNICEF careers", for: "Health and nutrition posts with UNICEF", url: "https://www.unicef.org/careers/" },
      { name: "United Nations careers", for: "All UN Secretariat vacancies", url: "https://careers.un.org/" },
      { name: "ReliefWeb jobs", for: "Humanitarian and NGO jobs — filter by Ethiopia", url: "https://reliefweb.int/jobs" },
      { name: "Médecins Sans Frontières", for: "Medical work with MSF in the field", url: "https://www.msf.org/work-msf" },
      { name: "ICRC careers", for: "International Committee of the Red Cross", url: "https://careers.icrc.org/" },
      { name: "Amref Health Africa", for: "African health NGO: jobs and training", url: "https://amref.org/" }
    ] },
    { group: "Scholarships and fellowships", items: [
      { name: "Chevening Scholarships", for: "UK government master's scholarships", url: "https://www.chevening.org/" },
      { name: "DAAD", for: "German scholarships, including public-health and medical programmes", url: "https://www.daad.de/en/" },
      { name: "Fulbright Foreign Student Program", for: "Graduate study in the United States", url: "https://foreign.fulbrightonline.org/" },
      { name: "Mastercard Foundation", for: "Scholars Program for young Africans", url: "https://mastercardfdn.org/" },
      { name: "Erasmus+ (Erasmus Mundus)", for: "European joint master's degrees with full scholarships", url: "https://erasmus-plus.ec.europa.eu/" },
      { name: "Study in Japan (MEXT)", for: "Japanese government scholarships", url: "https://www.studyinjapan.go.jp/" },
      { name: "Fogarty International Center (NIH)", for: "Global health research training and fellowships", url: "https://www.fic.nih.gov/" }
    ] },
    { group: "Trainings, CPD and postgraduate study", items: [
      { name: "OpenWHO", for: "Free WHO online courses with certificates", url: "https://openwho.org/" },
      { name: "Addis Ababa University", for: "Residency, specialty and postgraduate calls", url: "https://www.aau.edu.et/" }
    ] }
  ]
};
