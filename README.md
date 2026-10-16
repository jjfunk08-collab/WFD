# What's for Dinner

Family meal planner and grocery list:

- **Weekly plan:** mains, sides, leftovers nights, eating out, and takeout nights.
- **Recipes:** simple foods (hot dogs, frozen pizza) or full recipes. Import a recipe from pasted text or a photo, and get suggestions based on what the family likes.
- **Ratings:** each family member rates taste, ease, cleanup, and leftovers.
- **Takeout:** favorite restaurants with menu links and everyone's go-to orders.
- **Grocery list:** grouped by aisle, with "have it" / "in cart" checks, house staples, and sale prices from the weekly flyer.

Plain HTML/CSS/JS front end, no build step. Vercel serverless functions in `/api`. Upstash Redis for shared storage. Installs to Android and iPhone home screens as an app.

```
index.html            app shell
styles.css            all styling (light + dark)
app.js                the app
sw.js                 offline cache for the app shell
manifest.webmanifest  install-as-app metadata
icons/                app icons
api/_lib.js           Redis, auth, merge helpers
api/login.js          family passcode -> session cookie
api/sync.js           returns docs changed since a version (polled every 4s)
api/db.js             set / update (deep merge, conflict-safe) / delete
api/ai.js             Claude calls for import, suggestions, sides, nutrition, deals
```

## Deploy

1. **Push to GitHub**
   ```bash
   cd whats-for-dinner
   git init && git add . && git commit -m "What's for Dinner"
   git branch -M main
   git remote add origin https://github.com/<you>/whats-for-dinner.git
   git push -u origin main
   ```
2. **Import into Vercel.** Go to vercel.com, choose Add New, then Project, and pick the repo. Framework preset: **Other**. No build command or output directory is needed. Deploy.
3. **Add the database.** In the project, open **Storage**, then **Upstash for Redis**, then Create and Connect (the free tier is plenty). This adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically.
4. **Add environment variables** under Settings, then Environment Variables:
   - `FAMILY_PASSCODE`: the passcode everyone types once per device.
   - `ANTHROPIC_API_KEY`: optional. It turns on the Claude features. Get a key at console.anthropic.com. Usage is billed to that key, typically a few cents per suggestion.
5. **Redeploy** (Deployments, then ⋯, then Redeploy) so the variables take effect.

Every push to `main` redeploys automatically after that.

## Install on a phone

- **Android (Chrome):** open the site, tap ⋮, then **Install app**.
- **iPhone (Safari):** open the site, tap Share, then **Add to Home Screen**.

Enter the family passcode once per device. To sign everyone out, change `SESSION_SECRET` or `FAMILY_PASSCODE` and redeploy.

## Notes

- Changes sync between phones within a few seconds.
- The last-loaded plan and list are cached on the device, so the list still opens with no signal. Edits made while offline don't save.
- Restaurant menus are links you add. When you leave a menu link blank, the app links a Google search for that restaurant's menu.
- Store sales come from flyer text you paste. The app doesn't pull prices from stores automatically.
- Local dev: `npm i -g vercel && vercel link && vercel env pull .env.local && vercel dev`
