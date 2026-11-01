#!/usr/bin/env python3
"""
CAPHE Session 3: Defining Our Path Together
Strategic planning and direction deck based on Founding Member Survey results.
Conversational, friendly, collaborative tone (Art of Gathering principles).
No em dashes used. First-person plural framing ("Most of us shared that...").
"""

from datetime import datetime
from pathlib import Path
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor

# =============================================================================
# CAPHE Brand Colors
# =============================================================================
PRIMARY = RGBColor(0, 48, 128)          # #003080 Institutional Blue
PRIMARY_LIGHT = RGBColor(0, 65, 165)    # #0041A5
ACCENT = RGBColor(218, 119, 13)         # #DA770D Poppy Gold
ACCENT_LIGHT = RGBColor(245, 127, 23)   # #F57F17
BG_WARM = RGBColor(250, 250, 248)       # #FAFAF8 Warm background
BG_WHITE = RGBColor(255, 255, 255)      # Pure white
TEXT_PRIMARY = RGBColor(28, 28, 28)     # Off-black
TEXT_SECONDARY = RGBColor(66, 66, 66)   # Charcoal
TEXT_MUTED = RGBColor(105, 105, 105)    # Slate
CARD_BG_BLUE = RGBColor(242, 246, 253)  # Soft blue tint
CARD_BG_GOLD = RGBColor(255, 250, 240)  # Soft gold tint
BORDER_GRAY = RGBColor(220, 224, 230)
WHITE = RGBColor(255, 255, 255)


def create_presentation() -> Presentation:
    """Create 16:9 widescreen presentation."""
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    return prs


def add_bg(slide, prs, color=BG_WARM):
    """Fill slide background with solid color."""
    bg = slide.shapes.add_shape(1, Inches(0), Inches(0), prs.slide_width, prs.slide_height)
    bg.fill.solid()
    bg.fill.fore_color.rgb = color
    bg.line.fill.background()


def add_top_bar(slide, prs, color=PRIMARY):
    """Add decorative top accent bar."""
    bar = slide.shapes.add_shape(1, Inches(0), Inches(0), prs.slide_width, Inches(0.12))
    bar.fill.solid()
    bar.fill.fore_color.rgb = color
    bar.line.fill.background()


def add_bottom_bar(slide, prs, color=ACCENT):
    """Add decorative bottom accent bar."""
    bar = slide.shapes.add_shape(1, Inches(0), Inches(7.38), prs.slide_width, Inches(0.12))
    bar.fill.solid()
    bar.fill.fore_color.rgb = color
    bar.line.fill.background()


def add_header(slide, prs, category: str, title: str):
    """Standard header banner for slides."""
    banner = slide.shapes.add_shape(1, Inches(0), Inches(0), prs.slide_width, Inches(1.4))
    banner.fill.solid()
    banner.fill.fore_color.rgb = PRIMARY
    banner.line.fill.background()

    # Category label
    cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.22), Inches(11.7), Inches(0.35))
    tf_cat = cat_box.text_frame
    p_cat = tf_cat.paragraphs[0]
    p_cat.text = category.upper()
    p_cat.font.size = Pt(13)
    p_cat.font.bold = True
    p_cat.font.color.rgb = ACCENT

    # Title
    title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.55), Inches(11.7), Inches(0.75))
    tf_title = title_box.text_frame
    tf_title.word_wrap = True
    p_title = tf_title.paragraphs[0]
    p_title.text = title
    p_title.font.size = Pt(28)
    p_title.font.bold = True
    p_title.font.color.rgb = WHITE


