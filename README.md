# Lexis AI

Lexis AI is a real-time manual sign alphabet recognition running **100% in the browser** with MediaPipe Hands.

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
- 🇺🇸 ASL (American Sign Language)
- 🇬🇧 BSL (British Sign Language)
- 🇮🇳 IPSL (Indo-Pakistani Sign Language)
- 🇨🇳 CSL (Chinese Sign Language - Zhōngguó Shǒuyǔ - 中国手语)
- 🇯🇵 JSL (Japanese Sign Language - Nihon Shūwa - 日本手話)
- 🇵🇹 LGP (Língua Gestual Portuguesa)

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
