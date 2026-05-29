# Product Marketing Context — NEBians

*Last updated: 2026-05-29*

## Product Overview

**One-liner:**
NEBians is the only offline-first study platform built specifically for Nepali NEB students.

**What it does:**
A PWA (installable web app) that lets students download NEB-aligned study resources (notes, past papers, textbooks, practice sets), annotate PDFs offline, ask questions in a community forum, and track their study progress — all without worrying about internet connectivity.

**Product category:**
Ed-tech / Study resource platform / Student productivity tool

**Product type:**
Freemium PWA (Progressive Web App) with web + mobile experience

**Business model:**
Freemium — free tier with 70% of resources; Pro tier (NPR 99-149/month) for unlimited downloads, advanced annotations, and priority support. School subscriptions (NPR 2,999/year per class) for teacher dashboards.

---

## Target Audience

**Target students:**
- Grade 10 (SEE) students preparing for board exams
- Grade 11-12 (NEB) students in Science, Management, and Humanities streams
- Primarily ages 15-19
- Urban: Kathmandu Valley, Pokhara, Birgunj, Butwal
- Rural: All 7 provinces with intermittent internet

**Decision-makers (for school partnerships):**
- School principals and administrators
- Subject teachers (especially Science and Mathematics)
- Parents (indirectly — they pay for coaching, books, and eventually subscriptions)

**Primary use cases:**
1. Download and read study materials offline during power/internet outages
2. Find reliable, teacher-verified notes instead of scattered Facebook PDFs
3. Ask questions and get answers from peers and teachers in the forum
4. Practice with past papers and track progress

**Jobs to be done:**
- "Help me score higher on my NEB exams without spending a fortune on coaching"
- "Give me access to quality study materials even when I don't have internet"
- "Connect me with other students who can help me understand difficult topics"

---

## Personas

### Persona 1: "Anxious Achiever" — Grade 12 Science Student

**Profile:**
- Age: 17-18
- Location: Kathmandu or Pokhara
- Stream: Science
- Studies: 6-8 hours/day, attends coaching classes
- Device: Mid-range Android phone (under NPR 25,000)
- Data plan: 1-2 GB/month, used carefully

**Pain points:**
1. Scattered resources — notes in WhatsApp, past papers in Facebook groups, textbooks at school
2. Coaching is expensive (NPR 10,000-30,000/month) but still needs supplementary materials
3. Internet is unreliable; can't always stream video or download large files
4. Doesn't know which resources are accurate or up-to-date

**Desired outcomes:**
- Score 3.6+ GPA in NEB exams
- Reduce time spent searching for study materials
- Study effectively even during load-shedding or network issues

**Alternatives considered:**
- MeroAnswer (too basic, no offline)
- YouTube videos (data-intensive, not structured)
- Physical guidebooks (expensive, heavy, static)
- Coaching center notes (scattered, not digital)

**Key vocabulary:**
- "NEB notes"
- "Past papers"
- "SEE preparation"
- "GPA"
- "Science stream"
- "Coaching"

---

### Persona 2: "Rural Striver" — Grade 10 Student

