# Deploy to GitHub Pages and use in Android/iOS

This project contains a web app in the `www/` folder (also `studiog/`). The workflow `.github/workflows/gh-pages.yml` will publish the `www/` folder to GitHub Pages whenever you push to `main`.

Steps to enable and use GitHub Pages:

- Push the repo to GitHub (if not already):

```bash
git add .
git commit -m "Add GitHub Pages workflow"
git push origin main
```

- After the push the Actions workflow runs and publishes `www/` to the `gh-pages` branch. Your Pages site will be available at:

```
https://<your-github-username>.github.io/<repository-name>/
```

Using the hosted site in Android and iOS (Capacitor):

1. Open `capacitor.config.json` and set `server.url` to your GitHub Pages URL (include trailing slash), for example:

```json
{
  "server": {
    "url": "https://your-username.github.io/your-repo/"
  }
}
```

2. Rebuild native projects:

```bash
npx cap sync
npx cap open android
npx cap open ios
```

Notes:
- If you prefer to publish a different folder (e.g., `studiog/`), update the `publish_dir` in the workflow.
- You can also deploy manually with the `gh-pages` npm package or GitHub Pages settings (use `docs/` folder or `gh-pages` branch).

Deploy trigger: bump to prompt GitHub Actions deploy
