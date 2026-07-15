$inputFile = "c:\Users\abis\Desktop\Electro Legendre — Premium Appliances in Montreal.html"
$outputFile = "c:\Users\abis\Desktop\Electro Legendre — Premium Appliances in Montreal_files\rebuilt_site\index.html"

$content = Get-Content -Path $inputFile -Raw

# Extract main tag content
if ($content -match '(<main[\s\S]*?</main>)') {
    $mainContent = $matches[1]
} else {
    $mainContent = "<main>Content not found</main>"
}

$finalHtml = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electro Legendre — Premium Appliances in Montreal</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Custom styling to replicate fonts, etc -->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
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
            padding: 0 1rem;
        }
        .display {
            font-family: 'Inter', sans-serif;
        }
    </style>
</head>
<body class="font-sans antialiased bg-white text-neutral-900">
    $mainContent
</body>
</html>
"@

Set-Content -Path $outputFile -Value $finalHtml -Encoding UTF8
Write-Output "Successfully built index.html"
