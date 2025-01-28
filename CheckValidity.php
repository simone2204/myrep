<?php
session_start();

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $email_address = $_POST["email_address"];
    $password = $_POST["password"];

    // 1. Controllo input
    if (empty($email_address) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "Error: Please enter both email and password"]);
        exit;
    }
    if (!filter_var($email_address, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Error: Invalid email format"]);
        exit;
    }
    if (strlen($password) < 6) {
        echo json_encode(["status" => "error", "message" => "Error: Password must be at least 6 characters long"]);
        exit;
    }

    $_SESSION['email'] = $email_address;

    // Data for Database MYSQL
    $host = "127.0.0.1";
    $dbname = "users_registered";
    $username = "root";
    $dbPassword = "";

    $conn = new mysqli($host, $username, $dbPassword, $dbname);
    if ($conn->connect_error) {
        echo json_encode(["status" => "error", "message" => "Connection failed"]);
        exit;
    }

    $email_address = mysqli_real_escape_string($conn, $email_address); // Per evitare SQL injection
    $query = "SELECT id FROM users WHERE email = '$email_address'";
    $res = mysqli_query($conn, $query);

    if (mysqli_num_rows($res) > 0) {
        echo "Error: email already registered";
        mysqli_free_result($res);
        $conn->close();
        exit;
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $query = "INSERT INTO users (email, password) VALUES ('$email_address', '$hashed_password')";
    if (mysqli_query($conn, $query)) {
        $_SESSION['email'] = $email_address;
        setcookie("user_email", $email_address, time() + (60 * 60 * 24 * 30), "/");  // 30 giorni di durata del cookie
        header("Location: http://127.0.0.1:5500/site.html");
        exit;
    } else echo json_encode(["status" => "error", "message" => "Error: Registration failed"]);
    mysqli_free_result($res);
    $conn->close();
}
?>