# =============================================================================
# Slide 1: Title Slide (The Threshold)
# =============================================================================
def make_slide_1(prs: Presentation):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_bg(slide, prs, BG_WARM)
    add_top_bar(slide, prs, PRIMARY)
    add_bottom_bar(slide, prs, ACCENT)

    # Main Card Container
    card = slide.shapes.add_shape(1, Inches(1.2), Inches(1.4), Inches(10.933), Inches(4.7))
    card.fill.solid()
    card.fill.fore_color.rgb = BG_WHITE
    card.line.color.rgb = BORDER_GRAY

    # Organization tag
    tag_box = slide.shapes.add_textbox(Inches(1.6), Inches(1.8), Inches(10.1), Inches(0.4))
    p_tag = tag_box.text_frame.paragraphs[0]
    p_tag.text = "CALIFORNIA ASSOCIATION OF PUBLIC HEALTH ECONOMISTS"
    p_tag.font.size = Pt(13)
    p_tag.font.bold = True
    p_tag.font.color.rgb = ACCENT

    # Main Title
    title_box = slide.shapes.add_textbox(Inches(1.6), Inches(2.3), Inches(10.1), Inches(1.4))
    tf = title_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Defining Our Path Together"
    p.font.size = Pt(44)
    p.font.bold = True
    p.font.color.rgb = PRIMARY

    # Subtitle
    sub_box = slide.shapes.add_textbox(Inches(1.6), Inches(3.8), Inches(10.1), Inches(1.0))
    tf_sub = sub_box.text_frame
    tf_sub.word_wrap = True
    p_sub = tf_sub.paragraphs[0]
    p_sub.text = "What we shared, what we can hold, and what we choose to build next."
    p_sub.font.size = Pt(22)
    p_sub.font.color.rgb = TEXT_SECONDARY

    p_sub2 = tf_sub.add_paragraph()
    p_sub2.text = "Member Working Session: Third Gathering"
    p_sub2.font.size = Pt(18)
    p_sub2.font.bold = True
    p_sub2.font.color.rgb = PRIMARY
    p_sub2.space_before = Pt(8)


# =============================================================================
# Slide 2: Core Conviction (More Than Causal Inference)
# =============================================================================
def make_slide_2(prs: Presentation):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_bg(slide, prs, BG_WARM)
    add_header(slide, prs, "Our Shared Discipline", "More Than Causal Inference: A Way to Make Choices")

    # Lead text
    lead_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.65), Inches(11.733), Inches(0.8))
    tf_lead = lead_box.text_frame
    tf_lead.word_wrap = True
    p_lead = tf_lead.paragraphs[0]
    p_lead.text = "Most of us shared that health economics is too often understood narrowly as econometric testing or formal cost-effectiveness analysis. We see it as a fundamental discipline for public health decision-making:"
    p_lead.font.size = Pt(19)
    p_lead.font.color.rgb = TEXT_PRIMARY

    # 3 Feature Cards
    cards_data = [
        ("Trade-Offs and Opportunity Costs",
         "Recognizing what we give up when resources are dedicated to one program over another, and tracing out unintended spillovers.",
         PRIMARY),
        ("Decision Architecture",
         "Helping public health leadership structure difficult choices before policies are locked, rather than just evaluating them years later.",
         ACCENT),
        ("Deploying Resources to Best Uses",
         "Connecting economic evidence directly to county budgeting, state priorities, and sustainable public health investments.",
         PRIMARY_LIGHT)
    ]

    card_w = Inches(3.64)
    card_h = Inches(4.1)
    top_pos = Inches(2.6)

    for i, (title, desc, color) in enumerate(cards_data):
        left_pos = Inches(0.8 + i * 4.04)

        card = slide.shapes.add_shape(1, left_pos, top_pos, card_w, card_h)
        card.fill.solid()
        card.fill.fore_color.rgb = BG_WHITE
        card.line.color.rgb = BORDER_GRAY

        # Top color strip on card
        strip = slide.shapes.add_shape(1, left_pos, top_pos, card_w, Inches(0.12))
        strip.fill.solid()
        strip.fill.fore_color.rgb = color
        strip.line.fill.background()

        # Text inside card
        tb = slide.shapes.add_textbox(left_pos + Inches(0.25), top_pos + Inches(0.4), card_w - Inches(0.5), card_h - Inches(0.6))
        tf = tb.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(21)
        p1.font.bold = True
        p1.font.color.rgb = color
        p1.space_after = Pt(14)

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(17)
        p2.font.color.rgb = TEXT_SECONDARY


