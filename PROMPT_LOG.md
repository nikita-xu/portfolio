# A2 Prompt Log and Critique — Nikita Xu

All prompts below are quoted from my actual Viber conversation for this assignment (lightly trimmed with `[…]`; full originals are in the chat history). Resulting changes describe what actually changed in this repo.

---

## Part 1 — Major prompts and resulting changes (A2-10)

### 1. Project scaffolding, four pages, navigation
- **My prompt:** "i am building a personal portfolio website, please help me build and develop it in small steps using Next.js. I will have to review the quality and your codes step by step. Part 1 of the portfolio website will have 4 pages, dynamic routing, and a contact form […] 1) Landing page at / 2) About Me at /about-me 3) Contact Me Server Form at /contact-me-server-form — Save all contact form submissions in a JSON 4) My Projects at /projects — Two dynamically routed projects at /projects/[dynamic routes based on a slug] […] start with making these pages and add navigation between them using a clean layout that works on laptop (and phone too eventually) […] keep the code organized and easy for a beginner to follow."
- **Resulting change:** Created the Next.js App Router project. `app/` holds the four pages, `components/` holds the reusable Navbar and Footer, `data/projects.js` holds the project list, `app/projects/[slug]/page.js` is the shared dynamic page. All styling in `app/globals.css`.

### 2. Working contact form with validation and JSON saving
- **My prompt:** "lets build the working contact form then edit all the details and presentation of the entire website after core elements are built. The contact form accepts a name, email address and message. Send these to a server endpoint. Reject name/message values that are blank after trimming. Email must have one @, nonblank text before it, a domain containing a dot with nonblank labels, and no whitespace. Show success or validation feedback. Email delivery and permanent database storage are not required."
- **Resulting change:** `components/ContactForm.js` collects the three labeled fields; submissions are validated on the server and appended to `data/submissions.json` with a timestamp. Success banner, per-field red errors, and a generic network-failure message were added.

### 3. Real content from my GitHub and Canva site; Skills page
- **My prompt:** "this is my github, can you put these projects into my projects page. make separate project cards […] It only needs to give each a summary, my contribution, tools used, and what I learned. Ask me for any missing details rather than inventing results or achievements […] Use one shared dynamic page at /projects/[slug] that shows the matching project's details. If someone enters an unknown project address, show a clear Project not found page with a link back to Projects. […] For the about me, use my current portfolio information [Canva link]. Make my Event Execution page on this website as a project too, make sure to include the images. create a new page called Skills, then put photo/video, and adobe creative cloud into the page and like the dynamic project pages, make them into separate project cards."
- **Resulting change:** Six projects in `data/projects.js` (Uber practicum, Products Inventory CLI, GreenCity Logistics, Airbnb Market Analysis, California Traffic Collision, TREK x HOKA Event Execution) and two skills in `data/skills.js` (Photo & Video, Adobe Creative Cloud), each with its own shared dynamic detail page and a clear not-found state. About Me rebuilt from my Canva bio, skills lines, and contact details; photos and my motorsports video downloaded into `public/images/` and `public/video/`. Where personal details were missing I answered "use placeholder for now" in the follow-up questions instead of letting anything be invented.

### 4. Content trims and corrections
- **My prompt:** "for now, skip and remove all the My Contribution and What I Learned (keep the products inventory CLI though). i will put them back in later stages. For Uber Procurement portal, in tools used also include Python, Codex, Figma, Claude. […] For the skills/ adobe creative cloud, remove the adobe illustrator - mini pattern collection and the shanghai three piece kitchen set, as well as all the photos. […] Still mention that i know photoshop, illustrator though, just in text."
- **Resulting change:** Contribution/learnings sections removed from five projects (kept only on Products Inventory CLI, whose "What I Learned" is still an explicit placeholder). Uber tools updated. Adobe page reduced to the Photoshop surreal portrait with Photoshop/Illustrator mentioned in the intro text; unused artwork files deleted from `public/images/adobe-creative-cloud/`.

