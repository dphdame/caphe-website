# Backing Data — CAPHE Planning Session Deck

Data behind slides 7 to 10 of `CAPHE_Planning_Session.pptx` ("How the Site Is
Doing", "Who Comes to the Site", "How People Find Us", "Where Attention
Actually Goes").

**Pulled:** July 29, 2026

## Files

| File | Source | Window | Backs |
|------|--------|--------|-------|
| `ga4_channels.csv` | GA4 property 515549363, `sessionDefaultChannelGroup` by `totalUsers`, `sessions`, `screenPageViews`, `averageSessionDuration` | 2026-04-30 to 2026-07-28 | Slide 7 tiles; slide 8 "How long they stay" |
| `ga4_top_pages.csv` | GA4 property 515549363, `pagePath` by `screenPageViews`, `totalUsers`, `userEngagementDuration` | 2026-04-30 to 2026-07-28 | Slide 10 bars |
| `ga4_geography.csv` | GA4 property 515549363, `country` + `region` by `totalUsers`, `sessions` | 2026-04-30 to 2026-07-28 | Slide 7 caveat; slide 8 "Where they are" |
| `gsc_queries.csv` | Search Console `sc-domain:caphegroup.org`, `query` dimension | 2026-04-30 to 2026-07-26 | Slide 9 bars and footnote |

Search Console lags roughly two days, so its window ends July 26 while GA4 runs
through July 28. Both windows are labelled on slide 7.

## Derived numbers and how each was computed

All figures were computed in code, not by hand.

| Figure on slide | Computation |
|---|---|
| 288 sessions, 250 users, 374 page views | Column sums of `ga4_channels.csv` |
| 1.3 pages per session | 374 / 288 |
| 1,310 impressions, 2 clicks, 0.15% | Column sums of `gsc_queries.csv`; 2 / 1310 |
| "133 of 250 users sit in datacenter regions" | Sum of users for Singapore (region unset), Iowa, and Colorado in `ga4_geography.csv`. Each shows a 1.00 session-per-user ratio, the signature of automated traffic. Remainder 250 − 133 = 117. |
| California 43 people, 75 visits, "back about twice" | `ga4_geography.csv`; 75 / 43 = 1.74 |
| Referral 8 min, organic search 2 min, direct 33 s | `averageSessionDuration` in `ga4_channels.csv` (497.7 s, 111.6 s, 32.7 s), rounded for the slide |
| Query clusters 950 / 253 / 65 / 42 | Regex classification of `gsc_queries.csv` into causal-inference teaching, health-economics practice, brand, other; impressions summed per cluster |
| "position 11" and "position 45" | Impression-weighted mean `avg_position` per cluster (11.0 and 45.0) |
| Seconds per page view (69, 34, 16, 5, 3) | `engagement_sec` / `pageviews` per row of `ga4_top_pages.csv` |

## Regenerating

The deck itself is rebuilt with:

```bash
python3 ../../scripts/generate_planning_session_slides.py
```

The GA4 and Search Console figures are hard-coded into that script from the
pulls recorded here. Refreshing the deck for a later meeting means re-pulling
both sources for the new window, updating these CSVs, and updating the numbers
in `slide_site_01_snapshot` through `slide_site_04_attention`.

## Caveats worth carrying into the room

1. Slightly over half of reported GA4 users are almost certainly automated. Any
   "user" total quoted without that adjustment overstates the human audience.
2. Two clicks over 90 days is a small enough number that the click-through rate
   should be read as "close to zero," not as a precise 0.15%.
3. The query clustering is a keyword-based classification, so a handful of
   ambiguous queries could sit in a different bucket. The 72% causal-inference
   share is large enough that reasonable reclassification does not change the
   conclusion.