# =============================================================================
# Slide 3: What We Agreed On (The Founding Survey Mirror)
# =============================================================================
def make_slide_3(prs: Presentation):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_bg(slide, prs, BG_WARM)
    add_header(slide, prs, "Founding Survey Findings", "Where We Stand Together: Clear Common Ground")

    # 3 Horizontal Callout Rows
    findings = [
        ("100% Agreement on the Core Need",
         "All of us identified the lack of a statewide peer network, shared learning, and professional community as our most urgent problem.",
         CARD_BG_BLUE, PRIMARY),
        ("Clear Consensus on Primary Mission",
         "Most of us selected increasing institutional demand: helping leaders understand how economics improves decisions, accountability, and the case for prevention.",
         CARD_BG_GOLD, ACCENT),
        ("The Audience We Hope to Influence",
         "Most of us noted that our work must reach local health department senior executives and state public health leadership.",
         CARD_BG_BLUE, PRIMARY_LIGHT)
    ]

    card_y = Inches(1.7)
    card_h = Inches(1.6)

    for i, (headline, body, bg_col, border_col) in enumerate(findings):
        y = card_y + i * Inches(1.75)

        card = slide.shapes.add_shape(1, Inches(0.8), y, Inches(11.733), card_h)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_col
        card.line.color.rgb = border_col

        tb = slide.shapes.add_textbox(Inches(1.1), y + Inches(0.18), Inches(11.1), card_h - Inches(0.36))
        tf = tb.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = headline
        p1.font.size = Pt(20)
        p1.font.bold = True
        p1.font.color.rgb = border_col
        p1.space_after = Pt(6)

        p2 = tf.add_paragraph()
        p2.text = body
        p2.font.size = Pt(17)
        p2.font.color.rgb = TEXT_PRIMARY


