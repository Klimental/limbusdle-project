<?php
$host = 'db';
$db   = 'limbusdle';
$user = 'root';
$pass = 'root_password';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
try {
     $pdo = new PDO($dsn, $user, $pass);
     $stmt = $pdo->query("SELECT i.*, s.name as sinner_name FROM identities i JOIN sinners s ON i.sinner_id = s.id");
     $identities = $stmt->fetchAll(PDO::FETCH_ASSOC);
     echo json_encode($identities);
} catch (\PDOException $e) {
     echo json_encode(['error' => $e->getMessage()]);
}
?>