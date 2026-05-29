# NEBians 90-Day Action Plan

**Based on:** Strategic Analysis & Go-to-Market Plan
**Period:** Month 1-3 (Foundation Phase)
**Goal:** Launch with enough high-quality content that students say "this is actually useful."

---

## Week 1-2: Content Sourcing & Teacher Partnerships

### Content Strategy
**Target:** Grade 12 Science (highest-value, most competitive segment)
**Content needed for launch:**
- 50+ past papers with solutions (NEB 2075-2081)
- 100+ practice question sets (20 per subject)
- 50+ teacher-verified notes (10 per subject)
- 10+ model test papers

### Teacher Outreach
**Target:** 10 teachers in Kathmandu/Pokhara
**Approach:**
1. Identify teachers via:
   - LinkedIn search: "Physics teacher Nepal", "NEB teacher Kathmandu"
   - School websites and Facebook pages
   - Existing coaching center networks
   - Personal network referrals

2. Outreach message template (see `docs/outreach/teacher-partnership-template.md`)

3. Offer structure:
   - Revenue share: 20-30% of Pro subscription revenue from their content
   - OR one-time payment: NPR 5,000-15,000 per subject bundle
   - Recognition: "Verified by [Teacher Name], [School]" on content

4. Content verification process:
   - Teacher submits notes/practice sets
   - Review for NEB syllabus alignment
   - Format for PDF viewer (A4, readable fonts)
   - Teacher approves final version

### Technical Tasks
- [ ] Set up content management system in Django backend
- [ ] Create teacher upload portal (basic)
- [ ] Implement content versioning
- [ ] Add content review workflow

---

## Week 3-4: Backend Realization

### Current State
Django backend is "outline/core" — models exist but no real API integration.

### Required Changes
1. **Complete the API layer:**
   - `GET /api/resources` — list with filtering (subject, grade, type)
   - `GET /api/resources/:id` — detail with download URL
   - `POST /api/resources/:id/download` — track download count
   - `GET /api/forum/questions` — list with pagination
   - `POST /api/forum/questions` — create question
   - `GET /api/forum/questions/:id/answers` — list answers
   - `POST /api/forum/questions/:id/answers` — create answer

2. **Authentication:**
   - JWT token implementation
   - Google OAuth integration
   - Email/password registration

3. **Database:**
   - Switch from SQLite to PostgreSQL (production-ready)
   - Set up migrations for all models
   - Add indexes for search performance

4. **File Storage:**
   - Set up AWS S3 or Cloudflare R2 for PDF storage
   - Implement signed URLs for downloads
   - Add file size limits and virus scanning

### Testing
- [ ] Unit tests for all API endpoints
- [ ] Integration tests for auth flow
- [ ] Load testing for concurrent downloads

---

## Week 5-6: Frontend Integration

### Replace Mock Data
1. Connect `lib/services.ts` to real API endpoints
2. Remove all mock data from frontend
3. Implement loading states and error handling
4. Add retry logic for failed requests

### Offline Mode Hardening
1. **Service Worker:**
   - Cache all downloaded PDFs
   - Cache user annotations
   - Sync annotations when back online
   - Handle cache eviction (LRU strategy)

2. **IndexedDB:**
   - Store downloaded resources metadata
   - Store reading progress
   - Store annotations
   - Implement cleanup for old data

3. **Testing:**
   - Test on low-end Android devices
   - Test with 2G connection
   - Test offline-after-online scenarios
   - Test cache size limits

### Performance Optimization
- [ ] Lazy load PDF viewer component
- [ ] Optimize images and thumbnails
- [ ] Implement pagination for resource lists
- [ ] Add search debouncing

---

## Week 7-8: Beta Launch

### Beta User Recruitment
**Target:** 100 beta users
**Sources:**
1. Personal network: Friends, family, former classmates
2. School partnerships: 2-3 schools in Kathmandu Valley
3. Social media: Facebook groups ("NEB Preparation", "SEE Guide")
4. Reddit: r/Nepal, r/NEPalEducation

### Beta Program Structure
- Private access via invite code
- Feedback form (in-app and Google Form)
- Weekly check-in via email/WhatsApp
- Bug reporting channel (GitHub Issues or WhatsApp group)

