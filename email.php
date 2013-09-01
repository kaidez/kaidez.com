<?php

  $formName = $_POST['name'];
  $formEmail = $_POST['email'];
  $formText = $_POST['text'];
  $form_errors = false;

  if ($formName === '') {
    echo "<span>Sorry, your name is a required field</span>";
    $form_errors = true;
  }

  if (strlen($formName) <= 6) {
    echo "<span>Sorry, your name must be at least 6 characters</span>";
    $form_errors = true;
  }

  if(!filter_var($theEmail, FILTER_VALIDATE_EMAIL)) {
    echo "E-mail is not valid";
    $form_errors = true;
  }
  else {
    echo "E-mail is valid";
  }

  // if there are no form errors, submit the form
  if ($_POST) {

    $name = $formName;
    $email = $formEmail;
    $text = $formText;
    $to = "kai.gittens@gmail.com";
    $subject = "Contact form submitted from kaidez.com";
    $headers = 'From: ' . $formEmail . "\r\n" .
    'Reply-To: ' . $formEmail . "\r\n" .
    'X-Mailer: PHP/' . phpversion();


    // $cleanUpmessage: a variable that tests to see if the message field is 
    // clean. i.e., make sure that it doesn't contain HTML characters.
    $cleanUpmessage = filter_var($_POST['text'], FILTER_SANITIZE_STRING);
    $message = "NAME: " . $formName . "\r\n\n" . $cleanUpmessage;

    mail($to, $subject, $message, $headers);
  }

?>