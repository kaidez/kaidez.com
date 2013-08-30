<?php

  $formName = $_REQUEST['name'];
  $formEmail = $_REQUEST['email'];
  $formText = $_REQUEST['text'];

  if($_POST) {
    $name = $formName;
    $email = $formEmail;
    $text = $formEmail;

    $to = "kai.gittens@gmail.com";
    $subject = "Contact form submitted from kaidez.com";
    $headers = 'From: ' . $email . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

    $cleanUpmessage = filter_var($_POST['text'], FILTER_SANITIZE_STRING);
    $message = "NAME: " . $name . "\r\n\n" . $cleanUpmessage;
    
    //send email
    mail($to, $subject, $message, $headers);
  }

?>