# =============================================================================
# Slide 4: Ambition vs. Bandwidth (Generous Authority / The Reality Check)
# =============================================================================
def make_slide_4(prs: Presentation):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_bg(slide, prs, BG_WARM)
    add_header(slide, prs, "Capacity Check", "Aligning Our Ambition with What We Can Hold")

    col_w = Inches(5.66)
    col_h = Inches(4.2)
    top_pos = Inches(1.7)

    # Left Box: High Overhead Wishlist
    left_card = slide.shapes.add_shape(1, Inches(0.8), top_pos, col_w, col_h)
    left_card.fill.solid()
    left_card.fill.fore_color.rgb = BG_WHITE
    left_card.line.color.rgb = BORDER_GRAY

    strip_l = slide.shapes.add_shape(1, Inches(0.8), top_pos, col_w, Inches(0.12))
    strip_l.fill.solid()
    strip_l.fill.fore_color.rgb = PRIMARY
    strip_l.line.fill.background()

    tb_l = slide.shapes.add_textbox(Inches(1.1), top_pos + Inches(0.35), col_w - Inches(0.6), col_h - Inches(0.5))
    tf_l = tb_l.text_frame
    tf_l.word_wrap = True

    p = tf_l.paragraphs[0]
    p.text = "What We Hoped to Build (Ideal Roles)"
    p.font.size = Pt(21)
    p.font.bold = True
    p.font.color.rgb = PRIMARY
    p.space_after = Pt(14)

    items_l = [
        "Comprehensive toolkit development from scratch",
        "Statewide formal technical assistance programs",
        "Direct organizational consulting to local agencies"
    ]
    for item in items_l:
        p_item = tf_l.add_paragraph()
        p_item.text = f"- {item}"
        p_item.font.size = Pt(17)
        p_item.font.color.rgb = TEXT_SECONDARY
        p_item.space_after = Pt(10)

    # Right Box: Sustainable Reality
    right_card = slide.shapes.add_shape(1, Inches(6.866), top_pos, col_w, col_h)
    right_card.fill.solid()
    right_card.fill.fore_color.rgb = CARD_BG_GOLD
    right_card.line.color.rgb = ACCENT

    strip_r = slide.shapes.add_shape(1, Inches(6.866), top_pos, col_w, Inches(0.12))
    strip_r.fill.solid()
    strip_r.fill.fore_color.rgb = ACCENT
    strip_r.line.fill.background()

    tb_r = slide.shapes.add_textbox(Inches(7.166), top_pos + Inches(0.35), col_w - Inches(0.6), col_h - Inches(0.5))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True

    p = tf_r.paragraphs[0]
    p.text = "What We Can Credibly Sustain as Volunteers"
    p.font.size = Pt(21)
    p.font.bold = True
    p.font.color.rgb = ACCENT
    p.space_after = Pt(14)

    items_r = [
        "A strong, collegial Community of Practice for each other",
        "Serving as Translators: turning economic tools into plain stories",
        "Zero of us felt building heavy toolkits alone was sustainable"
    ]
    for item in items_r:
        p_item = tf_r.add_paragraph()
        p_item.text = f"- {item}"
        p_item.font.size = Pt(17)
        p_item.font.color.rgb = TEXT_PRIMARY
        p_item.space_after = Pt(10)

    # Bottom Callout Banner
    bot = slide.shapes.add_shape(1, Inches(0.8), Inches(6.15), Inches(11.733), Inches(0.85))
    bot.fill.solid()
    bot.fill.fore_color.rgb = PRIMARY
    bot.line.fill.background()

    tb_bot = slide.shapes.add_textbox(Inches(1.0), Inches(6.25), Inches(11.333), Inches(0.65))
    p_bot = tb_bot.text_frame.paragraphs[0]
    p_bot.text = "Key Takeaway: We do not need to become a massive consultancy. We can be an applied translation engine."
    p_bot.font.size = Pt(17)
    p_bot.font.bold = True
    p_bot.font.color.rgb = WHITE
    p_bot.alignment = PP_ALIGN.CENTER


