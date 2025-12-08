# Backend Server Setup

## Lokálne vývojové prostredie

Po `git pull` a `npm install`:

1. **Spusti backend server** (v jednom termináli):
   ```bash
   npm run server
   ```
   Backend beží na `http://localhost:3001`

2. **Spusti frontend** (v druhom termináli):
   ```bash
   npm run dev
   ```
   Frontend beží na `http://localhost:5173` (alebo iný port)

Frontend automaticky volá backend na `http://localhost:3001`.

## Deploy zmeny na produkciu

Keď máš hotové zmeny a chceš ich nasadiť na https://timly.tech:

1. **Pridaj zmeny do gitu:**
   ```bash
   git add .
   ```

2. **Commitni zmeny:**
   ```bash
   git commit -m "Popis toho, čo si urobil"
   ```
   Napríklad: `git commit -m "Pridaný nový formulár pre úlovky"`

3. **Pushni na GitHub:**
   ```bash
   git push origin master
   ```

4. **Počkaj cca 1 minútu** - GitHub Actions automaticky:
   - Zbuilduje aplikáciu
   - Deployne ju na server
   - Reštartuje backend server
   
5. **Zmeny sa prejavia na https://timly.tech**

Môžeš sledovať priebeh deployu na: https://github.com/Zion-Lab-App/fishy/actions

## API Endpointy

- `GET /list` - Zoznam všetkých úlovkov
- `GET /list/:id` - Detail konkrétneho úlovku
- `POST /list` - Vytvorenie nového úlovku
- `PUT /list/:id` - Aktualizácia úlovku
- `DELETE /list/:id` - Zmazanie úlovku

Dáta sa ukladajú do `db.json` súboru.