**Profile:**
- Age: 15-16
- Location: Rural Nepal (province outside Kathmandu Valley)
- School: Government or community school
- Device: Entry-level Android phone (parents' hand-me-down)
- Data plan: Minimal; relies on Wi-Fi at school or friend's house

**Pain points:**
1. No access to quality coaching or tutoring
2. Teachers are overworked; can't get individual help
3. No money for expensive guidebooks
4. Internet is sporadic; can't rely on online-only resources

**Desired outcomes:**
- Pass SEE with good marks to get into a good +2 college
- Access the same quality materials as Kathmandu students
- Study without needing constant internet

**Alternatives considered:**
- School textbooks only (insufficient for competitive exams)
- Free Facebook group PDFs (unreliable, scattered)
- Nothing (just hopes for the best)

---

### Persona 3: "The Teacher Advocate" — Grade 11-12 Physics Teacher

**Profile:**
- Age: 30-50
- Location: Kathmandu Valley or major city
- Teaches: Physics, Chemistry, or Mathematics
- Tech comfort: Moderate; uses Facebook and YouTube

**Pain points:**
1. Students keep asking for notes and past papers; hard to distribute to everyone
2. Wants to help students outside class hours but lacks a platform
3. Frustrated by students using inaccurate internet resources

**Desired outcomes:**
- Easily share verified notes with all students
- Answer student questions in a structured forum
- Track which students are studying and which topics they're struggling with

**Alternatives considered:**
- Facebook groups (unorganized, hard to moderate)
- WhatsApp broadcast lists (limited reach, chaotic)
- Physical handouts (time-consuming, not scalable)

---

## Problems & Pain Points

**Core problem:**
Nepali students preparing for NEB/SEE exams lack a single, reliable, offline-capable platform for accessing study materials, asking questions, and tracking progress. Current solutions are either too expensive (coaching), unreliable (Facebook PDFs), or online-only (MeroAnswer).

**Why alternatives fall short:**
1. **MeroAnswer** — Dated UI, no offline mode, no PDF annotation, limited community
2. **Hamro Note / GBS Note** — Static PDF dumps with no interactivity, no search, no forum
3. **YouTube** — Data-intensive, unstructured, no offline access, ad-heavy
4. **Coaching centers** — Effective but expensive (NPR 10k-30k/month), not scalable, inaccessible to rural students
5. **Facebook groups** — Unorganized, files get lost, no search functionality, filled with spam

**What it costs them:**
- Time: 2-3 hours/day searching for and organizing study materials
- Money: NPR 10,000-30,000/month for coaching; NPR 500-800 per guidebook
- Opportunity: Rural students fall behind urban peers due to resource inequality
- Emotional stress: Anxiety about exam preparation, fear of falling behind classmates

**Emotional tension:**
- "I know I need to study more, but I don't know where to find good materials."
- "My friends in Kathmandu have access to better coaching and notes. I'm already behind."
- "I can't afford another guidebook, but my textbook isn't enough."

---

## Competitive Landscape

**Direct:**
- MeroAnswer — falls short because dated UI, no offline, no annotation
- Hamro Note — falls short because static content, no interactivity
- GBS Note — falls short because scattered files, no app experience

**Secondary:**
- YouTube study channels — falls short because data-intensive, unstructured, no offline
- Physical guidebooks (Asmita, Nepalaya) — falls short because static, expensive, heavy

**Indirect:**
- Coaching centers — falls short because expensive, inaccessible to rural students, not scalable
- Doing nothing / hoping for the best — falls short because results are poor

---

## Differentiation

**Key differentiators:**
1. **Offline-first architecture** — Download resources, annotate PDFs, read notes without internet. No competitor markets this.
2. **Teacher-verified content** — Content is sourced from and verified by active NEB teachers, not scraped from random sources.
3. **Community forum** — Peer learning + teacher answers in one place. Not just Q&A; a community.
4. **Modern, fast PWA** — Native app feel without app store friction. Works on low-end Android devices.
5. **Subject + grade + stream alignment** — Content is organized exactly along NEB syllabus lines.

**How we do it differently:**
- We built the entire platform around the reality of Nepal's internet infrastructure
- We partner with teachers instead of replacing them
- We organize content by NEB syllabus, not generic categories

**Why that's better:**
- Students can study during load-shedding, in rural areas, or when data runs out
- Parents trust teacher-verified content over random internet PDFs
- Students find exactly what they need for their specific grade and stream

**Why customers choose us:**
- "It works even when my internet doesn't."
- "The notes are actually accurate — my teacher uses this too."
- "I don't have to scroll through Facebook groups anymore."

---

## Objections & Anti-Personas

| Objection | Response |
|-----------|----------|
| "Why pay when I can get PDFs for free on Facebook?" | "Free PDFs are scattered, unverified, and disappear. NEBians organizes everything by your syllabus and works offline." |
| "I already go to coaching. Why do I need this?" | "Coaching gives you 2 hours/day. NEBians gives you resources for the other 22 hours — notes, past papers, and a community to ask questions anytime." |
| "My phone is old and slow." | "NEBians is a lightweight PWA designed for low-end Android phones. It takes less space than Facebook." |
| "I don't trust digital platforms for education." | "Our content is verified by active NEB teachers, not random internet sources. Schools are already partnering with us." |

**Anti-persona:**
- Students with unlimited internet and budget who only use premium coaching + international platforms (Byju's, etc.)
- Students who don't care about grades or exam preparation
- Students without smartphones (rare but exists)

---

## Switching Dynamics

**Push (what drives them away from current solution):**
- Facebook PDFs get lost, are inaccurate, or are spam-filled
- YouTube videos consume too much data and aren't structured
- Coaching is too expensive or too far away
- Physical guidebooks are heavy, expensive, and become outdated

**Pull (what attracts them to NEBians):**
- Offline access to everything
- Teacher-verified, organized content
- Community of peers for help
- Free tier with no risk

**Habit (what keeps them stuck with current approach):**
- "I've always used Facebook groups for notes"
- "My friends all go to the same coaching center"
- "I already bought guidebooks for this year"

**Anxiety (what worries them about switching):**
- "Will the content actually be accurate?"
- "What if I waste time learning a new app?"
- "Do I have to pay?"

---

## Customer Language

**How they describe the problem:**
- "I spend hours searching for NEB notes on Facebook."
- "My internet is too slow to watch YouTube videos."
- "I can't afford coaching, so I need good self-study materials."
- "The past papers I found online had wrong answers."

**How they describe us (aspirational):**
- "Finally, a study app that actually works in Nepal."
- "I can study during load-shedding!"
- "My teacher recommended this."
- "Everything is organized by subject and grade."

**Words to use:**
- NEB, SEE, GPA, board exam
- Notes, past papers, practice sets
- Offline, download, study anywhere
- Teacher-verified, accurate, reliable
- Free, affordable, save money

**Words to avoid:**
- "SaaS", "platform", "solution" — too corporate
- "Disrupt", "revolutionize" — overpromising
- "AI-powered", "machine learning" — irrelevant to students unless proven
- English jargon that doesn't translate to Nepali context

---

## Brand Voice

**Tone:**
Confident, supportive, straightforward. Like a smart older sibling who's been through NEB and knows the shortcuts.

**Style:**
- Direct and clear — no fluff
- Action-oriented — "Download and start studying"
- Empathetic — acknowledges the stress of board exams
- Proudly Nepali — celebrates local achievement

**Personality:**
1. **Helpful** — Always there when you need to study
2. **Trustworthy** — Content is accurate; promises are kept
3. **Smart** — Knows the NEB syllabus inside out
4. **Approachable** — Not intimidating; for every student
5. **Proud** — Celebrates Nepali student success

---

## Proof Points

**Metrics (to be tracked):**
- [ ] Number of students using the app
- [ ] Average time spent studying per session
- [ ] Number of resources downloaded
- [ ] Forum questions answered
- [ ] Teacher partnerships signed
- [ ] Schools onboarded

**Value themes:**

| Theme | Proof |
|-------|-------|
| Offline access | "Works without internet — tested in rural Nepal" |
| Teacher-verified | "Content reviewed by [X] active NEB teachers" |
| Comprehensive | "[X] past papers, [Y] notes, [Z] practice sets" |
| Affordable | "Free tier available; Pro costs less than 1 guidebook" |
| Community | "[X] students helping each other daily" |

---

## Goals

**Business goal:**
Become the default study platform for Nepali NEB/SEE students within 24 months.

**Key conversion actions:**
1. Install PWA to home screen
2. Download first resource
3. Create account / sign up
4. Upgrade to Pro (Month 12+)
5. Refer a friend

**Current metrics:**
- App status: MVP with mock data
- Users: 0 (pre-launch)
- Content: Mock data only
- Teachers partnered: 0
- Schools partnered: 0

---

**This document is used by all marketing skills. Update when positioning, audience, or messaging changes.**
