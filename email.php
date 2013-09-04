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


/* $cleanUpMessage = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
$message = "NAME: " . $name . "\r\n\n" . $cleanUpMessage;
    $name = $_POST['name'];
    $email = $_POST['email'];
    $text = $_POST['text'];
    $to = "kai.gittens@gmail.com";
    $subject = "Contact form submitted from kaidez.com";
    $headers = 'From: ' . $email . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

    /*
     * $cleanUpmessage: a variable that tests to see if the message field is 
     * clean. i.e., make sure that it doesn't contain HTML characters.
     
    $cleanUpMessage = filter_var($_POST['text'], FILTER_SANITIZE_STRING);
    $message = "NAME: " . $name . "\r\n\n" . $cleanUpMessage;

    mail($to, $subject, $message, $headers);*/
?>