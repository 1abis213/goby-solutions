import re
from bs4 import BeautifulSoup
import sys

input_file = r"c:\Users\abis\Desktop\Electro Legendre — Premium Appliances in Montreal.html"
output_file = r"c:\Users\abis\Desktop\Electro Legendre — Premium Appliances in Montreal_files\rebuilt_site\index.html"

try:
    with open(input_file, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    # Remove all script tags
    for script in soup.find_all('script'):
        script.decompose()

    # Remove nextjs dev elements
    for el in soup.find_all(['nextjs-portal', 'next-route-announcer', 'style']):
        # Be careful not to remove the fonts style if we want to keep it, but tailwind covers most.
        # Let's remove all <style> tags that have data-nextjs-dev-tool-style or are Nextjs specific
        if el.name == 'style' and el.get('data-nextjs-dev-tool-style'):
            el.decompose()
        elif el.name in ['nextjs-portal', 'next-route-announcer']:
            el.decompose()

    # The body tag
    body = soup.find('body')
    if body:
        # Keep the body content
        body_content = "".join(str(child) for child in body.contents)
    else:
        body_content = "Body not found"

    # We want to build the final HTML
    final_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electro Legendre — Premium Appliances in Montreal</title>
    <!-- Tailwind CSS for styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap');
        body {{
            font-family: 'Geist', sans-serif;
        }}
    </style>
</head>
<body class="font-sans antialiased bg-white text-neutral-900">
    {body_content}
</body>
</html>"""

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(final_html)

    print("Successfully built index.html")
except Exception as e:
    print("Error:", e)
