<?php
session_start();

// Abilitazione CORS
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://127.0.0.1:5500"); // Limita l'accesso al dominio del client
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Controllo se l'utente è loggato
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

// Connessione al database
$host = "127.0.0.1";
$dbname = "users_registered";
$username = "root";
$dbPassword = "";

$conn = new mysqli($host, $username, $dbPassword, $dbname);

if ($conn->connect_error) {
    echo json_encode(["error" => "Errore di connessione al database"]);
    exit;
}

// Ottieni l'ID dell'utente dal database
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

// Inserisci il like nella tabella "likes"
$sqlInsert = "INSERT INTO likes (user_id, article_id, created_at) VALUES (?, ?, NOW())";
$stmtInsert = $conn->prepare($sqlInsert);
$stmtInsert->bind_param("ii", $userId, $articleId);

if (!$stmtInsert->execute()) {
    echo json_encode(["error" => "Errore durante l'aggiunta del like"]);
    exit;
}

echo json_encode(["success" => true, "message" => "Like aggiunto"]);

$stmtInsert->close();
$conn->close();
?>