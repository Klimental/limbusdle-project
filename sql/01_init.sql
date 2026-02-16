/**
 * ========================================
 * LIMBUSDLE - DATABASE SCHEMA
 * ========================================
 * Creates two tables for the Limbus puzzle game:
 * 1. sinners: Stores the 12 main characters
 * 2. identities: Stores 150+ character personas/forms
 */

/**
 * SINNERS TABLE
 * Stores the 12 main characters from Limbus Company
 * Examples: Yi Sang, Faust, Don Quixote, Ryoshu, etc.
 */
CREATE TABLE IF NOT EXISTS sinners (
    id INT AUTO_INCREMENT PRIMARY KEY,              -- Unique sinner ID
    name VARCHAR(50) NOT NULL UNIQUE                -- Character name (unique)
);

/**
 * IDENTITIES TABLE
 * Stores different personas/forms of each sinner
 * Each identity has different factions, skills, and rarities
 * 
 * Example row:
 * - Name: "LCB Sinner: Yi Sang"
 * - Sinner: Yi Sang (id=1)
 * - Rarity: 0 stars
 * - Skills: Slash, Pierce, Slash
 * - Defense: Guard
 */
CREATE TABLE IF NOT EXISTS identities (
    id INT AUTO_INCREMENT PRIMARY KEY,              -- Unique identity ID
    sinner_id INT,                                  -- Foreign key to sinners table
    name VARCHAR(255) NOT NULL,                     -- Identity title
    rarity VARCHAR(10),                             -- Star rating (0, 00, 000)
    season VARCHAR(50),                             -- Season/Event (Season 0, Season 1, etc.)
    faction VARCHAR(100),                           -- Organization (Limbus Company, N Corp, etc.)
    skill1 VARCHAR(50),                             -- First attack skill type
    skill2 VARCHAR(50),                             -- Second attack skill type
    skill3 VARCHAR(50),                             -- Third attack skill type
    defense VARCHAR(50),                            -- Defense mechanism type
    image_path VARCHAR(255),                        -- Path to character image (src/img/...)
    FOREIGN KEY (sinner_id) REFERENCES sinners(id) ON DELETE CASCADE
    -- Foreign key: deletes identities if sinner is deleted
);