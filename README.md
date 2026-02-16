# Limbusdle

A web-based puzzle game inspired by **Limbus Company**. Players guess character identities based on clues about their faction, skills, and other attributes.

**Ukrainian Version:** Веб-застосунок-головоломка за мотивами Limbus Company.

---

## 🎮 Features

- **Interactive Guessing Game**: Identify characters based on limited information
- **Database-Driven**: MySQL database with 12 characters and 150+ identities
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Search**: Autocomplete suggestions for guessing
- **Dossier View**: Browse all available identities and their details
- **Dockerized**: Easy one-click deployment with Docker

---

## 📋 Technologies

| Component | Technology |
|-----------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | PHP 8.2 |
| **Database** | MySQL 8.0 |
| **Deployment** | Docker, Docker Compose |
| **Build Tools** | Make, Batch scripts |

---

## ⚙️ Requirements

- **Docker Desktop** (includes Docker & Docker Compose)
  - [Download for Windows](https://www.docker.com/products/docker-desktop)
  - [Download for Mac](https://www.docker.com/products/docker-desktop)
  - [Install on Linux](https://docs.docker.com/engine/install/)
- **Windows**: PowerShell / CMD or WSL
- **Linux/Mac**: Make (optional, for convenient commands)

---

## 🚀 Quick Start

### Windows (Recommended)
Simply double-click `start.bat` and the game will open at **http://localhost:8080**

To stop: double-click `stop.bat`

### Command Line (All Platforms)
```bash
# Start the project
docker-compose up -d

# Stop the project
docker-compose down

# View logs
docker-compose logs -f
```

### Linux/Mac (With Make)
```bash
make start      # Start containers
make stop       # Stop containers
make restart    # Restart containers
make logs       # View live logs
make clean      # Remove containers & volumes
```

---

## 📁 Project Structure

```
limbusdle-project/
├── docker-compose.yml       # Container orchestration
├── Dockerfile               # PHP-Apache image definition
├── start.bat / stop.bat     # Windows launch scripts
├── Makefile                 # Linux/Mac commands
├── README.md                # This file
├── sql/
│   ├── 01_init.sql         # Database schema
│   └── 02_data.sql         # Sample data (12 characters, 150+ identities)
└── src/
    ├── index.html          # Main game page
    ├── dossier.html        # Character directory
    ├── rules.html          # Game rules
    ├── css/
    │   └── style.css       # Styling & responsive layout
    ├── js/
    │   └── app.js          # Game logic & API calls
    └── php/
        └── get_identities.php  # Database query endpoint
```

---

## 🎯 How to Play

1. **Start the Game**: Open http://localhost:8080
2. **Look at the Clues**: You'll see hints about an identity:
   - Sinner name
   - Faction
   - Skills (Slash, Pierce, Blunt, Guard, Evade, Counter)
   - Defense type
3. **Make Your Guess**: Type in the search box to find the identity
4. **Get Feedback**: 
   - 🟢 **Green** = Correct match
   - 🔴 **Red** = Incorrect
5. **View Your History**: See all your guesses in a table

---

## 📊 Database Schema

### `sinners` Table
Stores the 12 main characters from Limbus Company.

| Column | Type | Notes |
|--------|------|-------|
| `id` | INT | Primary key, auto-increment |
| `name` | VARCHAR(50) | Character name (unique) |

### `identities` Table
Stores 150+ character identities (different personas/forms).

| Column | Type | Notes |
|--------|------|-------|
| `id` | INT | Primary key |
| `sinner_id` | INT | Foreign key referencing sinners |
| `name` | VARCHAR(255) | Identity name |
| `rarity` | VARCHAR(10) | Star rating (0, 00, 000) |
| `season` | VARCHAR(50) | Which season/event |
| `faction` | VARCHAR(100) | Organization/faction |
| `skill1`, `skill2`, `skill3` | VARCHAR(50) | Attack skill types |
| `defense` | VARCHAR(50) | Defense type |
| `image_path` | VARCHAR(255) | Image file path |

---

## 🔧 API Endpoints

### `GET /php/get_identities.php`
Returns all identities with their properties in JSON format.

**Response Example:**
```json
[
  {
    "id": 1,
    "sinner_id": 1,
    "name": "LCB Sinner: Yi Sang",
    "rarity": "0",
    "season": "Season 0",
    "faction": "Limbus Company LCB",
    "skill1": "Slash",
    "skill2": "Pierce",
    "skill3": "Slash",
    "defense": "Guard",
    "image_path": "img/yi_sang_base.png",
    "sinner_name": "Yi Sang"
  }
]
```

---

## 🛠️ Development

### View Application Logs
```bash
docker-compose logs -f limbusdle-web
```

### Access Database
```bash
docker exec -it limbusdle_db mysql -u root -p limbusdle
```
(Password: `root_password`)

### Modify Database Files
Edit `sql/01_init.sql` and `sql/02_data.sql`, then restart:
```bash
docker-compose restart limbusdle-web
```

---

## 📝 Adding New Identities

1. Add the sinner to `sql/02_data.sql` if they don't exist:
```sql
INSERT INTO sinners (name) VALUES ('New Character');
```

2. Add identities for this character:
```sql
INSERT INTO identities (sinner_id, name, rarity, season, faction, skill1, skill2, skill3, defense, image_path)
VALUES (13, 'Title: New Character', '000', 'Season X', 'Faction', 'Skill1', 'Skill2', 'Skill3', 'Defense', 'img/path.png');
```

3. Restart the database:
```bash
docker-compose restart limbusdle-web
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Docker not found** | Install Docker Desktop from docker.com |
| **Port 8080 already in use** | Kill the process: `netstat -ano \| findstr :8080` (Windows) or `lsof -i :8080` (Mac/Linux) |
| **Database connection error** | Check logs: `docker-compose logs db` |
| **Images not loading** | Ensure image files exist in `src/img/` directory |
| **Styles not applying** | Clear browser cache (Ctrl+Shift+Del) |

---

## 📄 License

This project is inspired by **Project Moon's Limbus Company**. For educational purposes.

---

## 👨‍💻 Author

Created as part of a practicum project.

---

## 🔗 Useful Links

- [Limbus Company Wiki](https://projectmoon.fandom.com/wiki/Limbus_Company)
- [Docker Documentation](https://docs.docker.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [PHP Documentation](https://www.php.net/manual/)