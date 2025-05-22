<?php
// Database credentials
require 'db.connection.php';

// Sanitize input
$name = trim($_POST['name']);
$contact = trim($_POST['contact']);
$date = $_POST['date'];
$time = $_POST['time'];
$people = intval($_POST['people']);

// Validate (basic)
if (empty($name) || empty($contact) || empty($date) || empty($time) || $people < 1 || $people > 40) {
    die("Invalid input data.");
}

// Step 1: Check if customer exists
$checkCustomer = $conn->prepare("SELECT customer_id FROM customers WHERE contact_number = ?");
$checkCustomer->bind_param("s", $contact);
$checkCustomer->execute();
$result = $checkCustomer->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $customer_id = $row['customer_id'];
} else {
    // Step 2: Insert new customer
    $insertCustomer = $conn->prepare("INSERT INTO customers (name, contact_number) VALUES (?, ?)");
    $insertCustomer->bind_param("ss", $name, $contact);
    $insertCustomer->execute();
    $customer_id = $insertCustomer->insert_id;
}

// Step 3: Insert reservation
$insertReservation = $conn->prepare("INSERT INTO reservations (customer_id, reservation_date, reservation_time, number_of_people) VALUES (?, ?, ?, ?)");
$insertReservation->bind_param("issi", $customer_id, $date, $time, $people);
$insertReservation->execute();

// Success response
echo "Reservation successful!";

$conn->close();
?>
