<?php
session_start();
// Abilitazione CORS
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if (!isset($_SESSION["email"])) {
    echo json_encode(["error" => "Utente non loggato"]);
    exit;
}

// Leggi il corpo della richiesta
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!$data || !isset($data["articleId"])) {
    echo json_encode(["error" => "Dati mancanti"]);
    exit;
}

$articleId = intval($data["articleId"]);
$userEmail = $_SESSION["email"];

$host = "127.0.0.1";
$dbname = "users_registered";
$username = "root";
$dbPassword = "";

$conn = new mysqli($host, $username, $dbPassword, $dbname);

if ($conn->connect_error) {
    echo json_encode(["error" => "Errore connessione"]);
    exit;
}

// Ottieni l'ID dell'utente
$sqlUser = "SELECT id FROM users WHERE email = ?";
$stmtUser = $conn->prepare($sqlUser);
$stmtUser->bind_param("s", $userEmail);
$stmtUser->execute();
$resultUser = $stmtUser->get_result();
$user = $resultUser->fetch_assoc();

if (!$user) {
    echo json_encode(["error" => "Utente non trovato"]);
    exit;
}

$userId = $user["id"];

// Aggiungi un articolo nella tabella articles (senza specificare article_id, che è auto-incrementato)
$sqlInsertArticle = "INSERT INTO articles (user_id, title, content) VALUES (?, 'Trump elects Patel', 'Content')";
if (!$conn->prepare($sqlInsertArticle)->execute([$userId])) {
    echo json_encode(["error" => "Errore durante l'inserimento dell'articolo"]);
    exit;
}

// Controlla se l'utente ha già messo like
$sqlCheck = "SELECT * FROM likes WHERE user_id = ? AND article_id = ?";
$stmtCheck = $conn->prepare($sqlCheck);
$stmtCheck->bind_param("ii", $userId, $articleId);

if (!$stmtCheck->execute()) {
    echo json_encode(["error" => "Errore durante la verifica del like"]);
    exit;
}

$result = $stmtCheck->get_result();

if ($result->num_rows > 0) {
    // Se il like esiste, lo rimuove
    $sqlDelete = "DELETE FROM likes WHERE user_id = ? AND article_id = ?";
    $stmtDelete = $conn->prepare($sqlDelete);
    $stmtDelete->bind_param("ii", $userId, $articleId);
    
    if (!$stmtDelete->execute()) {
        echo json_encode(["error" => "Errore durante la rimozione del like"]);
        exit;
    }
    
    echo json_encode(["success" => true, "action" => "unliked"]);
} else {
    // Se il like non esiste, lo aggiunge
    $sqlInsertLike = "INSERT INTO likes (user_id, article_id, created_at) VALUES (?, ?, NOW())";
    $stmtInsertLike = $conn->prepare($sqlInsertLike);
    $stmtInsertLike->bind_param("ii", $userId, $articleId);
    
    if (!$stmtInsertLike->execute()) {
        echo json_encode(["error" => "Errore durante l'aggiunta del like"]);
        exit;
    }
    
    echo json_encode(["success" => true, "action" => "liked"]);
}

$stmtCheck->close();
$stmtDelete->close();
$stmtInsertLike->close();
$conn->close();
?>
