#!/usr/bin/env python3
"""
CAPHE Planning Session Slide Generator

Builds the facilitation deck for the CAPHE planning meeting:
"What Do We Want to Offer and How?"

This is a WORKING deck, not a lecture deck. Several slides are intentionally
left with open capture space so the facilitator can type live during the
session (voting results, pilots table, breakout templates).

Brand: Institutional Blue (#003080) + Poppy Gold (#DA770D), matching
caphegroup.org and the other generators in this directory.

Usage:
    python3 generate_planning_session_slides.py [--out PATH]
"""

import argparse
from pathlib import Path

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor

# =============================================================================
# CAPHE Brand Colors (matching caphegroup.org)
# =============================================================================
PRIMARY = RGBColor(0, 48, 128)          # #003080 Institutional Blue
PRIMARY_LIGHT = RGBColor(0, 65, 165)    # #0041A5
ACCENT = RGBColor(218, 119, 13)         # #DA770D Poppy Gold
BG_WARM = RGBColor(250, 250, 248)       # #FAFAF8
BG_TINT = RGBColor(240, 244, 251)       # pale blue card fill
BG_TINT_GOLD = RGBColor(253, 245, 232)  # pale gold card fill
TEXT_PRIMARY = RGBColor(28, 28, 28)     # #1C1C1C
TEXT_SECONDARY = RGBColor(66, 66, 66)   # #424242
TEXT_MUTED = RGBColor(100, 100, 100)    # #646464
RULE = RGBColor(214, 219, 228)          # card border
WHITE = RGBColor(255, 255, 255)

SLIDE_W = 13.333
SLIDE_H = 7.5

RECT = 1  # MSO_SHAPE.RECTANGLE

FILL_LINE = "________________________________"
SHORT_FILL = "______________"

# Session date. Update for a future meeting.
MEETING_DATE = "Wednesday, July 29, 2026"


# =============================================================================
# Primitives
# =============================================================================

def new_deck() -> Presentation:
    prs = Presentation()
    prs.slide_width = Inches(SLIDE_W)
    prs.slide_height = Inches(SLIDE_H)
    return prs


def rect(slide, x, y, w, h, fill, line=None, line_w=1.0):
    """Filled rectangle. Left textless so the QA overlap check treats it as a container."""
    shp = slide.shapes.add_shape(RECT, Inches(x), Inches(y), Inches(w), Inches(h))
    shp.fill.solid()
    shp.fill.fore_color.rgb = fill
    if line is None:
        shp.line.fill.background()
    else:
        shp.line.color.rgb = line
        shp.line.width = Pt(line_w)
    shp.shadow.inherit = False
    return shp


def textbox(slide, x, y, w, h):
    tb = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tb.text_frame.word_wrap = True
    return tb


def para(tf, text, size, color=TEXT_PRIMARY, bold=False, italic=False,
         align=PP_ALIGN.LEFT, space_before=0, space_after=0, first=False):
    p = tf.paragraphs[0] if first else tf.add_paragraph()
    p.text = text
    p.font.size = Pt(size)
    p.font.bold = bold
    p.font.italic = italic
    p.font.color.rgb = color
    p.alignment = align
    p.space_before = Pt(space_before)
    p.space_after = Pt(space_after)
    return p


def chrome(slide):
    """Standard slide furniture: blue bar top, gold bar bottom, warm background."""
    rect(slide, 0, 0, SLIDE_W, SLIDE_H, BG_WARM)
    rect(slide, 0, 0, SLIDE_W, 0.15, PRIMARY)
    rect(slide, 0, SLIDE_H - 0.15, SLIDE_W, 0.15, ACCENT)


def header(slide, title, eyebrow=None):
    """Slide header. Returns the y-coordinate where body content may begin."""
    y = 0.45
    if eyebrow:
        tb = textbox(slide, 0.75, y, 11.8, 0.42)
        para(tb.text_frame, eyebrow.upper(), 20, ACCENT, bold=True, first=True)
        y += 0.5
    tb = textbox(slide, 0.75, y, 11.8, 0.95)
    para(tb.text_frame, title, 38, PRIMARY, bold=True, first=True)
    y += 1.05
    rect(slide, 0.78, y, 2.0, 0.05, ACCENT)
    return y + 0.35


