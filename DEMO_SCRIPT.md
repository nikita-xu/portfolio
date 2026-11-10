# Recorded Demonstration Script (A2-13, A2-14)

Goal: one continuous screen recording (~90-120 seconds) showing everything A2-13 requires and saying the A2-14 explanation in your own words.

Scope note: this demo covers Part 1 only — the **server form** at `/contact-me-server-form`. The separate `/contact-me` API form is Part 2 and is not shown.

Before recording:
1. `npm run dev` and confirm the site opens at localhost:3000.
2. Reset the proof file: make `data/submissions.json` contain `[]`.
3. Close extra tabs; set browser zoom to 100%; open a second window with `data/submissions.json` in your editor (you'll switch to it twice).

---

## Shot list (in order)

1. **Landing page (/)** — "This is my portfolio built with Next.js." Point at the nav: Home, About Me, Projects, Skills, Contact.
2. **About Me** — click it in the nav; one sentence about the content (bio, skills, contact details).
3. **Projects (the four-page requirement)** — click Projects; show the grid of project cards. Mention cards are drawn from one data file.
4. **Dynamic value 1** — click "Products Inventory CLI" (URL shows `/projects/products_inventory_cli`). Point at the URL bar.
5. **Dynamic value 2** — go back, open "TREK x HOKA Duathlon — Event Execution" (URL shows `/projects/event-execution`). Say: "Same shared page, different record — the slug picks the project." Optionally scroll the photo gallery.
6. **Unknown value** — type a bad URL like `/projects/does-not-exist` and show the "Project not found" page with the button back to Projects.
7. **Invalid submission** — go to Contact. Submit empty (or with a blank name and an email like `a@b`). Show the red field errors. Try one more bad email (e.g. `a@b` with a message) to show the email rule.
8. **Valid submission** — fill name, a real-looking email, a message; submit. Show the success banner and the cleared fields.
9. **Proof of storage** — switch to the editor window: `data/submissions.json` now contains the submission with a timestamp.
10. **Flow explanation (A2-14 — in your own words)** — open `app/contact-me-server-form/actions.js` and `lib/contact.js` briefly while saying something like:

> "This page is a server form. When I press send, the browser posts the form straight to a server function — the action in actions.js. That function trims and checks the values — name and message can't be blank, and the email needs exactly one @ with a proper domain and no spaces. If something fails, the action returns the error messages and the form shows them under the fields. If it's valid, the submission is appended to data/submissions.json with a timestamp and the form re-renders with the success banner."

(If asked about the API route: `app/api/contact/route.js` exists and shares the same validation code from `lib/contact.js` — it is reserved for the separate `/contact-me` API form planned for Part 2.)

## Recording how-to (macOS)
- Press `Cmd+Shift+5` → "Record Entire Screen" or a selected window → Record.
- Or QuickTime Player → File → New Screen Recording.
- Stop from the menu bar; the file lands on the Desktop.
- Keep it under 2 minutes — re-record rather than editing.
