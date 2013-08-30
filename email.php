<?php

  if($_REQUEST) {
    $name = $_REQUEST['name'];
    $email = $_REQUEST['email'];
    $text = $_REQUEST['text'];

    $to = "kai.gittens@gmail.com";
    $subject = "Contact form submitted from kaidez.com";
    $headers = 'From: ' . $email . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

    $cleanUpmessage = filter_var($_REQUEST['text'], FILTER_SANITIZE_STRING);
    $message = "NAME: " . $name . "\r\n\n" . $cleanUpmessage;
    
    //send email
    mail($to, $subject, $message, $headers);
  }

?>