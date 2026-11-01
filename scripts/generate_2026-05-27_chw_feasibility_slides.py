#!/usr/bin/env python3
"""
CAPHE Member Meeting — May 27, 2026
Feature presentation: CHW Feasibility Study for an economics audience (20-30 min).

Brand: institutional blue + poppy gold (matches caphegroup.org).
Numbers verified against:
  CHWs/08_PhD_Final/FinalReport_EconomicAnalysis/CHW_Preliminary_Board_Report.tex
Tone: member-meeting (curious not corporate), question-per-slide where useful,
joint-inquiry framing for limitations.
"""

from datetime import datetime
from pathlib import Path

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE
from pptx.dml.color import RGBColor

# ---- CAPHE brand ----------------------------------------------------------
PRIMARY = RGBColor(0, 48, 128)          # institutional blue
PRIMARY_LIGHT = RGBColor(0, 65, 165)
ACCENT = RGBColor(218, 119, 13)         # poppy gold
BG_WARM = RGBColor(250, 250, 248)
TEXT = RGBColor(28, 28, 28)
TEXT_SEC = RGBColor(66, 66, 66)
TEXT_MUTED = RGBColor(100, 100, 100)
WHITE = RGBColor(255, 255, 255)
GREEN = RGBColor(46, 125, 50)
RED = RGBColor(176, 0, 32)

MEETING_DATE = datetime(2026, 5, 27)

# ---- helpers --------------------------------------------------------------

def new_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    return prs

def blank(prs):
    return prs.slides.add_slide(prs.slide_layouts[6])

def fill_bg(slide, prs, color=BG_WARM):
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
    bg.fill.solid(); bg.fill.fore_color.rgb = color; bg.line.fill.background()

def topbar(slide, prs, color=PRIMARY):
    bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, Inches(0.15))
    bar.fill.solid(); bar.fill.fore_color.rgb = color; bar.line.fill.background()

def bottombar(slide, prs, color=ACCENT):
    bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(7.35), prs.slide_width, Inches(0.15))
    bar.fill.solid(); bar.fill.fore_color.rgb = color; bar.line.fill.background()

def textbox(slide, left, top, width, height, text, *, size=24, bold=False,
            color=TEXT, align=PP_ALIGN.LEFT, space_after=0):
    box = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(height))
    tf = box.text_frame; tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = text
    p.font.size = Pt(size); p.font.bold = bold; p.font.color.rgb = color
    p.alignment = align
    if space_after: p.space_after = Pt(space_after)
    return tf

def bullets(slide, left, top, width, height, items, *, size=20, color=TEXT,
            space_after=12):
    """items: list of strings OR list of (text, kwargs_dict)."""
    box = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(height))
    tf = box.text_frame; tf.word_wrap = True
    for i, item in enumerate(items):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        if isinstance(item, tuple):
            text, kw = item
        else:
            text, kw = item, {}
        p.text = text
        p.font.size = Pt(kw.get("size", size))
        p.font.bold = kw.get("bold", False)
        p.font.color.rgb = kw.get("color", color)
        p.alignment = kw.get("align", PP_ALIGN.LEFT)
        p.space_after = Pt(kw.get("space_after", space_after))
    return tf

def header(slide, prs, title, eyebrow=None):
    topbar(slide, prs)
    if eyebrow:
        textbox(slide, 0.6, 0.32, 12.13, 0.28, eyebrow.upper(),
                size=13, bold=True, color=ACCENT)
        textbox(slide, 0.6, 0.72, 12.13, 0.75, title,
                size=30, bold=True, color=PRIMARY)
    else:
        textbox(slide, 0.6, 0.45, 12.13, 0.75, title,
                size=30, bold=True, color=PRIMARY)

def footer(slide, prs, page_label):
    textbox(slide, 0.6, 7.32, 6, 0.16,
            "CAPHE Member Meeting · May 27, 2026", size=10, color=TEXT_MUTED)
    textbox(slide, 7.0, 7.32, 6.13, 0.16, page_label,
            size=10, color=TEXT_MUTED, align=PP_ALIGN.RIGHT)

# ---- slide builders -------------------------------------------------------