def base_slide(prs, title, eyebrow=None):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    chrome(slide)
    return slide, header(slide, title, eyebrow)


def bullets(slide, x, y, w, h, items, size=24, gap=14, marker="•  "):
    tb = textbox(slide, x, y, w, h)
    tf = tb.text_frame
    for i, item in enumerate(items):
        if isinstance(item, tuple):
            text, color, bold = item
        else:
            text, color, bold = item, TEXT_PRIMARY, False
        para(tf, f"{marker}{text}", size, color, bold=bold,
             space_after=gap, first=(i == 0))
    return tb


def card(slide, x, y, w, h, label, body_lines, fill=BG_TINT,
         label_color=PRIMARY, body_size=20, label_size=22):
    """Bordered card with a bold label and body lines, text fully inset."""
    rect(slide, x, y, w, h, fill, line=RULE)
    tb = textbox(slide, x + 0.28, y + 0.20, w - 0.56, h - 0.40)
    tf = tb.text_frame
    para(tf, label, label_size, label_color, bold=True, space_after=8, first=True)
    for line in body_lines:
        para(tf, line, body_size, TEXT_SECONDARY, space_after=6)
    return tb


def footer_note(slide, text):
    tb = textbox(slide, 0.75, 6.85, 11.8, 0.45)
    para(tb.text_frame, text, 16, TEXT_MUTED, italic=True, first=True)


# =============================================================================
# Slides
# =============================================================================