### 5. Photo curation, centered layout, site title
- **My prompt:** "for the about me page photos: remove the 4 photos in photoStrip, and replace the portrait with the first image on the left from the 4 photos. I only want the one portrait image on this page. For the skills/photo and video, the formatting is completely messed up and there are also duplicates, either fix this […] or let me know how to edit this manually and insert photos myself. for the adobe creative cloud, you are still using the wrong picture. […] overall, the entire website is not formatted correctly […] Everything is too much to the left right now, fix it. Also, my website title can just be my name, not 'my portfolio'."
- **Resulting change:** About page reduced to one portrait image. The gallery duplicates were traced to Canva base+overlay composite pairs and removed; photos renamed to friendly names (`motorsports-01.jpg`…) with the data file synced. Card galleries given a uniform 4:5 grid. All headings, text, buttons, cards, and the form centered. Browser title, navbar, and footer changed to "Nikita Xu".

### 6. Pink/blue/black/white theme
- **My prompt:** "now moving onto aesthetics of the portfolio. I want the theme to be pink, blue, black, white. using [the 10-color table: Pure black #000000 main background, White #FFFFFF text and navigation, Cool off-white #F3F4F6, Vivid pink #D73B91, Soft rose #D989B1, Pearl blush #DDAFC7, Pale lavender #D2C3E2, Aqua blue #62ABBE, Ocean blue #356A8A, Midnight navy #1C2D49]."
- **Resulting change:** `app/globals.css` rewritten around CSS variables for the exact palette: black main background, white text and nav, pink buttons/active links, aqua section headings and success state, navy cards and inputs, lavender muted text, blush tags and stat badge.

### 7. Full-width layout and folder-shaped cards
- **My prompt:** "The dimensions of the website changed again, now it is too small and not fitting the entire webpage, fix it. I do like the colors so keep everything the same. Is it possible to make each project into folder icon shapes, but keep all the words the same, just change the border outline from a box to folder looking."
- **Resulting change:** The black background made full-bleed (`min-height: 100vh`, no max-width or rounded sheet margins). Folder tabs added to every card with a `.card::before` pseudo-element in `app/globals.css` — no JSX or text changes.

### 8. Browser launcher page
- **My prompt:** "help me save a .html to the portfolio folder so i can just click on it to open the link."
- **Resulting change:** `Open My Portfolio.html` — double-clicking opens localhost:3000 if the site is running, otherwise shows the exact terminal commands with a Retry button.

### 9. Rubric review and demonstration prep
- **My prompt:** "[pasted the full A2 rubric] Does my portfolio meet all of these criteria? Also, help me prepare for my recorded demonstration that meets the requirements."
- **Resulting change:** Audit against all 14 criteria; created this log and `DEMO_SCRIPT.md` (10-shot recording storyboard covering the four pages, two dynamic values, unknown slug, invalid and valid submissions, JSON proof, and the form-to-endpoint explanation).

### 10. Part 1 / Part 2 form split
- **My prompt:** "For the contact form, there is Part 1 and Part 2 to my portfolio project. […] my demo script describes a form that sends a request to /api/contact, but Part 1 asks for /contact-me-server-form and Part 2 adds a separate /contact-me API form. Show me how my current Part 1 form submits data and which files handle it. If it needs correcting, keep the required routes and JSON saving, and explain the change simply."
- **Resulting change:** The Part 1 form now submits directly to a Server Action (`app/contact-me-server-form/actions.js`) instead of calling my own API. Validation and JSON storage moved to one shared module (`lib/contact.js`). `app/api/contact/route.js` was kept (rewritten on the shared module) for the Part 2 `/contact-me` API form. `DEMO_SCRIPT.md` and Example 1 below were updated to match.

---

## Part 2 — Review examples (A2-11 and A2-12)