def s_title(prs):
    slide = blank(prs)
    fill_bg(slide, prs)
    topbar(slide, prs); bottombar(slide, prs)
    textbox(slide, 0.5, 1.3, 12.33, 0.95, "CAPHE",
            size=66, bold=True, color=PRIMARY, align=PP_ALIGN.CENTER)
    textbox(slide, 0.5, 2.3, 12.33, 0.4,
            "California Association of Public Health Economists",
            size=20, color=TEXT, align=PP_ALIGN.CENTER)
    textbox(slide, 0.5, 3.4, 12.33, 0.3, "MEMBER MEETING",
            size=14, bold=True, color=ACCENT, align=PP_ALIGN.CENTER)
    textbox(slide, 0.5, 3.85, 12.33, 0.7,
            "Costing a CHW/Promotor Program",
            size=38, bold=True, color=PRIMARY, align=PP_ALIGN.CENTER)
    textbox(slide, 0.5, 4.75, 12.33, 0.5,
            "What the Santa Clara County feasibility study can and cannot tell us",
            size=20, color=TEXT_SEC, align=PP_ALIGN.CENTER)
    textbox(slide, 0.5, 5.95, 12.33, 0.3,
            MEETING_DATE.strftime("%B %d, %Y") + "  ·  11:00 AM – 12:00 PM PT",
            size=18, color=TEXT_MUTED, align=PP_ALIGN.CENTER)
    textbox(slide, 0.5, 6.4, 12.33, 0.3,
            "Victoria Cholette  ·  Santa Clara County Public Health Department",
            size=16, color=TEXT_MUTED, align=PP_ALIGN.CENTER)

def s_agenda(prs):
    slide = blank(prs); fill_bg(slide, prs)
    header(slide, prs, "Today's Agenda", eyebrow="Member Meeting")
    items = [
        "1.  Welcome & Icebreaker  (5 min)",
        "2.  Feature: Costing a CHW/Promotor program  (25 min + Q&A)",
        ("       What we set out to answer", {"size": 18, "color": TEXT_SEC}),
        ("       The four evidence streams and why economists should care about KIIs", {"size": 18, "color": TEXT_SEC}),
        ("       Unit economics, ROI by perspective, what flips the result", {"size": 18, "color": TEXT_SEC}),
        ("       Where community input changed the analysis", {"size": 18, "color": TEXT_SEC}),
        "3.  Open questions for the room  (10 min)",
        "4.  Updates & next meeting  (5 min)",
    ]
    bullets(slide, 0.9, 2.0, 11.5, 5.0, items, size=22, space_after=10)
    footer(slide, prs, "Slide 2")

def s_research_questions(prs):
    slide = blank(prs); fill_bg(slide, prs)
    header(slide, prs, "What we set out to answer",
           eyebrow="Research questions, in plain language")
    items = [
        ("1. Is there a need for a CHW/Promotor program in our focus communities?",
         {"size": 22, "bold": True, "color": PRIMARY, "space_after": 8}),
        ("       Population, disease burden, and access gaps in 10 ZIP codes across East San José, Cadillac Winchester, and South County.",
         {"size": 17, "color": TEXT_SEC, "space_after": 18}),
        ("2. What workforce and infrastructure already exist?",
         {"size": 22, "bold": True, "color": PRIMARY, "space_after": 8}),
        ("       Who employs CHWs/Promotores today, under what funding, and what would absorb new positions?",
         {"size": 17, "color": TEXT_SEC, "space_after": 18}),
        ("3. What would a program cost, and what returns could it generate?",
         {"size": 22, "bold": True, "color": PRIMARY, "space_after": 8}),
        ("       From two perspectives the County actually has to choose between: Medi-Cal budget vs. the broader healthcare system.",
         {"size": 17, "color": TEXT_SEC, "space_after": 8}),
    ]
    bullets(slide, 0.7, 1.8, 12.0, 5.2, items)
    footer(slide, prs, "Slide 3")

def s_design(prs):
    slide = blank(prs); fill_bg(slide, prs)
    header(slide, prs, "The design: four evidence streams, one question",
           eyebrow="Methodology")
    # 4 boxes in 2x2
    boxes = [
        ("WORKFORCE LANDSCAPE",
         "Who operates CHW programs today, contracts, FTE, funding sources.",
         0.7, 1.85),
        ("PUBLISHED LITERATURE",
         "Systematic review · published ROI range $2.47–$11 per $1 · CEA in 78–93% of scenarios.",
         6.95, 1.85),
        ("ECONOMIC MODELING",
         "Unit economics · ROI · Budget impact · Cost-effectiveness · Equity gap closure.",
         0.7, 4.45),
        ("STAKEHOLDER ENGAGEMENT",
         "17 KIIs (Dec '25–Mar '26) · 210-respondent survey · supervisor focus group · community advisory.",
         6.95, 4.45),
    ]
    for title, body, left, top in boxes:
        card = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(left), Inches(top),
                                      Inches(5.7), Inches(2.4))
        card.fill.solid(); card.fill.fore_color.rgb = WHITE
        card.line.color.rgb = PRIMARY; card.line.width = Pt(0.75)
        textbox(slide, left + 0.25, top + 0.25, 5.2, 0.3, title,
                size=14, bold=True, color=ACCENT)
        textbox(slide, left + 0.25, top + 0.7, 5.2, 1.55, body,
                size=17, color=TEXT)
    textbox(slide, 0.7, 7.0, 12.0, 0.3,
            "Single-stream studies under-identify costs and over-identify effects. Triangulation is the identification strategy.",
            size=14, color=TEXT_SEC, align=PP_ALIGN.CENTER)
    footer(slide, prs, "Slide 4")

