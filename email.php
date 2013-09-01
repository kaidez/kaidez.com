<?php
  // Email Submit
  // Note: filter_var() requires PHP >= 5.2.0

  if ( isset($_POST['email']) && isset($_POST['name']) && isset($_POST['text']) && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) ) {
 
    // detect & prevent header injections
    $test = "/(content-type|bcc:|cc:|to:)/i";
    foreach ( $_POST as $key => $val ) {
      if ( preg_match( $test, $val ) ) {
        exit;
      }
    }

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
     */
    $cleanUpMessage = filter_var($_POST['text'], FILTER_SANITIZE_STRING);
    $message = "NAME: " . $name . "\r\n\n" . $cleanUpMessage;

    mail($to, $subject, $message, $headers);
   
  } elseif (isset($_POST['name']) == "") {
    echo "<div>Please enter your name.</div>";
  } elseif ((strlen($_POST['name']) <= 6) ) {
    echo "<div>Your name must be a minimum of 6 characters.</div>";
  }

?>