# Codebase Cleanup Recommendations

This document identifies files that may need attention, including duplicates, misplaced files, and candidates for reorganization.

## Duplicate Files

### Image Duplicates
Multiple copies of the same images exist across different locations. The following images are duplicated:

#### Methods Lab DAG Images
These images exist in BOTH:
- `/public/methods-lab/assets/` (shared assets)
- `/public/methods-lab/[lab-name]/assets/` (individual lab assets)

| Image | Locations |
|-------|-----------|
| `chw-dag-confounding.png` | 3 copies: `public/methods-lab/assets/`, `public/methods-lab/chw-health-outcomes/assets/`, `public/assets/images/methods-lab/` |
| Most DAG images | 2 copies: shared assets + individual lab assets |

**Recommendation**: Consolidate to single location. Either:
1. Keep in shared `/public/methods-lab/assets/` and update lab HTML to reference shared path
2. Keep in individual lab `/assets/` folders and remove from shared location

#### Vignette/Marketing Images
| Image | Locations |
|-------|-----------|
| `dag-food-diabetes.png` | 2 copies: `/assets/images/vignettes/` and `/public/assets/images/methods-lab/` |
| `dag-food-diabetes-prompt.md` | 2 copies: same directories as above |

**Recommendation**: Keep the `/public/` version (actively served) and archive or remove the `/assets/` version.

### Prompt File Duplicates
| File | Locations |
|------|-----------|
| `antigravity-prompt.md` | ~35 copies (one per lab) + 1 in `/public/methods-lab/assets/` |
| `unmeasured-confounder-dag.md` | 2 copies |

**Recommendation**: The per-lab prompts are intentionally different (lab-specific). The shared one in `/public/methods-lab/assets/` may be a master template - verify before removing.

## Misplaced Files

### Utility Script in Root
| File | Current Location | Recommended Location |
|------|------------------|---------------------|
| `fix-nav-css-order.py` | Root directory | `/scripts/` or delete if one-time use |

This is a one-time fix script that appears to have been used to correct CSS loading order. If the fix is complete, consider:
- Moving to `/scripts/utilities/` for reference
- Deleting if no longer needed

### Research Document in Public Directory
| File | Current Location | Issue |
|------|------------------|-------|
| `health-economics-education-landscape-analysis.md` | `/public/methods-lab/` | Research document in production directory |

**Recommendation**: Move to `/docs/research/` as it's a background document, not served content.

## Potential Cleanup Actions

### High Priority (Clear Duplicates)

1. **Consolidate DAG images**
   - Choose canonical location: `/public/methods-lab/assets/`
   - Update all lab HTML files to use shared path
   - Remove duplicates from individual lab folders
   - Estimated savings: ~15-20MB

2. **Remove redundant prompt files from `/public/assets/images/methods-lab/`**
   - `dag-food-diabetes-prompt.md`
   - `chw-dag-prompt.md`
   - These appear to be duplicates of prompts in lab assets folders

### Medium Priority (Organization)

3. **Create `/scripts/` directory**
   - Move `fix-nav-css-order.py` here
   - Add other utility scripts as created

4. **Move research document**
   - `/public/methods-lab/health-economics-education-landscape-analysis.md`
   - To: `/docs/research/` or `/docs/analysis/`

5. **Clean up `/assets/images/vignettes/`**
   - Contains duplicate of image now in `/public/`
   - If `/assets/` is source-only, keep as archive
   - If `/assets/` should mirror `/public/`, sync them

### Low Priority (Optional)

6. **Standardize icon prompt files**
   - `/assets/images/icons/` has both `icon-prompts.md` and `ICON_PROMPTS.md`
   - Consolidate into single file

7. **Consider removing `.DS_Store` references**
   - Add `.DS_Store` to `.gitignore` (already present)
   - Remove any committed `.DS_Store` files

## File Size Audit

Large files that may warrant review:

| File | Size | Notes |
|------|------|-------|
| `/public/methods-lab/index.html` | 41KB | Large due to lab listings - expected |
| `/src/backend/server.js` | 50KB | Main server code - review for refactoring opportunities |
| `/src/frontend/css/style.css` | 50KB | Single CSS file - consider splitting if needed |
| `hero-california-health-economics.png` | 516KB | Hero image - ensure optimized |
| Individual DAG PNGs | 280-500KB each | Could be optimized |

## Recommendations Summary

### Do Now
1. Consolidate duplicate DAG images
2. Move `fix-nav-css-order.py` or delete
3. Move research markdown from public folder

### Do Later
4. Optimize large PNG images
5. Standardize prompt file naming
6. Consider splitting large CSS/JS files

### Do Not Touch
- `memory-bank/` files (AI assistant context)
- `node_modules/` (dependency folder)
- Lab structures (consistent and working)

---

*Generated: January 2026*
*Status: Recommendations only - no changes applied*
