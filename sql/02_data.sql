INSERT INTO sinners (name) VALUES 
('Yi Sang'), 
('Faust'), 
('Don Quixote'), 
('Ryoshu'), 
('Meursault'), 
('Hong Lu'), 
('Heathcliff'), 
('Ishmael'), 
('Rodya'), 
('Sinclair'), 
('Outis'), 
('Gregor');

INSERT INTO identities (sinner_id, name, rarity, season, faction, skill1, skill2, skill3, defense, image_path) VALUES 
-- Yi Sang (1)--
(1, 'LCB Sinner: Yi Sang', '0', 'Season 0', 'Limbus Company LCB', 'Slash', 'Pierce', 'Slash', 'Guard', 'img/yi_sang_base.png'),
(1, 'Seven Assoc. South Section 6: Yi Sang', '00', 'Season 0', 'Seven Association', 'Pierce', 'Pierce', 'Blunt', 'Guard', 'img/yi_sang_seven.png'),
(1, 'Blade Lineage Salsu: Yi Sang', '000', 'Season 0', 'Blade Lineage', 'Slash', 'Slash', 'Slash', 'Counter', 'img/yi_sang_blade.png'),
(1, 'Effloresced E.G.O::Spicebush: Yi Sang', '000', 'Season 2', 'Technology Liberation Alliance', 'Pierce', 'Blunt', 'Pierce', 'Evade', 'img/yi_sang_spicebush.png'),
(1, 'Molar Office Fixer: Yi Sang', '00', 'Season 2', 'Molar Office', 'Pierce', 'Blunt', 'Blunt', 'Guard', 'img/yi_sang_molar.png'),
(1, 'W Corp. L3 Cleanup Agent: Yi Sang', '000', 'Season 0', 'W Corp.', 'Slash', 'Pierce', 'Pierce', 'Evade', 'img/yi_sang_w.png'),
(1, 'The Pequod First Mate: Yi Sang', '00', 'Season 3', 'The Pequod', 'Pierce', 'Pierce', 'Pierce', 'Evade', 'img/yi_sang_pequod.png'),
(1, 'Dieci Assoc. South Section 4: Yi Sang', '00', 'Season 0', 'Dieci Association', 'Pierce', 'Blunt', 'Blunt', 'Guard', 'img/yi_sang_dieci.png'),
(1, 'The Ring Pointillist Student: Yi Sang', '000', 'Season 0', 'The Ring', 'Pierce', 'Pierce', 'Pierce', 'Guard', 'img/yi_sang_ring.png'),
(1, 'Lobotomy E.G.O::Solemn Lament: Yi Sang', '000', 'Walpurgis Night', 'L Corp.', 'Pierce', 'Pierce', 'Pierce', 'Guard', 'img/yi_sang_solemn.png'),
(1, 'LCB E.G.O::Lantern: Yi Sang', '00', 'Season 5', 'Limbus Company LCE', 'Blunt', 'Pierce', 'Blunt', 'Counter', 'img/yi_sang_lantern.png'),
(1, 'Liu Assoc. South Section 3: Yi Sang', '000', 'Season 0', 'Liu Association', 'Slash', 'Slash', 'Slash', 'Counter', 'img/yi_sang_liu.png'),
(1, 'N Corp. E.G.O::Fell Bullet: Yi Sang', '000', 'Season 6', 'N Corp.', 'Blunt', 'Pierce', 'Pierce', 'Clashable Counter', 'img/yi_sang_fell.png'),
(1, 'Heishou Pack - Wu Branch Adept: Yi Sang', '000', 'Season 6', 'H Corp.', 'Slash', 'Slash', 'Slash', 'Clashable Guard', 'img/yi_sang_heishou.png'),

-- Faust (2)--
(2, 'LCB Sinner: Faust', '0', 'Season 0', 'Limbus Company LCB', 'Blunt', 'Blunt', 'Blunt', 'Evade', 'img/faust_base.png'),
(2, 'W Corp. L2 Cleanup Agent: Faust', '00', 'Season 0', 'W Corp.', 'Blunt', 'Blunt', 'Blunt', 'Guard', 'img/faust_w.png'),
(2, 'Lobotomy Corp. Remnant: Faust', '00', 'Season 1', 'Lobotomy Corp', 'Slash', 'Pierce', 'Slash', 'Evade', 'img/faust_remnant.png'),
(2, 'The One Who Grips: Faust', '000', 'Season 1', 'N Corp.', 'Pierce', 'Pierce', 'Blunt', 'Evade', 'img/faust_n.png'),
(2, 'Zwei Assoc. South Section 4: Faust', '00', 'Season 0', 'Zwei Association', 'Pierce', 'Slash', 'Slash', 'Guard', 'img/faust_zwei.png'),
(2, 'Seven Assoc. South Section 4: Faust', '000', 'Season 0', 'Seven Association', 'Slash', 'Slash', 'Slash', 'Guard', 'img/faust_seven.png'),
(2, 'Lobotomy E.G.O::Regret: Faust', '000', 'Walpurgis Night', 'Lobotomy Corp', 'Blunt', 'Blunt', 'Blunt', 'Counter', 'img/faust_regret.png'),
(2, 'Blade Lineage Salsu: Faust', '000', 'Season 3', 'Blade Lineage', 'Slash', 'Pierce', 'Slash' , 'Guard', 'img/faust_blade.png'),
(2, 'Wuthering Heights Butler: Faust', '00', 'Season 4', 'Wuthering Heights', 'Slash', 'Blunt', 'Slash', 'Guard', 'img/faust_butler.png'),
(2, 'MultiCrack Office Rep: Faust', '000', 'Season 4', 'MultiCrack Office', 'Slash', 'Blunt', 'Blunt', 'Guard', 'img/faust_multicrack.png'),
(2, 'The Index Proselyte: Faust', '000', 'Season 7', 'The Index', 'Slash', 'Slash', 'Slash', 'Counter', 'img/faust_index.png'),
(2, 'Heishou Pack - Mao Branch Adept: Faust', '000', 'Season 6', 'H Corp.', 'Slash', 'Slash', 'Slash', 'Clashable Guard', 'img/faust_heishou.png'),
(2, 'Shi Assoc. East Section 3: Faust', '000', 'Season 0', 'Shi Association', 'Slash', 'Slash', 'Pierce', 'Guard', 'img/faust_shi_east.png'),
(2, 'LCE E.G.O::Ardor Blossom Star: Faust', '000', 'Season 5', 'Limbus Company LCE', 'Blunt', 'Blunt', 'Blunt', 'Evade', 'img/faust_ardor.png');

-- Don Quixote (3)--

-- Ryoshu (4) --

-- Meursault (5) --

-- Hong Lu (6) --

-- Heathcliff (7) --

-- Ishmael (8) --

-- Rodya (9) --

-- Sinclair (10) --

-- Outis (11) --

-- Gregor (12) --