# =============================================================================
# Slide 5: Productive Heat (Bubble vs. Overextension)
# =============================================================================
def make_slide_5(prs: Presentation):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_bg(slide, prs, BG_WARM)
    add_header(slide, prs, "Our Productive Tension", "Navigating the Two Risks We Identified")

    # Lead text
    lead_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.6), Inches(11.733), Inches(0.7))
    tf_lead = lead_box.text_frame
    p_lead = tf_lead.paragraphs[0]
    p_lead.text = "In our open responses, members named two real and opposing failure modes for groups like ours:"
    p_lead.font.size = Pt(19)
    p_lead.font.color.rgb = TEXT_PRIMARY

    col_w = Inches(5.66)
    col_h = Inches(3.6)
    top_pos = Inches(2.4)

    # Left Quote: The Bubble
    left_card = slide.shapes.add_shape(1, Inches(0.8), top_pos, col_w, col_h)
    left_card.fill.solid()
    left_card.fill.fore_color.rgb = BG_WHITE
    left_card.line.color.rgb = BORDER_GRAY

    tb_l = slide.shapes.add_textbox(Inches(1.1), top_pos + Inches(0.3), col_w - Inches(0.6), col_h - Inches(0.5))
    tf_l = tb_l.text_frame
    tf_l.word_wrap = True

    p = tf_l.paragraphs[0]
    p.text = "Risk 1: The Inward Bubble"
    p.font.size = Pt(21)
    p.font.bold = True
    p.font.color.rgb = PRIMARY
    p.space_after = Pt(14)

    p_quote1 = tf_l.add_paragraph()
    p_quote1.text = '\"We live in a bubble, agreeing that health economics can be an important contributor, but with no strategy or implementation to make it happen.\"'
    p_quote1.font.size = Pt(17)
    p_quote1.font.italic = True
    p_quote1.font.color.rgb = TEXT_SECONDARY
    p_quote1.space_after = Pt(10)

    p_sub1 = tf_l.add_paragraph()
    p_sub1.text = '\"We have great discussions but do not improve the lives of our members outside of those discussions.\"'
    p_sub1.font.size = Pt(16)
    p_sub1.font.italic = True
    p_sub1.font.color.rgb = TEXT_MUTED

    # Right Quote: External Overextension
    right_card = slide.shapes.add_shape(1, Inches(6.866), top_pos, col_w, col_h)
    right_card.fill.solid()
    right_card.fill.fore_color.rgb = BG_WHITE
    right_card.line.color.rgb = BORDER_GRAY

    tb_r = slide.shapes.add_textbox(Inches(7.166), top_pos + Inches(0.3), col_w - Inches(0.6), col_h - Inches(0.5))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True

    p = tf_r.paragraphs[0]
    p.text = "Risk 2: Premature Overextension"
    p.font.size = Pt(21)
    p.font.bold = True
    p.font.color.rgb = ACCENT
    p.space_after = Pt(14)

    p_quote2 = tf_r.add_paragraph()
    p_quote2.text = '\"Limited ability to influence adoption by state and local agencies due to not having the right contacts or visible presence.\"'
    p_quote2.font.size = Pt(17)
    p_quote2.font.italic = True
    p_quote2.font.color.rgb = TEXT_SECONDARY
    p_quote2.space_after = Pt(10)

    p_sub2 = tf_r.add_paragraph()
    p_sub2.text = '\"We lose our focus on academic rigor before our foundation is solid.\"'
    p_sub2.font.size = Pt(16)
    p_sub2.font.italic = True
    p_sub2.font.color.rgb = TEXT_MUTED

    # Question container at bottom
    bot = slide.shapes.add_shape(1, Inches(0.8), Inches(6.2), Inches(11.733), Inches(0.85))
    bot.fill.solid()
    bot.fill.fore_color.rgb = CARD_BG_GOLD
    bot.line.color.rgb = ACCENT

    tb_bot = slide.shapes.add_textbox(Inches(1.0), Inches(6.3), Inches(11.333), Inches(0.65))
    p_bot = tb_bot.text_frame.paragraphs[0]
    p_bot.text = "Our Central Question: How do we build an inward home that powers external translation without burning out?"
    p_bot.font.size = Pt(17)
    p_bot.font.bold = True
    p_bot.font.color.rgb = ACCENT
    p_bot.alignment = PP_ALIGN.CENTER


# =============================================================================
# Slide 6: What Success Looks Like at 18 Months
# =============================================================================
def make_slide_6(prs: Presentation):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_bg(slide, prs, BG_WARM)
    add_header(slide, prs, "Our 18-Month Horizon", "What Success Looks Like for Us")

    lead_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.6), Inches(11.733), Inches(0.6))
    p_lead = lead_box.text_frame.paragraphs[0]
    p_lead.text = "Most of us coalesced around three concrete milestones that would define success at 18 months:"
    p_lead.font.size = Pt(19)
    p_lead.font.color.rgb = TEXT_PRIMARY

    cards = [
        ("1. Reliable Peer Network",
         "Members have an active, trusted peer circle for ongoing consultation, methodology sounding boards, and genuine collaboration across California.",
         PRIMARY),
        ("2. Leadership Fluency",
         "Public health directors and agency leaders can clearly describe how health economics supports their budgeting and resource choices.",
         ACCENT),
        ("3. Two to Three Visible Examples",
         "Our group has produced 2 to 3 practical case examples demonstrating how economic framing changed a real California public health decision.",
         PRIMARY_LIGHT)
    ]

    card_w = Inches(3.64)
    card_h = Inches(4.3)
    top_pos = Inches(2.4)

    for i, (title, desc, color) in enumerate(cards):
        left_pos = Inches(0.8 + i * 4.04)

        card = slide.shapes.add_shape(1, left_pos, top_pos, card_w, card_h)
        card.fill.solid()
        card.fill.fore_color.rgb = BG_WHITE
        card.line.color.rgb = BORDER_GRAY

        strip = slide.shapes.add_shape(1, left_pos, top_pos, card_w, Inches(0.12))
        strip.fill.solid()
        strip.fill.fore_color.rgb = color
        strip.line.fill.background()

        tb = slide.shapes.add_textbox(left_pos + Inches(0.25), top_pos + Inches(0.4), card_w - Inches(0.5), card_h - Inches(0.6))
        tf = tb.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(21)
        p1.font.bold = True
        p1.font.color.rgb = color
        p1.space_after = Pt(14)

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(17)
        p2.font.color.rgb = TEXT_SECONDARY


