<?php
try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    $stmt = $pdo->prepare("SELECT i.*, s.name as sinner_name FROM identities i JOIN sinners s ON i.sinner_id = s.id");
    $stmt->execute();
    
    $identities = $stmt->fetchAll();
    echo json_encode($identities);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
}