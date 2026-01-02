#!/usr/bin/env python3
"""Fix CSS loading order - move site CSS before inline styles"""

import os
import re

# The CSS links that should be at the top
CSS_LINKS = '''  <link rel="stylesheet" href="/src/frontend/css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Source+Sans+Pro:wght@400;600&display=swap" rel="stylesheet">
'''

def fix_css_order(filepath):
    """Move CSS links to before inline styles"""
    with open(filepath, 'r') as f:
        content = f.read()

    # Check if already has the nav
    if 'nav-top-bar' not in content:
        print(f"Skipping (no nav): {filepath}")
        return False

    # Remove the CSS links from where they are now (before </head>)
    content = content.replace('  <link rel="stylesheet" href="/src/frontend/css/style.css">\n', '')
    content = content.replace('  <link rel="preconnect" href="https://fonts.googleapis.com">\n', '')
    content = content.replace('  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n', '')
    content = content.replace('  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Source+Sans+Pro:wght@400;600&display=swap" rel="stylesheet">\n', '')

    # Add CSS links right after viewport meta tag (before <style>)
    viewport_pattern = r'(<meta name="viewport"[^>]*>)\n'
    replacement = r'\1\n' + CSS_LINKS
    content = re.sub(viewport_pattern, replacement, content)

    with open(filepath, 'w') as f:
        f.write(content)

    print(f"Fixed: {filepath}")
    return True

def main():
    lab_dir = '/Users/victoriaperez/Projects/CAPHE/website/public/methods-lab'

    fixed = 0
    for subdir in os.listdir(lab_dir):
        subdir_path = os.path.join(lab_dir, subdir)
        if os.path.isdir(subdir_path) and subdir != 'assets':
            index_path = os.path.join(subdir_path, 'index.html')
            if os.path.exists(index_path):
                if fix_css_order(index_path):
                    fixed += 1

    print(f"\nDone! Fixed {fixed} files.")

if __name__ == '__main__':
    main()
