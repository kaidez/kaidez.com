<?php

  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['text'];
  $formErrors = false;

  // is "Name" filled out?
  if ($name === '') {
    echo "<div>Please enter your name.</div>";
    $formErrors = true;
  } elseif (strlen($name) < 4) {
    echo "<div>Your name must be at least 4 characters long.</div>";
    $formErrors = true;
  }

  // Is "Email" valid
  if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "E-mail is not valid";
    $formErrors = true;
  }

  // Does "Message" field have at least 25 characters?
  if (strlen($message) < 25) {
    echo "<div>Your Message must be at least 25 characters.</div>";
    $formErrors = true;
  }

  // If the form has no errors, send out the form email...
  if ($formErrors === false) {

    $to = "kai.gittens@gmail.com";
    $subject = "Contact form submitted from kaidez.com";
    $headers = 'From: ' . $email . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

    /*
     * $cleanUpmessage: a variable that tests to see if the message field is 
     * clean. i.e., make sure that it doesn't contain HTML characters.
     */
    $cleanUpMessage = filter_var($_POST['text'], FILTER_SANITIZE_STRING);
    $message = "NAME: " . $name . "\r\n\n" . $cleanUpMessage;

    if(mail($to, $subject, $message, $headers)) {
      echo "<div>Thank You For Contacting Us!!!</div>";
    }
  }

?>