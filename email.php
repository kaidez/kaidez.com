<?php

  $name = $_REQUEST['name'];
  $email = $_REQUEST['email'];
  $text = $_REQUEST['text'];

  // is "Name" filled out?
  if ($name === '') {
    echo "<div>Please enter your name.</div>";
  }

  // Does "Message" field have at least 25 characters?
  if (strlen($text) < 25) {
    echo "<div>Your Message must be at least 25 characters.</div>";
  }

?>