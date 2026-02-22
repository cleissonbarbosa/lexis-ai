
<!--
  Lexis AI - Real-time Manual Sign Alphabet Recognition in the Browser
  Repository: https://github.com/cleissonbarbosa/lexis-ai
-->

<span align="center" style="display: block; margin-top: 20px;">
  <img src="assets/img/logo-full.png" alt="Lexis AI Logo" width="250" />
  
  [![GitHub license](https://img.shields.io/github/license/cleissonbarbosa/lexis-ai)](https://github.com/cleissonbarbosa/lexis-ai/blob/main/LICENSE) [![GitHub issues](https://img.shields.io/github/issues/cleissonbarbosa/lexis-ai)](https://github.com/cleissonbarbosa/lexis-ai/issues) [![GitHub stars](https://img.shields.io/github/stars/cleissonbarbosa/lexis-ai)](https://github.com/cleissonbarbosa/lexis-ai/stargazers)

<div>Lexis AI recognizes the manual sign alphabet in real time, running entirely in the browser with MediaPipe Hands.</div>
</span>

--- 

## Highlights

- Browser-only runtime (no backend required)
- Real-time webcam hand tracking with MediaPipe Hands
- Geometric heuristic classifier for manual alphabet letters
- Auto-add while holding a stable sign
- Built-in phrase editor (add, space, backspace, clear, copy)
- Keyboard shortcuts for faster interaction
- Responsive UI for desktop and mobile
- Sign language selector with localized interface text

## Supported Sign Language Modes

Users can switch between these sign language modes directly in the UI:

- 🇧🇷 Libras (Língua Brasileira de Sinais)
>- 🇺🇸 ASL (American Sign Language) - **Coming Soon**
>- 🇬🇧 BSL (British Sign Language) - **Coming Soon**
>- 🇮🇳 IPSL (Indo-Pakistani Sign Language) - **Coming Soon**
>- 🇨🇳 CSL (Chinese Sign Language - Zhōngguó Shǒuyǔ - 中国手语) - **Coming Soon**
>- 🇯🇵 JSL (Japanese Sign Language - Nihon Shūwa - 日本手話) - **Coming Soon**
>- 🇵🇹 LGP (Língua Gestual Portuguesa) - **Coming Soon**

Interface text localization is automatically applied per selected mode (Portuguese, English, Urdu, Chinese, Japanese).

Note: the current detection classifier is one-hand A-Z baseline oriented. Some modes are marked experimental until language-specific classifiers are added.

## Run Locally

Serve the folder with any static HTTP server.

Example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy to GitHub Pages

This repository includes `.github/workflows/deploy-pages.yml` for GitHub Pages deployment.

1. Go to `Settings > Pages` in your GitHub repository.
2. Set **Build and deployment** to **GitHub Actions**.
3. Push to `main` (or trigger the workflow manually).

## Privacy

- All processing happens in-browser.
- No camera video is uploaded to servers.
