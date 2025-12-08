# Status nastavenia - timly.tech

## ✅ Hotovo

1. **DNS nastavené** ✓
   - `timly.tech` → `75.119.152.72`
   - `www.timly.tech` → `75.119.152.72`

2. **Nginx konfigurácia** ✓
   - Konfigurácia vytvorená: `/etc/nginx/sites-available/timly.tech`
   - Aktivovaná a reštartovaná

3. **SSL certifikát** ✓
   - Získaný cez Let's Encrypt
   - Platný do: 2026-03-08
   - Automatická obnova nastavená

4. **SSH kľúč pre GitHub Actions** ✓
   - Vygenerovaný: `~/.ssh/github_actions_deploy`
   - Verejný kľúč pridaný do `authorized_keys`

5. **GitHub Actions workflow** ✓
   - Vytvorený: `.github/workflows/deploy.yml`
   - Automatický build a deploy pri push do `main`/`master`

6. **Test build** ✓
   - Aplikácia úspešne zbuildovaná
   - Skopírovaná do `/var/www/timly.tech`
   - Dostupné na: https://timly.tech

## ⏳ Ešte treba urobiť

### 1. Pridať GitHub Secrets (5 minút)

**Kde:** https://github.com/Zion-Lab-App/fishy/settings/secrets/actions

**Hodnoty nájdeš v:** `/var/www/fishy/GITHUB_SECRETS_VALUES.txt`

**Potrebuješ pridať:**
- `DEPLOY_HOST` = `75.119.152.72`
- `DEPLOY_USER` = `root`
- `DEPLOY_SSH_KEY` = (celý privátny kľúč z GITHUB_SECRETS_VALUES.txt)
- `DEPLOY_PORT` = `22`
- `DEPLOY_PATH` = `/var/www/timly.tech`

### 2. Commit a push workflow (2 minúty)

```bash
cd /var/www/fishy
git add .github/ *.md src/components/CatchDetail.tsx
git commit -m "Add GitHub Actions workflow and fix TypeScript error"
git push origin master
```

### 3. Test automatického deployu

Po pushnutí:
1. Prejdi na GitHub → **Actions** tab
2. Sleduj priebeh workflow
3. Po úspešnom deployi by aplikácia mala byť aktualizovaná na https://timly.tech

---

## 📝 Poznámky

- **Node.js verzia:** Na serveri je Node.js 18, ale GitHub Actions používa Node.js 20, takže build tam bude fungovať správne
- **SSL certifikát:** Automaticky sa obnoví pred expiráciou
- **Automatický deploy:** Každý push do `main` alebo `master` branch automaticky spustí build a deploy

---

## 🔗 Užitočné odkazy

- **Aplikácia:** https://timly.tech
- **GitHub repo:** https://github.com/Zion-Lab-App/fishy
- **GitHub Actions:** https://github.com/Zion-Lab-App/fishy/actions
- **GitHub Secrets:** https://github.com/Zion-Lab-App/fishy/settings/secrets/actions