def slide_01_title(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    rect(slide, 0, 0, SLIDE_W, SLIDE_H, BG_WARM)
    rect(slide, 0, 0, SLIDE_W, 0.15, PRIMARY)
    rect(slide, 0, SLIDE_H - 0.15, SLIDE_W, 0.15, ACCENT)

    tb = textbox(slide, 0.9, 0.85, 11.5, 0.6)
    para(tb.text_frame, "CAPHE", 40, PRIMARY, bold=True,
         align=PP_ALIGN.CENTER, first=True)

    tb = textbox(slide, 0.9, 1.45, 11.5, 0.5)
    para(tb.text_frame, "California Association of Public Health Economists",
         22, TEXT_SECONDARY, align=PP_ALIGN.CENTER, first=True)

    tb = textbox(slide, 0.9, 2.30, 11.5, 1.5)
    tf = tb.text_frame
    para(tf, "CAPHE Planning Session", 44, PRIMARY, bold=True,
         align=PP_ALIGN.CENTER, first=True)
    para(tf, "What Do We Want to Offer, and How?", 34, ACCENT, bold=True,
         align=PP_ALIGN.CENTER, space_before=8)

    rect(slide, 4.42, 3.95, 4.5, 0.05, ACCENT)

    tb = textbox(slide, 1.5, 4.25, 10.3, 0.75)
    para(tb.text_frame,
         "A learning collaborative of public health economists "
         "working on California issues.",
         24, TEXT_PRIMARY, align=PP_ALIGN.CENTER, first=True)

    # Live-fill logistics line (kept free of bracketed scaffolding text)
    rect(slide, 2.4, 5.15, 8.53, 1.70, BG_TINT, line=RULE)
    tb = textbox(slide, 2.75, 5.32, 7.83, 1.36)
    tf = tb.text_frame
    para(tf, MEETING_DATE, 22, TEXT_PRIMARY, bold=True,
         align=PP_ALIGN.CENTER, space_after=8, first=True)
    para(tf, f"Time:  {SHORT_FILL}          Zoom link:  {SHORT_FILL}",
         20, TEXT_SECONDARY, align=PP_ALIGN.CENTER, space_after=8)
    para(tf, f"Organizers:  {FILL_LINE}", 20, TEXT_SECONDARY,
         align=PP_ALIGN.CENTER)


def slide_02_purpose(prs):
    slide, y = base_slide(prs, "Why We Are Here Today", eyebrow="Purpose")

    bullets(slide, 0.85, y, 6.0, 3.4, [
        "Co-identify the offerings CAPHE should build first",
        "Choose two or three pilot projects to move forward",
        "Surface resources we already have to seed a curriculum",
    ], size=23, gap=16)

    card(slide, 7.15, y - 0.05, 5.35, 3.6,
         "By the end of today, we will have:",
         ["A ranked list of member needs",
          "Two or three named pilots",
          "A lead and a first milestone for each",
          "A starter pack of shared resources"],
         fill=BG_TINT_GOLD, label_color=ACCENT, body_size=20, label_size=22)


def slide_03_what_is_caphe(prs):
    slide, y = base_slide(prs, "What Is CAPHE?", eyebrow="Framing")

    tb = textbox(slide, 0.85, y, 11.6, 0.85)
    para(tb.text_frame,
         "A learning collaborative that puts economic reasoning to work "
         "on California public health decisions.",
         26, TEXT_PRIMARY, first=True)

    y2 = y + 1.05
    card(slide, 0.85, y2, 5.5, 2.85, "Who it serves",
         ["County health departments",
          "State agencies and their analysts",
          "CHW and community programs",
          "Researchers and funders"],
         fill=BG_TINT, label_color=PRIMARY)

    card(slide, 6.95, y2, 5.5, 2.85, "What we do, or could do",
         ["Webinars and journal-style sessions",
          "Methods Lab modules",
          "California case studies",
          "Shared tools and templates"],
         fill=BG_TINT_GOLD, label_color=ACCENT)


def slide_04_agenda(prs):
    slide, y = base_slide(prs, "Today's Agenda", eyebrow="90 minutes")

    items = [
        ("Welcome and framing", "10 min"),
        ("Quick introductions", "10 min"),
        ("How the site is doing", "10 min"),
        ("Needs and ideas brainstorm", "15 min"),
        ("Voting on priorities", "10 min"),
        ("Breakout design sessions", "20 min"),
        ("Resource harvest", "5 min"),
        ("Commitments and next steps", "10 min"),
    ]

    row_h = 0.54
    for i, (label, mins) in enumerate(items):
        ry = y + i * row_h
        fill = BG_TINT if i % 2 == 0 else BG_WARM
        rect(slide, 0.85, ry, 11.6, row_h - 0.06, fill, line=RULE)
        tb = textbox(slide, 1.05, ry + 0.02, 9.0, row_h - 0.10)
        para(tb.text_frame, f"{i + 1}.   {label}", 22, TEXT_PRIMARY, first=True)
        tb = textbox(slide, 10.2, ry + 0.02, 2.1, row_h - 0.10)
        para(tb.text_frame, mins, 22, ACCENT, bold=True,
             align=PP_ALIGN.RIGHT, first=True)

    footer_note(slide, "Timings are a proposed shape and can flex with the room.")


def slide_05_ground_rules(prs):
    slide, y = base_slide(prs, "How We Will Work Together",
                          eyebrow="Ground rules")

    tb = textbox(slide, 0.85, y, 11.6, 0.7)
    para(tb.text_frame, "This is a working session, not a lecture.",
         30, PRIMARY, bold=True, first=True)

    bullets(slide, 0.95, y + 0.85, 11.5, 3.0, [
        "Cameras on if we can. It helps the small-group work.",
        "Chat and the shared board count as talking.",
        "Half-baked ideas are welcome. Direction matters more than polish.",
        "Assume good intent, and share the airtime.",
    ], size=23, gap=18)


def slide_06_intros(prs):
    slide, y = base_slide(prs, "Quick Introductions", eyebrow="10 minutes")

    card(slide, 0.85, y, 11.6, 1.35, "Tell us",
         ["Name, organization or county"],
         fill=BG_TINT, label_color=PRIMARY, body_size=24, label_size=24)

    rect(slide, 0.85, y + 1.60, 11.6, 2.15, BG_TINT_GOLD, line=RULE)
    tb = textbox(slide, 1.15, y + 1.80, 11.0, 1.8)
    tf = tb.text_frame
    para(tf, "And one sentence:", 24, ACCENT, bold=True, space_after=10,
         first=True)
    para(tf,
         "What public health economics problem are we wrestling with "
         "right now?",
         30, TEXT_PRIMARY, bold=True)


def kpi_tile(slide, x, y, w, h, value, label, sub=None):
    rect(slide, x, y, w, h, BG_TINT, line=RULE)
    tb = textbox(slide, x + 0.20, y + 0.16, w - 0.40, h - 0.32)
    tf = tb.text_frame
    para(tf, value, 40, PRIMARY, bold=True, align=PP_ALIGN.CENTER,
         space_after=4, first=True)
    para(tf, label, 20, TEXT_SECONDARY, align=PP_ALIGN.CENTER)
    if sub:
        para(tf, sub, 20, TEXT_MUTED, align=PP_ALIGN.CENTER)


def hbar_row(slide, y, label, value_text, frac, row_h=0.62,
             label_w=4.55, bar_x=5.05, bar_max=5.30, color=PRIMARY):
    """One horizontal bar: label at left, textless bar, value at fixed right column."""
    tb = textbox(slide, 0.85, y, label_w, row_h - 0.08)
    para(tb.text_frame, label, 20, TEXT_PRIMARY, first=True)
    bar_w = max(0.10, bar_max * frac)
    rect(slide, bar_x, y + 0.10, bar_w, row_h - 0.30, color)
    tb = textbox(slide, 10.55, y, 1.95, row_h - 0.08)
    para(tb.text_frame, value_text, 20, ACCENT, bold=True,
         align=PP_ALIGN.RIGHT, first=True)


def slide_site_01_snapshot(prs):
    slide, y = base_slide(prs, "How the Site Is Doing",
                          eyebrow="caphegroup.org, last 90 days")

    tiles = [
        ("288", "sessions", "from 250 users"),
        ("374", "pages viewed", "1.3 per session"),
        ("1,310", "search impressions", "in Google results"),
        ("2", "search clicks", "0.15% of those"),
    ]
    tw, gap = 2.86, 0.19
    for i, (val, lab, sub) in enumerate(tiles):
        kpi_tile(slide, 0.85 + i * (tw + gap), y, tw, 2.05, val, lab, sub)

    rect(slide, 0.85, y + 2.30, 11.6, 1.55, BG_TINT_GOLD, line=RULE)
    tb = textbox(slide, 1.15, y + 2.46, 11.0, 1.25)
    tf = tb.text_frame
    para(tf, "One caveat on that user count",
         22, ACCENT, bold=True, space_after=8, first=True)
    para(tf,
         "133 of the 250 users sit in datacenter regions and visit once. "
         "The human audience is closer to 117.",
         20, TEXT_PRIMARY)

    footer_note(slide, "GA4 through July 28, 2026. Search Console through July 26, 2026.")


def slide_site_02_who(prs):
    slide, y = base_slide(prs, "Who Comes to the Site", eyebrow="Audience")

    rect(slide, 0.85, y, 5.65, 3.45, BG_TINT, line=RULE)
    tb = textbox(slide, 1.15, y + 0.18, 5.05, 3.10)
    tf = tb.text_frame
    para(tf, "Where they are", 22, PRIMARY, bold=True, space_after=10,
         first=True)
    para(tf, "California:  43 people, 75 visits", 20, TEXT_PRIMARY,
         space_after=6)
    para(tf, "Californians come back about twice.", 20, TEXT_MUTED,
         italic=True, space_after=10)
    para(tf, "Then Arizona 7, New York 4, Illinois 3", 20, TEXT_PRIMARY,
         space_after=6)
    para(tf, "Abroad: Ireland 5, UK 4, Canada 3", 20, TEXT_PRIMARY)

    rect(slide, 6.80, y, 5.65, 3.45, BG_TINT_GOLD, line=RULE)
    tb = textbox(slide, 7.10, y + 0.18, 5.05, 3.10)
    tf = tb.text_frame
    para(tf, "How long they stay", 22, ACCENT, bold=True, space_after=10,
         first=True)
    para(tf, "Referral:  8 min per visit", 20, TEXT_PRIMARY, space_after=6)
    para(tf, "Organic search:  2 min", 20, TEXT_PRIMARY, space_after=6)
    para(tf, "Direct:  33 seconds", 20, TEXT_PRIMARY, space_after=10)
    para(tf,
         "The few who arrive from a link or a search "
         "are the ones who read.",
         20, TEXT_MUTED, italic=True)


def slide_site_03_how_found(prs):
    slide, y = base_slide(prs, "How People Find Us",
                          eyebrow="What they searched for")

    rows = [
        ("Causal inference teaching examples", "950", 950 / 950.0, PRIMARY),
        ("Health economics data and tools", "253", 253 / 950.0, ACCENT),
        ("The name CAPHE itself", "65", 65 / 950.0, PRIMARY_LIGHT),
        ("Everything else", "42", 42 / 950.0, TEXT_MUTED),
    ]
    for i, (label, val, frac, color) in enumerate(rows):
        hbar_row(slide, y + i * 0.62, label, val, frac, color=color)

    yb = y + 4 * 0.62 + 0.14
    rect(slide, 0.85, yb, 11.6, 1.55, BG_TINT_GOLD, line=RULE)
    tb = textbox(slide, 1.15, yb + 0.18, 11.0, 1.25)
    tf = tb.text_frame
    para(tf,
         "Seven in ten searches that reach us want a teaching example "
         "on correlation and causation.",
         20, TEXT_PRIMARY, space_after=6, first=True)
    para(tf,
         "We rank around position 11 for those, and position 45 for "
         "health economics data. Hence the 2 clicks.",
         20, TEXT_SECONDARY)

    footer_note(slide, "Bars show Google impressions over 90 days, 1,310 in total.")


def slide_site_04_attention(prs):
    slide, y = base_slide(prs, "Where Attention Actually Goes",
                          eyebrow="Seconds spent per page view")

    rows = [
        ("LHA calculator methodology", "69s", 68.8 / 68.8, ACCENT),
        ("LHA calculator", "34s", 33.7 / 68.8, ACCENT),
        ("Methods Lab", "16s", 15.8 / 68.8, PRIMARY),
        ("Home page", "5s", 5.4 / 68.8, PRIMARY_LIGHT),
        ("Membership", "3s", 3.4 / 68.8, PRIMARY_LIGHT),
    ]
    for i, (label, val, frac, color) in enumerate(rows):
        hbar_row(slide, y + i * 0.58, label, val, frac, row_h=0.58, color=color)

    yb = y + 5 * 0.58 + 0.10
    rect(slide, 0.85, yb, 11.6, 1.05, BG_TINT, line=RULE)
    tb = textbox(slide, 1.15, yb + 0.14, 11.0, 0.80)
    para(tb.text_frame,
         "The tools hold people. The pages describing us do not. "
         "Keep that in mind as we brainstorm.",
         22, PRIMARY, bold=True, first=True)

    footer_note(slide, "The methodology page draws 18 views, and holds each one over a minute.")


def slide_07_needs(prs):
    slide, y = base_slide(prs, "What Would Help Us Most?", eyebrow="Brainstorm")

    rect(slide, 0.85, y, 11.6, 1.20, BG_TINT, line=RULE)
    tb = textbox(slide, 1.15, y + 0.20, 11.0, 0.85)
    para(tb.text_frame,
         "What economics skill, tool, or resource would help us most "
         "in the next 6 to 12 months?",
         26, PRIMARY, bold=True, first=True)

    y2 = y + 1.45
    tb = textbox(slide, 0.85, y2, 11.6, 0.4)
    para(tb.text_frame, "Idea starters, not a menu:", 22, TEXT_SECONDARY,
         italic=True, first=True)

    starters = [
        "HR1 unwinding impacts by county",
        "CHW fundraising and implementation case studies",
        "External funding strategy",
        "Online teaching and a receipts program",
        "Methods and communication skill building",
    ]
    cw, ch, gap = 3.73, 0.95, 0.20
    for i, text in enumerate(starters):
        col, row = i % 3, i // 3
        x = 0.85 + col * (cw + gap)
        yy = y2 + 0.50 + row * (ch + gap)
        rect(slide, x, yy, cw, ch, BG_TINT_GOLD, line=RULE)
        tb = textbox(slide, x + 0.20, yy + 0.12, cw - 0.40, ch - 0.24)
        para(tb.text_frame, text, 20, TEXT_PRIMARY, first=True)


def slide_08_capturing(prs):
    slide, y = base_slide(prs, "How We Will Capture Ideas",
                          eyebrow="Brainstorm mechanics")

    rect(slide, 0.85, y, 11.6, 1.15, BG_TINT_GOLD, line=RULE)
    tb = textbox(slide, 1.15, y + 0.22, 11.0, 0.75)
    para(tb.text_frame,
         "Five minutes of quiet typing, then we discuss.",
         30, ACCENT, bold=True, first=True)

    y2 = y + 1.42
    card(slide, 0.85, y2, 3.73, 2.35, "1. Write",
         ["One idea per line.",
          "Short is fine."],
         fill=BG_TINT, label_color=PRIMARY, body_size=20)
    card(slide, 4.78, y2, 3.73, 2.35, "2. Post",
         ["Drop it in chat or on",
          "the shared board."],
         fill=BG_TINT, label_color=PRIMARY, body_size=20)
    card(slide, 8.72, y2, 3.73, 2.35, "3. Cluster",
         ["We group the ideas",
          "into themes together."],
         fill=BG_TINT, label_color=PRIMARY, body_size=20)

    footer_note(slide, "Shared board link goes in the chat at the start of this block.")


def slide_09_voting(prs):
    slide, y = base_slide(prs, "Help Us Choose CAPHE's First Priorities",
                          eyebrow="Voting")

    rect(slide, 0.85, y, 5.35, 3.35, BG_TINT_GOLD, line=RULE)
    tb = textbox(slide, 1.15, y + 0.22, 4.75, 2.95)
    tf = tb.text_frame
    para(tf, "How it works", 24, ACCENT, bold=True, space_after=12, first=True)
    para(tf, "We each get three votes.", 22, TEXT_PRIMARY, space_after=10)
    para(tf, "We can stack two on one theme.", 22, TEXT_PRIMARY, space_after=10)
    para(tf, "Vote for what we would actually use.", 22, TEXT_PRIMARY)

    rect(slide, 6.60, y, 5.85, 3.35, BG_TINT, line=RULE)
    tb = textbox(slide, 6.90, y + 0.22, 5.25, 2.95)
    tf = tb.text_frame
    para(tf, "Themes on the board", 24, PRIMARY, bold=True, space_after=14,
         first=True)
    for _ in range(4):
        para(tf, FILL_LINE, 20, TEXT_MUTED, space_after=12)

    footer_note(slide, "Facilitator fills the theme list live from the brainstorm.")


def slide_10_results(prs):
    slide, y = base_slide(prs, "What We Chose", eyebrow="Voting results")

    cw, gap = 3.73, 0.20
    for i in range(3):
        x = 0.85 + i * (cw + gap)
        rect(slide, x, y, cw, 2.55, BG_TINT, line=RULE)
        tb = textbox(slide, x + 0.22, y + 0.18, cw - 0.44, 2.20)
        tf = tb.text_frame
        para(tf, f"Priority {i + 1}", 22, ACCENT, bold=True, space_after=14,
             first=True)
        para(tf, FILL_LINE, 20, TEXT_MUTED, space_after=12)
        para(tf, FILL_LINE, 20, TEXT_MUTED)

    rect(slide, 0.85, y + 2.80, 11.6, 1.0, BG_TINT_GOLD, line=RULE)
    tb = textbox(slide, 1.15, y + 2.98, 11.0, 0.65)
    para(tb.text_frame,
         "Do these feel right for CAPHE's first year?",
         26, PRIMARY, bold=True, first=True)


def slide_11_breakouts_overview(prs):
    slide, y = base_slide(prs, "Breakout Groups", eyebrow="20 minutes")

    groups = [
        ("Group A", "HR1 unwinding county estimates"),
        ("Group B", "CHW case study and external funding"),
        ("Group C", "Online teaching and receipts curriculum"),
    ]
    cw, gap = 3.73, 0.20
    for i, (name, focus) in enumerate(groups):
        x = 0.85 + i * (cw + gap)
        rect(slide, x, y, cw, 1.75, BG_TINT, line=RULE)
        tb = textbox(slide, x + 0.22, y + 0.16, cw - 0.44, 1.42)
        tf = tb.text_frame
        para(tf, name, 24, ACCENT, bold=True, space_after=8, first=True)
        para(tf, focus, 20, TEXT_PRIMARY)

    y2 = y + 2.05
    rect(slide, 0.85, y2, 11.6, 1.85, BG_TINT_GOLD, line=RULE)
    tb = textbox(slide, 1.15, y2 + 0.16, 11.0, 1.55)
    tf = tb.text_frame
    para(tf, "Every group answers the same four questions",
         22, ACCENT, bold=True, space_after=10, first=True)
    para(tf,
         "What exactly should we offer?    For whom?    "
         "In what format?    Who can lead or contribute?",
         22, TEXT_PRIMARY)

    footer_note(slide, "Groups shift if the vote lands somewhere else.")


def slide_12_breakout_template(prs, group_name, focus):
    slide, y = base_slide(prs, focus, eyebrow=f"{group_name} worksheet")

    boxes = [
        ("Product or products", "What we would actually make"),
        ("Audiences", "Who opens it, and why"),
        ("Formats", "Module, dashboard, one-pager, video"),
        ("Leads and contributors", "Names, not roles"),
    ]
    bw, bh, gx, gy = 5.65, 1.70, 0.30, 0.22
    for i, (label, hint) in enumerate(boxes):
        col, row = i % 2, i // 2
        x = 0.85 + col * (bw + gx)
        yy = y + row * (bh + gy)
        fill = BG_TINT if row == 0 else BG_TINT_GOLD
        lab_color = PRIMARY if row == 0 else ACCENT
        rect(slide, x, yy, bw, bh, fill, line=RULE)
        tb = textbox(slide, x + 0.24, yy + 0.14, bw - 0.48, bh - 0.28)
        tf = tb.text_frame
        para(tf, label, 22, lab_color, bold=True, space_after=6, first=True)
        para(tf, hint, 20, TEXT_MUTED, italic=True, space_after=8)
        para(tf, FILL_LINE, 20, TEXT_MUTED)

    footer_note(slide, "Notetaker types directly into this slide. It becomes the working doc.")


def slide_13_resources(prs):
    slide, y = base_slide(prs, "Help Us Build the CAPHE Starter Pack",
                          eyebrow="Resource harvest")

    tb = textbox(slide, 0.85, y, 11.6, 0.45)
    para(tb.text_frame, "Drop four things in the chat:", 24, TEXT_PRIMARY,
         first=True)

    items = [
        ("One book or chapter", "The thing we keep recommending"),
        ("One video or webinar", "Something that made a concept land"),
        ("One account or newsletter", "Where we get the good stuff"),
        ("One fun teaching resource", "A gif, meme, or comic that teaches"),
    ]
    cw, gap = 2.86, 0.19
    for i, (label, hint) in enumerate(items):
        x = 0.85 + i * (cw + gap)
        rect(slide, x, y + 0.60, cw, 2.30, BG_TINT, line=RULE)
        tb = textbox(slide, x + 0.20, y + 0.76, cw - 0.40, 1.98)
        tf = tb.text_frame
        para(tf, label, 21, PRIMARY, bold=True, space_after=10, first=True)
        para(tf, hint, 20, TEXT_SECONDARY)

    rect(slide, 0.85, y + 3.10, 11.6, 0.72, BG_TINT_GOLD, line=RULE)
    tb = textbox(slide, 1.15, y + 3.22, 11.0, 0.50)
    para(tb.text_frame,
         "We link and describe resources rather than reproducing them, "
         "which keeps us clear of copyright.",
         20, TEXT_SECONDARY, first=True)


def slide_14_pilots(prs):
    from pptx.util import Emu
    slide, y = base_slide(prs, "Draft Pilots and Working Groups",
                          eyebrow="Commitments")

    rows, cols = 4, 4
    tbl_shape = slide.shapes.add_table(
        rows, cols, Inches(0.85), Inches(y), Inches(11.6), Inches(3.1)
    )
    table = tbl_shape.table
    for w, idx in ((3.5, 0), (2.6, 1), (2.6, 2), (2.9, 3)):
        table.columns[idx].width = Emu(int(w * 914400))

    headers = ["Pilot", "Leads", "Supporters", "First milestone and date"]
    seeds = [
        "HR1 unwinding county estimates",
        "CHW economics-to-action case study",
        "Receipts curriculum",
    ]

    for c, text in enumerate(headers):
        cell = table.cell(0, c)
        cell.text = text
        cell.fill.solid()
        cell.fill.fore_color.rgb = PRIMARY
        p = cell.text_frame.paragraphs[0]
        p.font.size = Pt(20)
        p.font.bold = True
        p.font.color.rgb = WHITE

    for r in range(1, rows):
        for c in range(cols):
            cell = table.cell(r, c)
            cell.text = seeds[r - 1] if c == 0 else ""
            cell.fill.solid()
            cell.fill.fore_color.rgb = WHITE if r % 2 else BG_TINT
            p = cell.text_frame.paragraphs[0]
            p.font.size = Pt(18)
            p.font.color.rgb = TEXT_PRIMARY

    footer_note(slide, "Pilots are pre-seeded from the outline and get replaced by whatever wins the vote.")


def slide_15_next_steps(prs):
    slide, y = base_slide(prs, "Next Steps and How to Stay Involved",
                          eyebrow="Wrap-up")

    card(slide, 0.85, y, 3.73, 3.0, "Working groups",
         ["First meetings get scheduled",
          "within two weeks.",
          "",
          "Sign-up sheet circulates",
          "with the notes."],
         fill=BG_TINT, label_color=PRIMARY)
    card(slide, 4.78, y, 3.73, 3.0, "Where materials live",
         ["Slides, notes, and the",
          "resource list post to",
          "caphegroup.org and the",
          "shared drive."],
         fill=BG_TINT, label_color=PRIMARY)
    card(slide, 8.72, y, 3.73, 3.0, "Next session",
         ["Month and topic:",
          FILL_LINE,
          "",
          "Members can propose",
          "a topic any time."],
         fill=BG_TINT_GOLD, label_color=ACCENT)


def slide_16_closing(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    chrome(slide)

    tb = textbox(slide, 0.9, 1.35, 11.5, 0.55)
    para(tb.text_frame, "ONE LAST THING", 22, ACCENT, bold=True,
         align=PP_ALIGN.CENTER, first=True)

    tb = textbox(slide, 1.3, 2.0, 10.7, 1.7)
    para(tb.text_frame,
         "In one sentence in the chat: what are we most excited about "
         "after today?",
         38, PRIMARY, bold=True, align=PP_ALIGN.CENTER, first=True)

    rect(slide, 4.42, 3.90, 4.5, 0.05, ACCENT)

    rect(slide, 3.15, 4.30, 7.0, 1.75, BG_TINT, line=RULE)
    tb = textbox(slide, 3.45, 4.50, 6.4, 1.35)
    tf = tb.text_frame
    para(tf, "Stay in touch", 22, PRIMARY, bold=True,
         align=PP_ALIGN.CENTER, space_after=10, first=True)
    para(tf, "info@caphegroup.org", 24, TEXT_PRIMARY,
         align=PP_ALIGN.CENTER, space_after=6)
    para(tf, "caphegroup.org", 24, TEXT_PRIMARY, align=PP_ALIGN.CENTER)


# =============================================================================
# Build
# =============================================================================

def build(out_path: Path) -> Path:
    prs = new_deck()

    slide_01_title(prs)
    slide_02_purpose(prs)
    slide_03_what_is_caphe(prs)
    slide_04_agenda(prs)
    slide_05_ground_rules(prs)
    slide_06_intros(prs)
    slide_site_01_snapshot(prs)
    slide_site_02_who(prs)
    slide_site_03_how_found(prs)
    slide_site_04_attention(prs)
    slide_07_needs(prs)
    slide_08_capturing(prs)
    slide_09_voting(prs)
    slide_10_results(prs)
    slide_11_breakouts_overview(prs)
    slide_12_breakout_template(prs, "Group A", "HR1 Unwinding County Estimates")
    slide_12_breakout_template(prs, "Group B", "CHW Case Study and External Funding")
    slide_12_breakout_template(prs, "Group C", "Online Teaching and Receipts Curriculum")
    slide_13_resources(prs)
    slide_14_pilots(prs)
    slide_15_next_steps(prs)
    slide_16_closing(prs)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    prs.save(str(out_path))
    return out_path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=None)
    args = ap.parse_args()

    default = (Path(__file__).parent.parent / "outputs" / "presentations"
               / "CAPHE_Planning_Session.pptx")
    out = Path(args.out) if args.out else default
    path = build(out)
    print(f"Wrote {path}")
    print(f"Slides: {len(Presentation(str(path)).slides._sldIdLst)}")


if __name__ == "__main__":
    main()
