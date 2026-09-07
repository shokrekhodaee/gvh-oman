# Local development

This bilingual HTML site needs no build step. Serve this directory using a static HTTP server.

- `assets/shared.css` and `shared.js`: shared layout, accessibility and language switching.
- `assets/index.css` and `index.js`: homepage styles and navigation.
- `assets/request.css` and `request.js`: form styles, validation and the existing submission integration.
- `assets/polish.css`: responsive refinements, action states and reduced-motion support.

CSS loads in the order page, shared, polish. JavaScript loads deferred in the order page, shared, allowing language switching to update the form callbacks.

All links are relative for GitHub Pages subpaths. Include the complete `assets` directory with both HTML pages when publishing. Current changes are local for review.

Test both languages at 320px, tablet and desktop widths. Check navigation, keyboard focus, service/package preselection, conditional contact details and retained input after failed submission. Intercept FormSubmit requests during testing; do not send real enquiries.

