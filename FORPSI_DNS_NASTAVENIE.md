# Nastavenie DNS na Forpsi pre timly.tech

## Rýchly návod

### 1. Prihlásenie
- Prihlás sa do svojho Forpsi účtu
- Prejdi do **DNS zóny** alebo **Správa domén**
- Vyber doménu **timly.tech**

### 2. Pridanie DNS záznamov

Pridaj tieto 4 záznamy:

#### Záznam 1: A záznam pre doménu
```
Názov: @ (alebo prázdne)
Typ: A
Hodnota: 75.119.152.72
TTL: 3600
```

#### Záznam 2: A záznam pre www
```
Názov: www
Typ: A
Hodnota: 75.119.152.72
TTL: 3600
```

#### Záznam 3: AAAA záznam pre doménu (IPv6 - voliteľné)
```
Názov: @ (alebo prázdne)
Typ: AAAA
Hodnota: 2a02:c207:2260:1048::1
TTL: 3600
```

#### Záznam 4: AAAA záznam pre www (IPv6 - voliteľné)
```
Názov: www
Typ: AAAA
Hodnota: 2a02:c207:2260:1048::1
TTL: 3600
```

### 3. Uloženie
- Ulož všetky zmeny
- Počkaj 15-60 minút na propagáciu DNS

### 4. Overenie
Po nastavení môžeš overiť, či DNS funguje:
- Otvor terminál a spusti: `nslookup timly.tech`
- Alebo použij online nástroj: https://www.whatsmydns.net/

---

## Dôležité poznámky

- **IPv6 záznamy (AAAA) sú voliteľné** - ak nevieš, ako ich pridať, stačí pridať len A záznamy
- **DNS propagácia** môže trvať od 15 minút do 24 hodín
- **TTL hodnota** môže byť aj predvolená, ak Forpsi neumožňuje zmenu
- Po nastavení DNS počkaj aspoň 30 minút pred získaním SSL certifikátu

---

## Čo ďalej?

Po nastavení DNS:
1. Aktivuj nginx konfiguráciu (viď `DEPLOY_SETUP.md`)
2. Získaj SSL certifikát cez certbot
3. Nastav GitHub Secrets (viď `DEPLOY_SETUP.md`)
4. Pushni zmeny do GitHubu a deploy sa spustí automaticky

