<?php
require 'db.connection.php';

$name = trim($_POST['name']);
$email = trim($_POST['email']);
$message = trim($_POST['message']);

if ($name && $email && $message && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $message);
    $stmt->execute();
    $stmt->close();
    header("Location: index.html?contact=success");
    exit;
} else {
    header("Location: index.html?contact=error");
    exit;
}
?>
