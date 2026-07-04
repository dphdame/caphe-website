# GOAL: Value of Public Health deck — v2 polish

**Date:** 2026-06-18
**Deck:** `outputs/presentations/CAPHE_ValueOfPublicHealth_2026-06-18.pptx`
**Builder:** `scripts/build_value_of_public_health_deck.py`

## Objective

Bring the deck to presentation quality: readable figures, a warmer look, a
tighter length, and one resolved set of numbers.

## Tasks

### 1. Recreate the four research figures (accessibility + contrast)
The embedded paper figures place dark value labels on dark navy bars, which
fails contrast and is unreadable on screen.

- Source data (from the working paper):
  - OLS vs Lewbel IV: OLS 0.18; IV −9.16 (95% CI via SE 1.11)
  - COVID option value: excluding crisis years ≈ −4.56; full sample ≈ −9.16
  - ACA complementarity: pre-ACA −3.07; post-ACA −8.93
  - Geographic: small counties −8.11 (significant); large counties not detectable
- Rebuild in matplotlib with:
  - Light/warm background matching the deck, not white
  - Value labels ABOVE/beside bars in dark text, never inside a dark fill
  - CAPHE palette (navy `#003080`, teal, orange `#DA770D`); WCAG-AA contrast
  - Perceived-pt typography sized for `\includegraphics`-style downscale
  - 95% CI whiskers, sample sizes, significance notes retained
- Output PNGs to a deck assets folder; swap into the figure slides.

### 2. Resolve the unit / SE inconsistency (econometric agent)
- The −9.16 coefficient is reported as "per $1", "per $10", and "per dollar"
  across the paper's own files; the OLS SE is 0.40 in the figure and 0.30 in
  the text.
- Econometric agent determines the canonical scaling from the regression code
  and the correct OLS SE, returns the one y-axis label and the one spoken
  per-unit sentence.
- Apply the confirmed unit to the recreated figures and the deck notes.
- Separately: flag the manuscript file:lines for the author to correct.

### 3. Trim to a maximum of 30 slides
- Keep the research centerpiece, the worked examples, and the figures.
- Replace the seven numbered part dividers with two thematic dividers.
- Fold lower-priority method slides into notes.

### 4. Warmer background
- Replace the cool off-white (`#FAFAF8`) with a warm cream.
- Keep the navy/orange accent bars and navy titles.

## Gates (every rebuild)
- pptx-QA PASS (bounds, fonts ≥20/28, Calibri, no overlap, no placeholders)
- Speaker notes pass `/style-pass --social`
- Visual render check of recreated figures and a sample of slides
