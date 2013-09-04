<?php

  $name = $_REQUEST['name'];
  $email = $_REQUEST['email'];
  $message = $_REQUEST['message'];
  $formErrors = $false;

  // is "Name" filled out?
  if ($name === '') {
    echo "<div>Please enter your name.</div>";
    $formErrors = $true;
  }

  // Does "Message" field have at least 25 characters?
  if (strlen($message) < 25) {
    echo "<div>Your Message must be at least 25 characters.</div>";
    $formErrors = $true;
  }

  if ($formErrors === false) {

    $cleanUpEmail = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);

    $to = "kai.gittens@gmail.com";
    $subject = "Contact form submitted from kaidez.com";
    $headers = 'From: ' . $cleanUpEmail . "\r\n" .
    'Reply-To: ' . $cleanUpEmail . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

    $cleanUpMessage = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
    $message = "NAME: " . $name . "\r\n\n" . $cleanUpMessage;

    if(mail($to, $subject, $message, $headers)) {
      echo "<div>Good!!!!!!!!</div>";
    }
  }

?>