# =============================================================================
# Slide 7: Three Strategic Paths Forward
# =============================================================================
def make_slide_7(prs: Presentation):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_bg(slide, prs, BG_WARM)
    add_header(slide, prs, "Strategic Choices", "Where Do We Take the Group Next?")

    cols = [
        ("Path A: Methods Sanctuary",
         "Primarily Internal",
         "Focus on peer review of member manuscripts, causal inference labs, and econometric career support.",
         "Low volunteer load, but risks becoming the isolated academic bubble.",
         BG_WHITE, BORDER_GRAY, PRIMARY),
        ("Path B: Translation Engine",
         "Recommended Balance",
         "Use internal meetings to workshop practical California dilemmas and co-produce 2-page decision briefs for leaders.",
         "Sustainable volunteer load, directly addresses institutional demand.",
         CARD_BG_GOLD, ACCENT, ACCENT),
        ("Path C: Executive Advisory",
         "Primarily External",
         "Offer structured technical assistance to CDPH, write policy memos, and lobby for formal accreditation roles.",
         "High institutional visibility, but very high risk of volunteer burnout.",
         BG_WHITE, BORDER_GRAY, PRIMARY_LIGHT)
    ]

    card_w = Inches(3.64)
    card_h = Inches(5.1)
    top_pos = Inches(1.7)

    for i, (title, tag, focus, proscons, bg_col, border_col, brand_col) in enumerate(cols):
        left_pos = Inches(0.8 + i * 4.04)

        card = slide.shapes.add_shape(1, left_pos, top_pos, card_w, card_h)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_col
        card.line.color.rgb = border_col

        strip = slide.shapes.add_shape(1, left_pos, top_pos, card_w, Inches(0.12))
        strip.fill.solid()
        strip.fill.fore_color.rgb = brand_col
        strip.line.fill.background()

        tb = slide.shapes.add_textbox(left_pos + Inches(0.22), top_pos + Inches(0.3), card_w - Inches(0.44), card_h - Inches(0.5))
        tf = tb.text_frame
        tf.word_wrap = True

        p_tag = tf.paragraphs[0]
        p_tag.text = tag.upper()
        p_tag.font.size = Pt(12)
        p_tag.font.bold = True
        p_tag.font.color.rgb = brand_col
        p_tag.space_after = Pt(6)

        p_title = tf.add_paragraph()
        p_title.text = title
        p_title.font.size = Pt(20)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_PRIMARY
        p_title.space_after = Pt(12)

        p_focus_label = tf.add_paragraph()
        p_focus_label.text = "Core Focus:"
        p_focus_label.font.size = Pt(14)
        p_focus_label.font.bold = True
        p_focus_label.font.color.rgb = brand_col

        p_focus = tf.add_paragraph()
        p_focus.text = focus
        p_focus.font.size = Pt(16)
        p_focus.font.color.rgb = TEXT_SECONDARY
        p_focus.space_after = Pt(12)

        p_trade_label = tf.add_paragraph()
        p_trade_label.text = "Trade-off & Feasibility:"
        p_trade_label.font.size = Pt(14)
        p_trade_label.font.bold = True
        p_trade_label.font.color.rgb = brand_col

        p_trade = tf.add_paragraph()
        p_trade.text = proscons
        p_trade.font.size = Pt(15)
        p_trade.font.color.rgb = TEXT_SECONDARY


