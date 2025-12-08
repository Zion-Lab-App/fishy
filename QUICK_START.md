# Rýchly štart - Deploy timly.tech

## Krok 1: DNS nastavenie na Forpsi (15 minút)

1. Prihlás sa do Forpsi
2. Prejdi do DNS zóny pre `timly.tech`
3. Pridaj tieto záznamy:
   - **A záznam:** `@` → `75.119.152.72`
   - **A záznam:** `www` → `75.119.152.72`
4. Ulož a počkaj 15-60 minút

**Detailný návod:** Pozri `FORPSI_DNS_NASTAVENIE.md`

---

## Krok 2: Aktivácia nginx (5 minút)

```bash
# Aktivuj nginx konfiguráciu
sudo ln -sf /etc/nginx/sites-available/timly.tech /etc/nginx/sites-enabled/

# Test konfigurácie
sudo nginx -t

# Reštart nginx
sudo systemctl restart nginx
```

---

## Krok 3: SSL certifikát (5 minút)

**Počkaj, kým DNS začne fungovať** (over pomocou `nslookup timly.tech`)

```bash
sudo certbot --nginx -d timly.tech -d www.timly.tech
```

---

## Krok 4: GitHub Secrets (10 minút)

### 4.1 Generovanie SSH kľúča na serveri
```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy -N ""
cat ~/.ssh/github_actions_deploy.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/github_actions_deploy
```
**Skopíruj celý privátny kľúč** (začínajúci `-----BEGIN OPENSSH PRIVATE KEY-----`)

### 4.2 Pridanie Secrets na GitHub
1. Prejdi na: https://github.com/Zion-Lab-App/fishy/settings/secrets/actions
2. Pridaj tieto secrets:

| Názov | Hodnota |
|-------|---------|
| `DEPLOY_HOST` | `75.119.152.72` |
| `DEPLOY_USER` | `root` |
| `DEPLOY_SSH_KEY` | (celý privátny SSH kľúč) |
| `DEPLOY_PORT` | `22` |
| `DEPLOY_PATH` | `/var/www/timly.tech` |

**Detailný návod:** Pozri `DEPLOY_SETUP.md` sekcia 3

---

## Krok 5: Test deployu

```bash
cd /var/www/fishy
git add .
git commit -m "Setup GitHub Actions"
git push origin main
```

Potom prejdi na GitHub → **Actions** tab a sleduj deploy.

---

## ✅ Hotovo!

Po úspešnom deployi bude tvoja aplikácia dostupná na:
- https://timly.tech
- https://www.timly.tech

Každý push do `main` alebo `master` branch automaticky spustí build a deploy.

---

## Potrebuješ pomoc?

- **DNS problémy:** Pozri `FORPSI_DNS_NASTAVENIE.md`
- **Kompletný návod:** Pozri `DEPLOY_SETUP.md`
- **Riešenie problémov:** Pozri `DEPLOY_SETUP.md` sekcia 5


