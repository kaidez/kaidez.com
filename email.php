<?php

  $name = $_REQUEST['name'];
  $email = $_REQUEST['email'];
  $message = $_REQUEST['message'];

  // is "Name" filled out?
  if ($name === '') {
    echo "<div>Please enter your name.</div>";
  }

  // Does "Message" field have at least 25 characters?
  if (strlen($message) < 25) {
    echo "<div>Your Message must be at least 25 characters.</div>";
  }


/*
 * $cleanUpmessage: a variable that tests to see if the message field is 
 * clean. i.e., make sure that it doesn't contain HTML characters.
 */

// $cleanUpMessage = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
// $message = "NAME: " . $name . "\r\n\n" . $cleanUpMessage;
?>