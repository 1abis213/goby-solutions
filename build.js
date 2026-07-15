const fs = require('fs');
const path = require('path');

const inputFile = "c:\\Users\\abis\\Desktop\\Electro Legendre — Premium Appliances in Montreal.html";
const outputFile = "c:\\Users\\abis\\Desktop\\Electro Legendre — Premium Appliances in Montreal_files\\rebuilt_site\\index.html";

try {
    const content = fs.readFileSync(inputFile, 'utf-8');
    
    // Extract main tag content
    const match = content.match(/(<main[\s\S]*?<\/main>)/);
    let mainContent = match ? match[1] : "<main>Content not found</main>";
    
    // Remove next.js injected scripts/styles if present in the main block
    mainContent = mainContent.replace(/<script[\s\S]*?<\/script>/g, '');
    mainContent = mainContent.replace(/<nextjs-portal[\s\S]*?<\/nextjs-portal>/g, '');
    mainContent = mainContent.replace(/<next-route-announcer[\s\S]*?<\/next-route-announcer>/g, '');

    const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electro Legendre — Premium Appliances in Montreal</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body {
            font-family: 'Inter', sans-serif;
            background-color: #ffffff;
            color: #171717;
        }
        .hairline {
            border-color: #e5e5e5;
        }
        .container-x {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.5rem;
        }
        .display {
            font-family: 'Inter', sans-serif;
        }
        /* Smooth scrolling */
        html { scroll-behavior: smooth; }
    </style>
</head>
<body class="font-sans antialiased bg-white text-neutral-900">
    ${mainContent}
</body>
</html>`;

    fs.writeFileSync(outputFile, finalHtml, 'utf-8');
    console.log("Successfully built index.html");
} catch (err) {
    console.error("Error:", err);
}
