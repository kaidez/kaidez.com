<?php

  if($_POST) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $text = $_POST['text'];

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