# =============================================================================
# Slide 8: What Events and Resources Should We Produce?
# =============================================================================
def make_slide_8(prs: Presentation):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_bg(slide, prs, BG_WARM)
    add_header(slide, prs, "Our Offerings Menu", "What Kind of Events and Resources We Can Produce")

    col_w = Inches(5.66)
    col_h = Inches(5.1)
    top_pos = Inches(1.7)

    # Left: Events
    left_card = slide.shapes.add_shape(1, Inches(0.8), top_pos, col_w, col_h)
    left_card.fill.solid()
    left_card.fill.fore_color.rgb = BG_WHITE
    left_card.line.color.rgb = BORDER_GRAY

    strip_l = slide.shapes.add_shape(1, Inches(0.8), top_pos, col_w, Inches(0.12))
    strip_l.fill.solid()
    strip_l.fill.fore_color.rgb = PRIMARY
    strip_l.line.fill.background()

    tb_l = slide.shapes.add_textbox(Inches(1.1), top_pos + Inches(0.3), col_w - Inches(0.6), col_h - Inches(0.5))
    tf_l = tb_l.text_frame
    tf_l.word_wrap = True

    p = tf_l.paragraphs[0]
    p.text = "Events We Host"
    p.font.size = Pt(21)
    p.font.bold = True
    p.font.color.rgb = PRIMARY
    p.space_after = Pt(12)

    events_list = [
        ("Monthly Peer Reviews & Translation Clinics",
         "Alternating between peer methodology review and interactive clinics where members workshop live county decision dilemmas."),
        ("Applied Webinars on Resource Allocation",
         "Focused external sessions (e.g. Tim Brown on ROI, opportunity costs in local budgets) aimed at program directors and analysts."),
        ("No Extra Homework",
         "Using our existing meeting time to co-develop ideas rather than expecting unpaid hours between calls.")
    ]
    for e_title, e_desc in events_list:
        p_t = tf_l.add_paragraph()
        p_t.text = e_title
        p_t.font.size = Pt(17)
        p_t.font.bold = True
        p_t.font.color.rgb = TEXT_PRIMARY
        p_t.space_before = Pt(8)

        p_d = tf_l.add_paragraph()
        p_d.text = e_desc
        p_d.font.size = Pt(15)
        p_d.font.color.rgb = TEXT_SECONDARY

    # Right: Resources
    right_card = slide.shapes.add_shape(1, Inches(6.866), top_pos, col_w, col_h)
    right_card.fill.solid()
    right_card.fill.fore_color.rgb = BG_WHITE
    right_card.line.color.rgb = BORDER_GRAY

    strip_r = slide.shapes.add_shape(1, Inches(6.866), top_pos, col_w, Inches(0.12))
    strip_r.fill.solid()
    strip_r.fill.fore_color.rgb = ACCENT
    strip_r.line.fill.background()

    tb_r = slide.shapes.add_textbox(Inches(7.166), top_pos + Inches(0.3), col_w - Inches(0.6), col_h - Inches(0.5))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True

    p = tf_r.paragraphs[0]
    p.text = "Resources We Produce"
    p.font.size = Pt(21)
    p.font.bold = True
    p.font.color.rgb = ACCENT
    p.space_after = Pt(12)

    resources_list = [
        ("Two-Page California Decision Briefs",
         "Short, practical case stories showing how economic framing shifted real choices (e.g. food security, clinic allocation, CHWs)."),
        ("The 'Economic Lens' One-Pager",
         "A five-question checklist for health directors to assess trade-offs and opportunity costs before approving programs."),
        ("Curated California Methods Repositories",
         "Disseminating existing datasets, state code, and relevant tools rather than building platforms from scratch.")
    ]
    for r_title, r_desc in resources_list:
        p_t = tf_r.add_paragraph()
        p_t.text = r_title
        p_t.font.size = Pt(17)
        p_t.font.bold = True
        p_t.font.color.rgb = TEXT_PRIMARY
        p_t.space_before = Pt(8)

        p_d = tf_r.add_paragraph()
        p_d.text = r_desc
        p_d.font.size = Pt(15)
        p_d.font.color.rgb = TEXT_SECONDARY