### Metrics to Track
- Daily active users (DAU)
- Resources downloaded per user
- Time spent in app
- Forum posts and engagement
- Offline usage percentage
- Crash reports

### Feedback Loop
1. Collect feedback daily
2. Prioritize bugs by severity
3. Ship fixes every 3-4 days
4. Communicate updates to beta users

---

## Month 2: Iteration & Content Expansion

### Week 5-8: Content Expansion
- Add Grade 11 Science content
- Add Grade 10 (SEE) content
- Begin Management stream content
- Create 10+ video explainer scripts (for YouTube)

### Week 5-8: Feature Iteration
Based on beta feedback:
- Improve search relevance
- Add bookmarking feature
- Enhance PDF annotation tools
- Add study timer / pomodoro feature
- Implement push notifications for forum replies

### Week 5-8: Landing Page
Create landing page (`app/landing/page.tsx`):
- Hero section with value proposition
- Feature highlights (offline, teacher-verified, community)
- Testimonials (from beta users)
- Download/install CTA
- FAQ section

---

## Month 3: Public Launch Prep

### Week 9-10: Marketing Assets
1. **Social media setup:**
   - TikTok account: @nebiansofficial
   - YouTube channel: NEBians
   - Facebook page: NEBians
   - Instagram: @nebiansofficial

2. **Content creation:**
   - 10 TikTok/Reels scripts (see `docs/marketing/tiktok-scripts.md`)
   - 5 YouTube video scripts (see `docs/marketing/youtube-scripts.md`)
   - 5 blog posts (see `docs/marketing/blog-posts.md`)
   - Visual assets: Logo animations, feature demos, student testimonials

3. **SEO setup:**
   - Google Search Console registration
   - Sitemap submission
   - Meta descriptions for all pages
   - Structured data for resources

### Week 11-12: School Partnerships
- Approach 5 schools with pilot program
- Offer: Free Pro access for all students + teacher dashboard
- Requirement: Teacher promotes app in class + feedback
- Target schools: 2-3 in Kathmandu, 1-2 in Pokhara

### Week 11-12: Launch Checklist
- [ ] All content uploaded and verified
- [ ] Backend stress-tested
- [ ] Frontend performance audited
- [ ] Analytics dashboard ready
- [ ] Support channel ready (WhatsApp/email)
- [ ] Launch announcement prepared
- [ ] Press release drafted

---

## Success Metrics (End of Month 3)

| Metric | Target |
|--------|--------|
| Active users | 1,000+ |
| Resources available | 500+ |
| Teacher partners | 5+ |
| School partners | 3+ |
| Daily downloads | 100+ |
| Forum posts | 200+ |
| App crashes | <0.1% |
| Average session duration | 8+ minutes |

---

## Budget Estimate (3 Months)

| Item | Cost (NPR) | Cost (USD) |
|------|-----------|------------|
| Teacher content payments | 50,000-100,000 | $400-800 |
| Cloud hosting (Vercel + AWS) | 15,000-30,000 | $120-240 |
| Domain + SSL | 5,000 | $40 |
| Marketing (ads, content) | 20,000-50,000 | $160-400 |
| Phone/data for testing | 5,000 | $40 |
| Misc (design, tools) | 10,000 | $80 |
| **Total** | **105,000-200,000** | **$840-1,600** |

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Teachers don't respond | Offer higher revenue share; approach through personal network; start with 1 teacher |
| Backend takes longer than expected | Use Firebase/Supabase as temporary backend; focus on frontend |
| Beta users don't engage | Incentivize with free Pro; gamify feedback; daily check-ins |
| Content quality issues | Implement teacher review process; add student rating system |
| Budget runs out | Bootstrap with personal funds; delay paid marketing; focus on organic growth |

---

## Daily/Weekly Rhythm

**Daily:**
- Check beta user feedback
- Fix critical bugs
- Post 1 social media update

**Weekly:**
- Review metrics dashboard
- Ship minor updates
- Contact 2-3 potential teachers
- Create 1 piece of content (video/blog)

**Bi-weekly:**
- Team sync (if applicable)
- Content audit
- Competitor check

---

*This plan is aggressive but achievable for a solo founder or small team. The key is relentless execution on content quality and user feedback.*