### Example 1 — Contact form: correct submission pattern for Part 1, one shared validation source
- **Proposal (A2-11):** I specified the form fields and rules ("Reject name/message values that are blank after trimming. Email must have one @, nonblank text before it, a domain containing a dot with nonblank labels, and no whitespace") and later corrected the architecture: "Part 1 asks for /contact-me-server-form and Part 2 adds a separate /contact-me API form. […] If it needs correcting, keep the required routes and JSON saving."
- **My decision:** Keep the required page route `/contact-me-server-form` and the JSON saving, convert the Part 1 form to submit directly to a Server Action instead of my own API endpoint, and keep `/api/contact` (rewritten to share the same code) for the Part 2 `/contact-me` form.
- **Reason:** The server form is the pattern Part 1 asks for; putting validation and JSON storage in one shared module (`lib/contact.js`) means the Part 1 and Part 2 forms use a single copy of the rules with no duplicate logic.
- **Relevant file:** `app/contact-me-server-form/actions.js`, `lib/contact.js`, `components/ContactForm.js`, `app/api/contact/route.js`.
- **Check performed (A2-12):** (a) Before the refactor, 10 curl POSTs to `/api/contact`: one valid submission and nine invalid ones (blank name, blank message, `a@@b.com`, `@b.com`, `a@b`, `a@.com`, `a@b..com`, `a b@c.com`, trailing space). (b) After the refactor: `npm run lint`, `npm run build`, repeat curl tests, and load `/contact-me-server-form` to confirm the form still renders. (c) After the saving-failure hardening, tests against the real Server Action — submitted the way the browser does, posting the form's rendered hidden action fields (the no-JS path; the same server code the form hits): a valid submission, an invalid submission, a valid submission with a damaged `submissions.json`, a valid submission with an unwritable `data/` folder, and six overlapping submissions sent concurrently with `Promise.all` — with earlier messages seeded into the file first.
- **Actual result:** The valid submission returned `201` and appeared in `data/submissions.json` trimmed, with a timestamp; all nine invalid cases returned `400` with the correct per-field message. After the refactor, lint and build passed, the page rendered the form, and the API route still returned `201`/`400` on the same shared code. One real catch: my first fix cleared the fields inside a `useEffect`, which the React lint rule `react-hooks/set-state-in-effect` rejected — I replaced it with a key-based field reset and lint then passed. In the hardening tests: the valid Server Action submission showed the success state and appended to the file with the earlier messages intact; the invalid one rendered the name and email errors with no success and no file change; the damaged file produced "The submissions file is damaged. Nothing was saved…" and the file stayed byte-for-byte identical; the unwritable folder produced "Saving failed. Please try again." with the file intact; the six overlapping submissions all succeeded and the file ended with exactly 8 entries (2 earlier + 6 parallel), valid JSON, and zero leftover temp files.

### Example 2 — One shared dynamic page with known and unknown slugs
- **Proposal (A2-11):** "Use one shared dynamic page at /projects/[slug] that shows the matching project's details. If someone enters an unknown project address, show a clear Project not found page with a link back to Projects." I also asked: "Explain what the slug does and show me which file controls the shared page."
- **My decision:** One parameterized route per collection (`app/projects/[slug]/page.js`, later `app/skills/[slug]/page.js`) that looks up the record by slug from the data file, with `generateStaticParams` pre-building the known slugs, instead of one page file per project.
- **Reason:** Adding a project becomes a data-only change, and the unknown-slug case is handled once in a single place.
- **Relevant file:** `app/projects/[slug]/page.js`, `data/projects.js`.
- **Check performed (A2-12):** Read the `npm run build` route list, then curl-tested `/projects/products_inventory_cli`, `/projects/event-execution`, and the unknown address `/projects/does-not-exist` (grepping the response for the not-found text).
- **Actual result:** The build pre-rendered both slugs as separate static pages (route list shows `products-inventory-cli`, `uber-vendor-portal`, and "+4 more paths"); the two live pages returned `200` with different titles and content; the unknown slug rendered the "Project not found" page with the button back to `/projects`.

