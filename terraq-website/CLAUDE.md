# TerraQ website — brief for Claude Code

This folder is the new terraq.co.za website. It replaces the site previously built and hosted by Smart Macmane. Read this whole file before changing anything.

## What's here

```
index.html          Main site: home, Products (tabs), Services, About, Contact,
                    plus four product pages shown by hash route
esg/index.html      TerraQ ESG interactive demo (fictional data), linked from the site
img/                Photos taken from the TerraQ company profile, plus dc-layout.png
terraq-logo.png     Official full logo lockup (transparent, for dark navy backgrounds)
terraq-mark.png     Sphere mark only (favicon, tight spaces)
```

Both pages are plain HTML, CSS and vanilla JavaScript with no build step. Fonts load from Google Fonts (Montserrat, Archivo, IBM Plex Mono).

### Routing in index.html
- `#products`, `#services`, `#about`, `#contact` scroll to sections.
- `#slopetraq`, `#aquawatch`, `#metals`, `#esg`, `#datacentre` select a product tab.
- `#product-aquawatch`, `#product-datacentre`, `#product-metals`, `#product-esg` open full product pages (`<article class="ppage">`).

## Brand rules (do not break)
- Always use the official logo files above, on dark navy `#101C2C`. Don't recreate the logo in text or CSS.
- Brand red `#E3172F`. Headings Montserrat 800–900, body Archivo, labels IBM Plex Mono.
- Plain professional English. No invented statistics, client names or testimonials.
- Never reference KLM, KLM clients or KLM projects (including the Catoca Mine or any Angola TSF project). Where a project reference is unavoidable, use "Tailings Storage Facility, Southern Africa".
- Sample numbers on product screens must stay labelled "Illustrative example".

## To do, in order

1. **Turn product pages into real URLs.** Move each `#product-*` article to its own page (`/aquawatch/`, `/data-centre/`, `/scrap-metal/`, `/esg/` for the product page, with the demo at `/esg/demo/`). Share the header, footer and contact band. Keep the Products tabs on the home page, with "Read more" linking to the new URLs.
2. **SEO basics.** A unique `<title>` and meta description per page, Open Graph image (use `img/drone-survey.jpg`), `sitemap.xml`, `robots.txt`.
3. **Contact form (optional).** The site currently shows email, phone and address only. If a form is added, use a simple form service or serverless function, and add a POPIA consent line linking to a privacy notice.
4. **Images.** Convert photos to WebP with JPEG fallback; add `loading="lazy"` below the fold.
5. **Accessibility check.** Keyboard through the tabs, drawer and menu; check contrast on the red contact band.

## Content to confirm with Mothae before launch
- SlopeTraq links to `https://slopecheck-production.up.railway.app/`, which credits Mokay Group. Confirm he is happy to show the TerraQ–SlopeTraq connection publicly, and update the link once SlopeTraq has its own domain.
- AquaWatch: "reviewed by a hydrogeologist" and "monthly plans priced by the number of monitoring points".
- TerraQ ESG: "We're looking for two or three mines to shape it with us."
- Scrap Metal Intelligence tiers and prices match the terraq-metals app landing page (`terraq-metals/static/index.html`). Keep the two in sync.
- Contact details: info@terraq.co.za (alias of mnamane@terraq.co.za), +27 81 532 9057, 106 Hercules Street, Roseville, Pretoria.

## Deployment
Host as a static site (Vercel, Netlify or Cloudflare Pages) from a GitHub repository, with HTTPS. When pointing terraq.co.za at the new host, change **only** the website records (`@` and `www`). Do not touch MX, SPF/DKIM/DMARC TXT, or autodiscover records: they carry TerraQ's email (mnamane@terraq.co.za and its info@ alias).
