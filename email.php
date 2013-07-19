<?php

  if($_POST){
    $name=$_POST['name'];
    $email=$_POST['email'];
    $text=$_POST['text'];
  
    //send email
    mail("kai.gittens@gmail.com", "SUBJECT", $text, "From:" . $name);
  }

?>