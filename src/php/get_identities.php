<?php
header('Content-Type: application/json');

$host = 'limbusdle_db';
$db   = 'limbusdle';
$user = 'root';
$pass = 'root_password';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    
    $sql = "SELECT i.*, s.name AS sinner_name 
            FROM identities i 
            JOIN sinners s ON i.sinner_id = s.id";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    
    $results = $stmt->fetchAll();
    echo json_encode($results);

} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]); 
}