### Example 3 — Photo gallery: duplicates, wrong artwork, and renamed files
- **Proposal (A2-11):** "For the skills/photo and video, the formatting is completely messed up and there are also duplicates, either fix this […] or let me know how to edit this manually and insert photos myself." and "for the adobe creative cloud, you are still using the wrong picture." Later: "i have renamed the photos correctly in the public/images/captured-moments/, but it is not reflecting the right changes on the website."
- **My decision:** I chose the manual-curation option: remove the duplicate photos, rename everything to friendly names, keep the assistant's best-guess artwork as `surreal-portrait.png` with the other candidates beside it, then replace the artwork file and reorganize the gallery myself — the assistant synced the data file to my folder afterward.
- **Reason:** The duplicates came from Canva composites that store two files per visual (base + overlay). The assistant cannot view images in this environment, so the final visual picks had to be mine; friendly names plus overwrite-to-swap mean future photo changes need no code edits.
- **Relevant file:** `data/skills.js`, `public/images/captured-moments/`, `public/images/adobe-creative-cloud/`.
- **Check performed (A2-12):** A Node script extracts every `/images/...` path referenced by the data files and tests that each exists in `public/`; `sips` reads the replaced portrait's pixel dimensions; page greps confirm the removed overlay files are no longer referenced.
- **Actual result:** After my file renames the references broke (the data file maps exact filenames), which is what the script and folder comparison caught; after re-syncing `data/skills.js`, the check reported "38 images referenced, 0 missing". The replaced portrait measured 500×700 (the data had 792×612 from the old file) and was updated. The overlay duplicate files no longer appear on the page.

### 11. Final content pass and submission packaging
- **My prompt:** "remove Uber repo URL placeholder, i dont have an URL for that yet. write a short what I learned for me for the Prodcuts CLI since we did that one together, refer to this if you need [GitHub link]. resume link works. after you have updated all the files, also create a zip with the most updated files so i have everything in one place and I can confirm they are the latest version."
- **Resulting change:** Products Inventory CLI "What I Learned" written from the repository's own README (CLI contracts, exit codes, atomic saves, incremental AI-assisted workflow). The Uber checklist item was removed (no repo URL exists yet; its GitHub button stays hidden). The resume link was confirmed working. This submission zip was created.

### 12. Contact form saving-failure hardening
- **My prompt:** "Please fix the contact form so a saving failure shows a clear form error instead of crashing. Never show success unless saving finishes. Only treat a missing submissions file as empty. If existing JSON is damaged or unreadable, preserve it and show an error. Make saving safe against interrupted or overlapping writes. Test the actual Part 1 Server Action with valid and invalid submissions, then test a saving failure. Confirm earlier messages remain intact. Update the prompt log with the actual results and correct any descriptions that no longer match the code."
- **Resulting change:** `lib/contact.js` hardened: only a missing submissions file counts as empty (`ENOENT`); a damaged or unreadable file is preserved untouched and reported as an error instead of being overwritten. Saves now write to a unique temp file and `fs.rename` it into place (atomic — an interrupted write can never corrupt the real file), and a write queue serializes overlapping saves. The Server Action and the API route return a clear form error on saving failure; success is only returned after the write completes. Verified against the real Server Action — see Example 1.

### 13. Pacific-time submission timestamps
- **My prompt:** "for the submissions.json, it is showing my messages but the time zone is not correct. Can you change it to Pacific Standard Time Time zone in California (GMT-8)."
- **Resulting change:** `lib/contact.js` now stamps new submissions with a Pacific-time formatter (`Intl.DateTimeFormat` with the `America/Los_Angeles` zone), producing ISO strings like `2026-11-08T23:25:11-08:00`. Verified with a live submission through the running server, plus a summer-date sample showing the formatter correctly shifts to `-07:00` (Pacific daylight time).

### 14. Folder proportions fixed with measured dimensions
- **My prompt:** "the folders in project page still looks wrong. i think the whole website page dimensions are wrong, check that you are using the right proportion."
- **Resulting change:** Instead of estimating, I measured the real rendered dimensions with headless Chrome (puppeteer-core driving my installed Chrome, querying `getBoundingClientRect` on every page). Measurement showed folder cards at 247px wide × 364–383px tall — taller than wide, because three columns inside the 820px container are too narrow for the long descriptions, and grid stretch makes every card match its row's tallest. Fixed by widening only the folder grid to 1040px (centered, with a `calc()` that keeps at least 30px margins on smaller screens) and compacting folder typography. Re-measured: cards are now 333px wide × 239–260px tall — wider than tall, in 2 rows of 3, with 200px margins on a 1440px screen and no horizontal overflow anywhere. All other pages measured correct (container left edge at 310px; no overflow).

---

## Still open (my to-dos)
- [ ] Review the quoted prompts above against my chat history and adjust any wording.
- [ ] Record the demo following `DEMO_SCRIPT.md`.
- [ ] Commit this file together with the project.