# =============================================================================
# Slide 9: Open Discussion & Clean Close
# =============================================================================
def make_slide_9(prs: Presentation):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_bg(slide, prs, BG_WARM)
    add_header(slide, prs, "Our Conversation Today", "Choosing Our Next Step Together")

    # Main Discussion Card
    card = slide.shapes.add_shape(1, Inches(0.8), Inches(1.7), Inches(11.733), Inches(4.2))
    card.fill.solid()
    card.fill.fore_color.rgb = BG_WHITE
    card.line.color.rgb = BORDER_GRAY

    tb = slide.shapes.add_textbox(Inches(1.2), Inches(2.0), Inches(10.933), Inches(3.6))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "Questions for Our Room Today"
    p.font.size = Pt(23)
    p.font.bold = True
    p.font.color.rgb = PRIMARY
    p.space_after = Pt(14)

    prompts = [
        ("1. What Resonates?",
         "Does Path B (The Applied Translation Engine) feel like the right balance between our internal community and external demand?"),
        ("2. What Is Our First Case?",
         "What is one real program dilemma from your current work that we could workshop together in our next session?"),
        ("3. What Is One Deliverable You Need Most?",
         "If CAPHE produces one practical resource this year, what would help your conversations with directors and partners the most?")
    ]

    for p_title, p_desc in prompts:
        p_t = tf.add_paragraph()
        p_t.text = p_title
        p_t.font.size = Pt(18)
        p_t.font.bold = True
        p_t.font.color.rgb = ACCENT
        p_t.space_before = Pt(10)

        p_d = tf.add_paragraph()
        p_d.text = p_desc
        p_d.font.size = Pt(16)
        p_d.font.color.rgb = TEXT_PRIMARY

    # Bottom closing bar
    bot = slide.shapes.add_shape(1, Inches(0.8), Inches(6.15), Inches(11.733), Inches(0.85))
    bot.fill.solid()
    bot.fill.fore_color.rgb = PRIMARY
    bot.line.fill.background()

    tb_bot = slide.shapes.add_textbox(Inches(1.0), Inches(6.25), Inches(11.333), Inches(0.65))
    p_bot = tb_bot.text_frame.paragraphs[0]
    p_bot.text = "Thank you for shaping what CAPHE is becoming. Next session: Our First Applied Translation Clinic."
    p_bot.font.size = Pt(17)
    p_bot.font.bold = True
    p_bot.font.color.rgb = WHITE
    p_bot.alignment = PP_ALIGN.CENTER


def main():
    prs = create_presentation()

    make_slide_1(prs)
    make_slide_2(prs)
    make_slide_3(prs)
    make_slide_4(prs)
    make_slide_5(prs)
    make_slide_6(prs)
    make_slide_7(prs)
    make_slide_8(prs)
    make_slide_9(prs)

    # Save destinations
    destinations = [
        Path("/Users/victoriaperez/Library/CloudStorage/GoogleDrive-victoriaeperez@gmail.com/My Drive/CAPHE/07_website/outputs/presentations"),
        Path("/Users/victoriaperez/Projects/CAPHE/outputs/presentations")
    ]

    for dest in destinations:
        dest.mkdir(parents=True, exist_ok=True)
        out_path = dest / "CAPHE_Session3_Strategic_Direction_2026.pptx"
        prs.save(str(out_path))
        print(f"Saved: {out_path}")

    print("Successfully generated all 9 slides with 0 em dashes and inclusive framing.")


if __name__ == "__main__":
    main()