def s_kii_for_economists(prs):
    slide = blank(prs); fill_bg(slide, prs)
    header(slide, prs, "Why KIIs belong in an economic analysis",
           eyebrow="Key informant interviews")
    textbox(slide, 0.7, 1.75, 12.0, 0.4,
            "Three jobs the interviews did that secondary data could not:",
            size=20, color=TEXT, bold=True)
    items = [
        ("1. Parameter values the literature does not report locally.",
         {"size": 20, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("       Annual turnover (~10%), absorptive capacity ceiling (~20%/yr workforce growth), hub fixed cost ($800K–$1.2M/yr), minimum funding horizon (5 years).",
         {"size": 16, "color": TEXT_SEC, "space_after": 14}),
        ("2. Decision-maker preferences over outputs.",
         {"size": 20, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("       Informants ranked total budget impact first, ROI second, health outcomes tied to financial stability third. That ordering shaped which figures we built.",
         {"size": 16, "color": TEXT_SEC, "space_after": 14}),
        ("3. Identification of what the model cannot capture.",
         {"size": 20, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("       The clinical pathway is billable and measurable. The community resilience pathway is neither, but interviews documented that it produces the trust that makes the clinical pathway work.",
         {"size": 16, "color": TEXT_SEC, "space_after": 4}),
    ]
    bullets(slide, 0.7, 2.4, 12.0, 4.8, items)
    footer(slide, prs, "Slide 5")

def s_who_we_talked_to(prs):
    slide = blank(prs); fill_bg(slide, prs)
    header(slide, prs, "Who we talked to", eyebrow="Sample and sources")
    # 4 stat cards
    cards = [
        ("17", "Key informant interviews", "Dec 2025 – Mar 2026"),
        ("210", "Workforce survey respondents", "24+ organizations · bilingual"),
        ("1", "Supervisor focus group", "CHW/Promotor managers"),
        ("1", "Community advisory session", "CHWs/Promotores themselves"),
    ]
    for i, (n, label, sub) in enumerate(cards):
        left = 0.7 + i * 3.1
        card = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(left), Inches(2.0),
                                      Inches(2.85), Inches(2.6))
        card.fill.solid(); card.fill.fore_color.rgb = WHITE
        card.line.color.rgb = PRIMARY; card.line.width = Pt(0.75)
        textbox(slide, left, 2.2, 2.85, 0.9, n,
                size=54, bold=True, color=PRIMARY, align=PP_ALIGN.CENTER)
        textbox(slide, left, 3.3, 2.85, 0.35, label,
                size=15, bold=True, color=TEXT, align=PP_ALIGN.CENTER)
        textbox(slide, left, 3.75, 2.85, 0.35, sub,
                size=12, color=TEXT_MUTED, align=PP_ALIGN.CENTER)
    textbox(slide, 0.7, 5.0, 12.0, 0.5,
            "Stakeholders ranged across CBO leaders, community college administrators, managed care plan representatives, and County program managers.",
            size=16, color=TEXT_SEC)
    textbox(slide, 0.7, 5.7, 12.0, 1.2,
            "Sampling logic: every organization that currently funds, employs, supervises, or trains CHWs in the focus areas; "
            "every payer that could reimburse; every department with line-item exposure to the downstream costs CHWs would offset.",
            size=15, color=TEXT_MUTED)
    footer(slide, prs, "Slide 6")

def s_unit_economics(prs):
    slide = blank(prs); fill_bg(slide, prs)
    header(slide, prs, "The unit: one CHW/Promotor, one year",
           eyebrow="Unit economics")
    # 3 columns
    cols = [
        ("$113,000", "Annual cost",
         "Salary, benefits, supervision, training, overhead. Per worker, all-in.", PRIMARY),
        ("55", "Patients served",
         "Caseload per CHW per year. Drives the per-patient denominator.", TEXT),
        ("$278,000", "Healthcare savings",
         "$100K to managed care plan · $178K to hospital system.", GREEN),
    ]
    for i, (big, label, body, color) in enumerate(cols):
        left = 0.7 + i * 4.2
        card = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(left), Inches(1.9),
                                      Inches(3.9), Inches(3.0))
        card.fill.solid(); card.fill.fore_color.rgb = WHITE
        card.line.color.rgb = PRIMARY; card.line.width = Pt(0.75)
        textbox(slide, left, 2.1, 3.9, 0.95, big,
                size=46, bold=True, color=color, align=PP_ALIGN.CENTER)
        textbox(slide, left + 0.1, 3.15, 3.7, 0.35, label,
                size=18, bold=True, color=TEXT, align=PP_ALIGN.CENTER)
        textbox(slide, left + 0.2, 3.6, 3.5, 1.2, body,
                size=14, color=TEXT_SEC, align=PP_ALIGN.CENTER)
    textbox(slide, 0.7, 5.2, 12.0, 0.6,
            "Steady-state net: +$165,400 per CHW/year from the healthcare system perspective.",
            size=22, bold=True, color=PRIMARY)
    textbox(slide, 0.7, 5.8, 12.0, 1.2,
            "Per-CHW figures are stable across scale. Per-patient: $2,050 annual cost, $5,060 annual savings. "
            "Hub infrastructure is separate and scales differently — that is the next slide.",
            size=15, color=TEXT_SEC)
    footer(slide, prs, "Slide 7")

def s_hub_scale(prs):
    slide = blank(prs); fill_bg(slide, prs)
    header(slide, prs, "Where scale economies live: the hub, not the worker",
           eyebrow="Fixed cost stack")
    items = [
        ("Hub infrastructure is a fixed cost: $800K–$1.2M/year.",
         {"size": 22, "bold": True, "color": PRIMARY, "space_after": 10}),
        ("Provides billing, credentialing, quality assurance across the CBO ecosystem.",
         {"size": 17, "color": TEXT_SEC, "space_after": 18}),
        ("At 20 CHWs: adds ~$50,000/CHW.   At 150 CHWs: adds ~$5,300–$8,000/CHW.",
         {"size": 20, "bold": True, "color": TEXT, "space_after": 14}),
        ("Why this matters for the model:",
         {"size": 18, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("       • Total per-CHW cost falls with program size, even though direct per-CHW cost does not.",
         {"size": 16, "color": TEXT_SEC, "space_after": 4}),
        ("       • Small pilots understate the program's economics. Large programs are not optional if the hub is built.",
         {"size": 16, "color": TEXT_SEC, "space_after": 4}),
        ("       • Every peer county that has scaled past 100 CHWs (LA, Alameda, others) runs a hub.",
         {"size": 16, "color": TEXT_SEC, "space_after": 4}),
        ("Question for the room: how should fixed-cost amortization show up in the headline ROI we report to policymakers?",
         {"size": 16, "bold": True, "color": ACCENT, "space_after": 0}),
    ]
    bullets(slide, 0.7, 1.8, 12.0, 5.4, items)
    footer(slide, prs, "Slide 8")

def s_roi_table(prs):
    slide = blank(prs); fill_bg(slide, prs)
    header(slide, prs, "ROI and CEA depend entirely on perspective",
           eyebrow="The headline result")
    # Build a table 3 cols x 3 rows
    rows = [
        ["Perspective", "ROI", "Annual Net / CHW", "ICER"],
        ["Medi-Cal Budget (conservative)", "0.64 : 1", "−$12,700", "$1,680 / QALY"],
        ["Healthcare System (full value)", "1.78 : 1", "+$165,400", "−$69,775 / QALY  (dominant)"],
    ]
    col_widths = [4.5, 2.0, 2.6, 3.0]
    left0, top0 = 0.6, 1.9
    row_h = 0.7
    # header row
    x = left0
    for j, (val, w) in enumerate(zip(rows[0], col_widths)):
        cell = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x), Inches(top0),
                                      Inches(w), Inches(row_h))
        cell.fill.solid(); cell.fill.fore_color.rgb = PRIMARY; cell.line.fill.background()
        textbox(slide, x + 0.1, top0 + 0.12, w - 0.2, row_h, val,
                size=15, bold=True, color=WHITE,
                align=PP_ALIGN.LEFT if j == 0 else PP_ALIGN.CENTER)
        x += w
    # data rows
    for i, row in enumerate(rows[1:]):
        x = left0; y = top0 + row_h + i * row_h
        bgc = BG_WARM if i % 2 == 0 else WHITE
        for j, (val, w) in enumerate(zip(row, col_widths)):
            cell = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x), Inches(y),
                                          Inches(w), Inches(row_h))
            cell.fill.solid(); cell.fill.fore_color.rgb = bgc
            cell.line.color.rgb = RGBColor(220, 220, 220); cell.line.width = Pt(0.5)
            color = TEXT
            if j == 1 and "0.64" in val: color = RED
            if j == 1 and "1.78" in val: color = GREEN
            if j == 2 and "−" in val: color = RED
            if j == 2 and "+" in val: color = GREEN
            textbox(slide, x + 0.1, y + 0.18, w - 0.2, row_h, val,
                    size=15, bold=(j > 0), color=color,
                    align=PP_ALIGN.LEFT if j == 0 else PP_ALIGN.CENTER)
            x += w
    # interpretation
    textbox(slide, 0.7, 4.45, 12.0, 0.5,
            "Same program. Same workers. Same patients. Two different bottom lines.",
            size=18, bold=True, color=PRIMARY)
    items = [
        ("       Medi-Cal counts only the $100K that flows to the managed care plan — and the CHW costs $113K.",
         {"size": 14, "color": TEXT_SEC, "space_after": 4}),
        ("       Healthcare system counts the full $278K — including the $178K in hospital resource costs avoided.",
         {"size": 14, "color": TEXT_SEC, "space_after": 4}),
        ("       The gap is the reinvestment problem: who captures the savings, and can they redirect them?",
         {"size": 14, "color": TEXT_SEC, "space_after": 4}),
        ("       For Santa Clara County, the hospital system and the managed care plan share a fiscal environment. That is unusual and load-bearing.",
         {"size": 14, "bold": True, "color": ACCENT, "space_after": 4}),
    ]
    bullets(slide, 0.7, 5.0, 12.0, 2.0, items)
    footer(slide, prs, "Slide 9")

def s_what_flips(prs):
    slide = blank(prs); fill_bg(slide, prs)
    header(slide, prs, "What flips the result — and what does not",
           eyebrow="Sensitivity analysis")
    textbox(slide, 0.7, 1.75, 12.0, 0.5,
            "Healthcare system perspective: positive returns in nearly every scenario tested.",
            size=20, bold=True, color=GREEN)
    textbox(slide, 0.7, 2.3, 12.0, 0.5,
            "Medi-Cal perspective: breaks even roughly half the time.",
            size=20, bold=True, color=ACCENT)
    items = [
        ("What moves the Medi-Cal result the most:",
         {"size": 18, "bold": True, "color": PRIMARY, "space_after": 6}),
        ("       • Hospitalization and ED visit reduction rates (the dominant driver).",
         {"size": 15, "color": TEXT_SEC, "space_after": 4}),
        ("       • CalAIM/ECM billing capture rate — currently <10% of cost; could reach $7K–$10K/CHW.",
         {"size": 15, "color": TEXT_SEC, "space_after": 4}),
        ("       • Salary assumption ($55K base; survey median is $62K — 13% above the model).",
         {"size": 15, "color": TEXT_SEC, "space_after": 14}),
        ("What does not move the result much:",
         {"size": 18, "bold": True, "color": PRIMARY, "space_after": 6}),
        ("       • Program size at projected scales (per-CHW economics are stable; hub fixed costs amortize).",
         {"size": 15, "color": TEXT_SEC, "space_after": 4}),
        ("       • Workforce deployment model (direct hire vs. CBO contract vs. cooperative).",
         {"size": 15, "color": TEXT_SEC, "space_after": 4}),
        ("       • Choice of focus population definition (10,500 vs. 21,000 high-risk Latinos).",
         {"size": 15, "color": TEXT_SEC, "space_after": 4}),
    ]
    bullets(slide, 0.7, 2.9, 12.0, 4.2, items)
    footer(slide, prs, "Slide 10")

def s_two_pathways(prs):
    slide = blank(prs); fill_bg(slide, prs)
    header(slide, prs, "Two pathways. We modeled one.", eyebrow="Scope and honesty")
    # 2 columns
    panels = [
        ("CLINICAL PATHWAY",
         "Care coordination · chronic disease management · patient navigation.",
         "Reimbursable under Medi-Cal · measurable via claims · captured in the ROI.",
         GREEN, 0.7),
        ("COMMUNITY RESILIENCE PATHWAY",
         "Group education · leadership development · outreach · organizing.",
         "Not reimbursable · slower timeline · not in the model.",
         ACCENT, 6.95),
    ]
    for title, body1, body2, color, left in panels:
        card = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(left), Inches(1.85),
                                      Inches(5.7), Inches(3.2))
        card.fill.solid(); card.fill.fore_color.rgb = WHITE
        card.line.color.rgb = color; card.line.width = Pt(1.5)
        textbox(slide, left + 0.25, 2.0, 5.2, 0.32, title,
                size=14, bold=True, color=color)
        textbox(slide, left + 0.25, 2.45, 5.2, 1.1, body1, size=17, color=TEXT)
        textbox(slide, left + 0.25, 3.7, 5.2, 1.3, body2, size=15, color=TEXT_SEC)
    textbox(slide, 0.7, 5.25, 12.0, 0.5,
            "The absence of a monetized community resilience analysis is the state of measurement, not a judgment about importance.",
            size=17, bold=True, color=PRIMARY)
    textbox(slide, 0.7, 5.8, 12.0, 1.3,
            "Risk we name in the report: programs that measure only clinical returns will, over time, narrow their focus to clinical activities. "
            "The recommended measurement framework evolves outcomes from service outputs (Y1–2) to utilization changes (Y1–3) to health and community resilience outcomes (Y3–5).",
            size=14, color=TEXT_SEC)
    footer(slide, prs, "Slide 11")

def s_kii_themes(prs):
    slide = blank(prs); fill_bg(slide, prs)
    header(slide, prs, "Six KII themes that shaped the model",
           eyebrow="Key informant interview findings")
    items = [
        ("1. The Promotor/a–CHW distinction matters.",
         {"size": 18, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("       CHW = clinical and billable. Promotor/a = broader: education, organizing, advocacy. Definitions drive scope.",
         {"size": 14, "color": TEXT_SEC, "space_after": 10}),
        ("2. The cooperative model is already operating.",
         {"size": 18, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("       Six CHW/Promotor cooperative LLCs in East San José — relevant to mixed-status workforce policy.",
         {"size": 14, "color": TEXT_SEC, "space_after": 10}),
        ("3. Workforce instability is funding-structured, not preference-structured.",
         {"size": 18, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("       Grant cycles end; workers leave. 10% annual turnover. Five-year horizon is the minimum that fixes this.",
         {"size": 14, "color": TEXT_SEC, "space_after": 10}),
        ("4. Decision-makers want budget impact first, ROI second, health outcomes third.",
         {"size": 18, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("       That ordering shaped which figures we built and which we sent to the appendix.",
         {"size": 14, "color": TEXT_SEC, "space_after": 10}),
        ("5. Training infrastructure collapses with grant cycles.",
         {"size": 18, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("       Per-CHW onboarding budget ($5K) does not substitute for sustained CBO-led training.",
         {"size": 14, "color": TEXT_SEC, "space_after": 10}),
        ("6. Political climate is a binding design constraint.",
         {"size": 18, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("       31% of survey respondents cite fear about the political climate as a top challenge. Intake design follows.",
         {"size": 14, "color": TEXT_SEC, "space_after": 0}),
    ]
    bullets(slide, 0.7, 1.7, 12.0, 5.5, items)
    footer(slide, prs, "Slide 12")

def s_what_dmakers_need(prs):
    slide = blank(prs); fill_bg(slide, prs)
    header(slide, prs, "What decision-makers told us they need",
           eyebrow="Output ranking from KIIs")
    # Horizontal-style ranked list (no pie)
    rows = [
        ("1", "TOTAL BUDGET IMPACT",
         "Year-by-year cash outflow. Not a ratio. Not a hypothetical.", PRIMARY),
        ("2", "RETURN ON INVESTMENT",
         "Per-dollar return, with the perspective made explicit.", PRIMARY_LIGHT),
        ("3", "HEALTH OUTCOMES TIED TO FINANCIAL STABILITY",
         "Outcomes worth measuring are the ones that affect whether the program persists.", ACCENT),
    ]
    for i, (rank, title, body, color) in enumerate(rows):
        top = 1.95 + i * 1.55
        # rank chip — oval is non-text shape; number goes in textbox
        chip = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.7), Inches(top),
                                      Inches(1.0), Inches(1.0))
        chip.fill.solid(); chip.fill.fore_color.rgb = color; chip.line.fill.background()
        textbox(slide, 0.7, top + 0.1, 1.0, 0.85, rank,
                size=40, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
        textbox(slide, 2.0, top + 0.1, 10.5, 0.45, title,
                size=20, bold=True, color=color)
        textbox(slide, 2.0, top + 0.62, 10.5, 0.6, body,
                size=15, color=TEXT_SEC)
    textbox(slide, 0.7, 6.8, 12.0, 0.4,
            "We can build all three. Ordering matters because the first one is the one that gets read.",
            size=14, color=TEXT_MUTED, align=PP_ALIGN.CENTER)
    footer(slide, prs, "Slide 13")

def s_absorption(prs):
    slide = blank(prs); fill_bg(slide, prs)
    header(slide, prs, "What constrains program growth", eyebrow="Absorption from the field")
    items = [
        ("20%", {"size": 60, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("annual workforce growth ceiling, identified independently by CBO directors and program managers.",
         {"size": 18, "color": TEXT, "space_after": 12}),
        ("Beyond that, supervision, training, and quality break down.",
         {"size": 16, "color": TEXT_SEC, "space_after": 18}),
        ("5 years", {"size": 36, "bold": True, "color": ACCENT, "space_after": 4}),
        ("minimum funding horizon, identified as the threshold for stable workforce retention.",
         {"size": 18, "color": TEXT, "space_after": 18}),
        ("Implication for the budget impact model:",
         {"size": 18, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("       Program size is a policy choice, not an economic constraint. The 20% ceiling and 5-year horizon are the binding parameters.",
         {"size": 15, "color": TEXT_SEC, "space_after": 0}),
    ]
    bullets(slide, 0.7, 1.75, 12.0, 5.4, items)
    footer(slide, prs, "Slide 14")

def s_community_changed(prs):
    slide = blank(prs); fill_bg(slide, prs)
    header(slide, prs, "Where community input changed the analysis",
           eyebrow="Not framing — substance")
    items = [
        ("Equity moved from a robustness check to a core specification.",
         {"size": 19, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("       Disparity gap closure (reduction in preventable hospitalizations and ED visits relative to County average) is now a reported outcome, not an appendix.",
         {"size": 14, "color": TEXT_SEC, "space_after": 12}),
        ("Enrollment design entered the cost model.",
         {"size": 19, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("       Public charge avoidance: research estimates 108,000–193,000 Latino immigrants in California still avoided Medicaid after the rule was reversed. Intake bureaucracy is now a modeled cost of failure.",
         {"size": 14, "color": TEXT_SEC, "space_after": 12}),
        ("Cooperative LLC structure entered the workforce specification.",
         {"size": 19, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("       Six operating cooperatives in East San José — only learned through KIIs — required us to model three deployment options, not one.",
         {"size": 14, "color": TEXT_SEC, "space_after": 12}),
        ("The community resilience pathway became an explicit measurement frontier.",
         {"size": 19, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("       Naming what the model does not capture, rather than silently omitting it, is itself an analytic choice that community input forced.",
         {"size": 14, "color": TEXT_SEC, "space_after": 0}),
    ]
    bullets(slide, 0.7, 1.7, 12.0, 5.5, items)
    footer(slide, prs, "Slide 15")

def s_limits(prs):
    slide = blank(prs); fill_bg(slide, prs)
    header(slide, prs, "What this study cannot tell us — yet",
           eyebrow="Limitations, named")
    items = [
        ("No California-specific causal CHW ROI estimate exists in the published literature.",
         {"size": 17, "color": TEXT, "space_after": 12}),
        ("The strongest causal evidence is a 2018 Philadelphia Medicaid RCT ($2.47 per $1, 30% hospitalization reduction). Transferability to an urban Bay Area county is an assumption, not a finding.",
         {"size": 15, "color": TEXT_SEC, "space_after": 12}),
        ("Healthcare savings lag costs by ~1 year. Year-1 budget impact is gross, not net.",
         {"size": 17, "color": TEXT, "space_after": 12}),
        ("Community resilience outcomes are not monetized. Programs optimized on monetized outcomes will drift.",
         {"size": 17, "color": TEXT, "space_after": 12}),
        ("CBO administrative capacity, not population need, is the binding constraint on program size.",
         {"size": 17, "color": TEXT, "space_after": 0}),
    ]
    bullets(slide, 0.7, 1.8, 12.0, 5.2, items)
    footer(slide, prs, "Slide 16")

def s_takeaways(prs):
    slide = blank(prs); fill_bg(slide, prs)
    header(slide, prs, "Three things to take with us",
           eyebrow="If the study is right")
    items = [
        ("1. Perspective is the headline.",
         {"size": 22, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("       Reporting ROI without naming whose ROI is a policy intervention, not a methodological choice.",
         {"size": 16, "color": TEXT_SEC, "space_after": 18}),
        ("2. Triangulation does work qualitative-only or quantitative-only designs cannot.",
         {"size": 22, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("       Absorption ceilings, decision-maker preferences, and the cooperative LLC structure are KII-only findings. Cost numbers and CEA are model-only.",
         {"size": 16, "color": TEXT_SEC, "space_after": 18}),
        ("3. Measurement choices today determine program shape in five years.",
         {"size": 22, "bold": True, "color": PRIMARY, "space_after": 4}),
        ("       What we count is what we will fund. What we will fund is what the program will become.",
         {"size": 16, "color": TEXT_SEC, "space_after": 0}),
    ]
    bullets(slide, 0.7, 1.85, 12.0, 5.3, items)
    footer(slide, prs, "Slide 17")

def s_questions(prs):
    slide = blank(prs); fill_bg(slide, prs)
    header(slide, prs, "Open questions for the room",
           eyebrow="Where we want your push-back")
    items = [
        ("How should we report ROI when the perspective with the favorable answer (healthcare system) is not the perspective that signs the check (Medi-Cal budget)?",
         {"size": 18, "color": TEXT, "space_after": 16}),
        ("What is a defensible way to bring the community resilience pathway into a cost-effectiveness framework — or is the right answer to keep it explicitly outside?",
         {"size": 18, "color": TEXT, "space_after": 16}),
        ("Hub fixed costs amortize over CHWs. How should we present that to a board that funds in annual cycles?",
         {"size": 18, "color": TEXT, "space_after": 16}),
        ("KIIs gave us parameter values (turnover, absorption, decision preferences) that the literature does not. What is the right standard of evidence to attach to those?",
         {"size": 18, "color": TEXT, "space_after": 0}),
    ]
    bullets(slide, 0.7, 1.85, 12.0, 5.3, items)
    footer(slide, prs, "Slide 18")

def s_updates(prs):
    slide = blank(prs); fill_bg(slide, prs)
    header(slide, prs, "Updates & next meeting", eyebrow="Wrap-up")
    items = [
        ("June 11 webinar:  ROI in Public Health  — registration open at caphegroup.org/webinars",
         {"size": 19, "bold": True, "color": PRIMARY, "space_after": 14}),
        ("June 24 speaker:  Adrienne Sabety (Stanford) with Maya Rossin-Slater (Stanford)  — preschool entry age and developmental/behavioral diagnoses in Medi-Cal.",
         {"size": 17, "color": TEXT, "space_after": 14}),
        ("Office Hours pilot:  if you want to be a methods-guidance volunteer, reply to today's recap email.",
         {"size": 17, "color": TEXT, "space_after": 14}),
        ("Membership reminder:  caphegroup.org/membership",
         {"size": 17, "color": TEXT, "space_after": 14}),
        ("Reminder:  papers and projects in your pipeline can be adapted into tools or methods labs.",
         {"size": 17, "color": TEXT_SEC, "space_after": 0}),
    ]
    bullets(slide, 0.7, 1.85, 12.0, 5.3, items)
    footer(slide, prs, "Slide 19")

def s_closing(prs):
    slide = blank(prs)
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
    bg.fill.solid(); bg.fill.fore_color.rgb = PRIMARY; bg.line.fill.background()
    textbox(slide, 0.5, 2.4, 12.33, 1.0, "Thank You",
            size=64, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    textbox(slide, 0.5, 3.5, 12.33, 0.6,
            "Questions, push-back, collaborations welcome.",
            size=22, color=RGBColor(220, 230, 250), align=PP_ALIGN.CENTER)
    textbox(slide, 0.5, 4.7, 12.33, 0.6, "caphegroup.org",
            size=32, bold=True, color=ACCENT, align=PP_ALIGN.CENTER)
    textbox(slide, 0.5, 5.3, 12.33, 0.5, "info@caphegroup.org",
            size=18, color=RGBColor(200, 215, 240), align=PP_ALIGN.CENTER)

# ---- main -----------------------------------------------------------------

def build():
    prs = new_deck()
    s_title(prs)
    s_agenda(prs)
    s_research_questions(prs)
    s_design(prs)
    s_kii_for_economists(prs)
    s_who_we_talked_to(prs)
    s_unit_economics(prs)
    s_hub_scale(prs)
    s_roi_table(prs)
    s_what_flips(prs)
    s_two_pathways(prs)
    s_kii_themes(prs)
    s_what_dmakers_need(prs)
    s_absorption(prs)
    s_community_changed(prs)
    s_limits(prs)
    s_takeaways(prs)
    s_questions(prs)
    s_updates(prs)
    s_closing(prs)
    out = Path.home() / "Downloads" / "CAPHE_Meeting_2026-05-27_CHW_Feasibility.pptx"
    prs.save(str(out))
    print(f"Saved: {out}")
    print(f"Slides: {len(prs.slides)}")
    return out

if __name__ == "__main__":
    build()
