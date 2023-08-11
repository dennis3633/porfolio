<?php
// Get form input values
$name = $_POST['name'];
$email = $_POST['email'];
$address = $_POST['address'];
$phone = $_POST['phone'];
$message = $_POST['message'];

// Set up email headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Compose the email message
$subject = "New contact form submission";
$body = "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Address: $address\n";
$body .= "Phone: $phone\n\n";
$body .= "Message:\n$message";

// Send the email
$mailSent = mail('denniskimutai959@gmail.com', $subject, $body, $headers);

// Check if the email was sent successfully
if ($mailSent) {
    echo "Thank you for your message! We will be in touch shortly.";
} else {
    echo "Oops! Something went wrong. Please try again later.";
}
?>
