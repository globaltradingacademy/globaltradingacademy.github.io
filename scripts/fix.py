#!/usr/bin/env python3
from pathlib import Path

ROOT = Path('/Users/gugulothajaykumar/trading-academy/src')

TAILWIND = [
    ('items-center' + chr(95) + 'gap', 'items-center' + ' ' + 'gap'),
    ('items-start' + chr(95) + 'gap', 'items-start' + ' ' + 'gap'),
    ('flex-col' + chr(95) + 'gap', 'flex-col' + ' ' + 'gap'),
    ('justify-between' + chr(95) + 'gap', 'justify-between' + ' ' + 'gap'),
    ('justify-center' + chr(95) + 'gap', 'justify-center' + ' ' + 'gap'),
    ('grid-cols-1' + chr(95) + 'gap', 'grid-cols-1' + ' ' + 'gap'),
    ('grid-cols-3' + chr(95) + 'gap', 'grid-cols-3' + ' ' + 'gap'),
    ('flex-wrap' + chr(95) + 'gap', 'flex-wrap' + ' ' + 'gap'),
    ('flex' + chr(95) + 'gap', 'flex' + ' ' + 'gap'),
]

TEXT_FIXES = {
    ROOT / 'sections/Testimonials.tsx': [
        ("'Read more}", "'Read more'}"),
    ],
    ROOT / 'pages/ContactPage.tsx': [
        ('/^\\d{7,15}$ /', '/^\\d{7,15}$/'),
        ('const [ errors, setErrors]', 'const [ errors, setErrors]'),
        ('{ errors.', '{ errors.'),
    ],
    ROOT / 'pages/AdminLeadsPage.tsx': [
        ("'Mark Contacted}", "'Mark Contacted'}"),
    ],
}

for path, reps in TEXT_FIXES.items():
    if not path.exists():
        continue
    text = path.read_text()
    for old, new in reps:
        text = text.replace(old, new)
    path.write_text(text)

for path in ROOT.rglob('*.tsx'):
    text = path.read_text()
    original = text
    for old, new in TAILWIND:
        text = text.replace(old, new)
    if text != original:
        path.write_text(text)
        print('tailwind:', path)

print('done')
