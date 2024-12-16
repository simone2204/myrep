<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email_address = $_POST["email_address"];
    $password = $_POST["password"];

    if (empty($email_address) || empty($password)) {
        echo "Please enter both email and password";
        exit;
    }

    $host = "127.0.0.1";
    $dbname = "users_registered";
    $username = "root";
    $dbPassword = "";

    $conn = new mysqli($host, $username, $dbPassword, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $email_address = mysqli_real_escape_string($conn, $email_address); // Protezione SQL injection
    $query = "SELECT id, email, password FROM users WHERE email = '$email_address'";
    $res = mysqli_query($conn, $query);

    if (mysqli_num_rows($res) == 0) {
        echo "Error: email not found in database";
        mysqli_free_result($res);
        $conn->close();
        exit;
    }

    $user = mysqli_fetch_assoc($res);
    $stored_password = $user['password'];
    $user_id = $user['id'];

    // Verifica della password
    if (password_verify($password, $stored_password)) {
        session_regenerate_id(true);
        $_SESSION['email'] = $email_address;
        $_SESSION['id'] = $user_id;

        header("Location: http://127.0.0.1:5500/site.html");
        exit;
    } else {
        echo "Error: incorrect password" . ' ';
        echo "Stored password hash: " . $stored_password . ' ' . "Entered password: " . $password;
    }
    mysqli_free_result($res);
    $conn->close();
}
?>