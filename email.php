<?php

  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['text'];
  $formErrors = false;

  // is "Name" filled out?
  if ($name === '') {
    echo "<div>Please enter your name.</div>";
    $formErrors = true;
  }

  // Does "Message" field have at least 25 characters?
  if (strlen($message) < 25) {
    echo "<div>Your Message must be at least 25 characters.</div>";
    $formErrors = true;
  }

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

    // $to = "kai.gittens@gmail.com";
    // $subject = "Contact form submitted from kaidez.com";
    // $headers = 'From: ' . $cleanUpEmail . "\r\n" .
    // 'Reply-To: ' . $cleanUpEmail . "\r\n" .
    // 'X-Mailer: PHP/' . phpversion();

    // $cleanUpMessage = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
    // $message = "NAME: " . $name . "\r\n\n" . $cleanUpMessage;

    if(mail($to, $subject, $message, $headers)) {
      echo "<div>Good!!!!!!!!</div>";
    }
  }

?>