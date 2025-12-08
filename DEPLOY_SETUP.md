# Návod na nastavenie deployu pre timly.tech

## 1. Nastavenie DNS na Forpsi

### Krok 1: Prihlásenie do Forpsi
1. Prihlás sa do svojho Forpsi účtu
2. Prejdi do sekcie **DNS zóny** alebo **Správa domén**
3. Vyber doménu **timly.tech**

### Krok 2: Pridanie DNS záznamov
Pridaj tieto DNS záznamy:

**A záznam (IPv4):**
- **Názov:** `@` (alebo prázdne, alebo `timly.tech`)
- **Typ:** `A`
- **Hodnota:** `75.119.152.72`
- **TTL:** `3600` (alebo predvolené)

**A záznam pre www:**
- **Názov:** `www`
- **Typ:** `A`
- **Hodnota:** `75.119.152.72`
- **TTL:** `3600`

**AAAA záznam (IPv6 - voliteľné):**
- **Názov:** `@`
- **Typ:** `AAAA`
- **Hodnota:** `2a02:c207:2260:1048::1`
- **TTL:** `3600`

**AAAA záznam pre www:**
- **Názov:** `www`
- **Typ:** `AAAA`
- **Hodnota:** `2a02:c207:2260:1048::1`
- **TTL:** `3600`

### Krok 3: Uloženie zmien
- Ulož všetky zmeny
- DNS zmeny sa zvyčajne prejavia do 15-60 minút (môže trvať aj do 24 hodín)

### Overenie DNS
Po nastavení môžeš overiť DNS záznamy príkazom:
```bash
dig timly.tech +short
nslookup timly.tech
```

---

## 2. Nastavenie na serveri

### Krok 1: Vytvorenie adresára pre deploy
```bash
sudo mkdir -p /var/www/timly.tech
sudo chown -R www-data:www-data /var/www/timly.tech
```

### Krok 2: Nginx konfigurácia
Nginx konfigurácia je už vytvorená v `/etc/nginx/sites-available/timly.tech`

### Krok 3: Aktivácia a SSL certifikát
```bash
# Aktivácia nginx konfigurácie
sudo ln -sf /etc/nginx/sites-available/timly.tech /etc/nginx/sites-enabled/

# Test nginx konfigurácie
sudo nginx -t

# Reštart nginx
sudo systemctl restart nginx

# Po tom, ako DNS začne fungovať, získaj SSL certifikát:
sudo certbot --nginx -d timly.tech -d www.timly.tech
```

---

## 3. Nastavenie GitHub Secrets

### Krok 1: Generovanie SSH kľúča
Na serveri spusti:
```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy -N ""
```

### Krok 2: Pridanie verejného kľúča do authorized_keys
```bash
cat ~/.ssh/github_actions_deploy.pub >> ~/.ssh/authorized_keys
```

### Krok 3: Zobrazenie privátneho kľúča
```bash
cat ~/.ssh/github_actions_deploy
```
**Skopíruj celý obsah** (začínajúci `-----BEGIN OPENSSH PRIVATE KEY-----` a končiaci `-----END OPENSSH PRIVATE KEY-----`)

### Krok 4: Nastavenie GitHub Secrets
1. Prejdi na GitHub repo: https://github.com/Zion-Lab-App/fishy
2. Klikni na **Settings** → **Secrets and variables** → **Actions**
3. Klikni na **New repository secret**
4. Pridaj tieto secrets:

**DEPLOY_HOST:**
- **Name:** `DEPLOY_HOST`
- **Value:** `75.119.152.72` (alebo hostname servera, ak máš)

**DEPLOY_USER:**
- **Name:** `DEPLOY_USER`
- **Value:** `root` (alebo tvoj SSH používateľ)

**DEPLOY_SSH_KEY:**
- **Name:** `DEPLOY_SSH_KEY`
- **Value:** (celý privátny SSH kľúč, ktorý si skopíroval v kroku 3)

**DEPLOY_PORT:**
- **Name:** `DEPLOY_PORT`
- **Value:** `22` (štandardný SSH port)

**DEPLOY_PATH:**
- **Name:** `DEPLOY_PATH`
- **Value:** `/var/www/timly.tech`

---

## 4. Testovanie deployu

### Manuálny test
```bash
cd /var/www/fishy
npm install
npm run build
sudo cp -r dist/* /var/www/timly.tech/
sudo chown -R www-data:www-data /var/www/timly.tech
```

### Test cez GitHub Actions
1. Urob malú zmenu v kóde (napr. zmeň text v README)
2. Commit a push:
   ```bash
   git add .
   git commit -m "Test deploy"
   git push origin main
   ```
3. Prejdi na GitHub → **Actions** tab
4. Sleduj priebeh workflow

---

## 5. Riešenie problémov

### DNS nefunguje
- Skontroluj, či sú DNS záznamy správne nastavené
- Počkaj na propagáciu DNS (môže trvať až 24 hodín)
- Over pomocou: `dig timly.tech` alebo `nslookup timly.tech`

### SSL certifikát sa nepodarí získať
- Uisti sa, že DNS už funguje (doména smeruje na správnu IP)
- Skontroluj, či port 80 je otvorený: `sudo ufw allow 80`
- Skús znovu: `sudo certbot --nginx -d timly.tech -d www.timly.tech`

### GitHub Actions deploy zlyhá
- Skontroluj, či sú všetky secrets správne nastavené
- Over SSH pripojenie manuálne: `ssh -i ~/.ssh/github_actions_deploy root@75.119.152.72`
- Pozri si logy v GitHub Actions pre detailnejšie chybové hlásenia

### Nginx nefunguje
- Test konfigurácie: `sudo nginx -t`
- Pozri logy: `sudo tail -f /var/log/nginx/error.log`
- Reštart: `sudo systemctl restart nginx`


