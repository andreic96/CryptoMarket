<?php
$mail = "andymagistral@gmail.com";
$subject = "Crypto Message - Contact";
$message = "";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

if($HTTP_RAW_POST_DATA) {
    $form_data = json_decode($HTTP_RAW_POST_DATA);

    $message = '<html><body>';
    $message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
    $message .= "<tr style='background: #eee;'><td><strong>Name:</strong> </td><td>" . $form_data->name. "</td></tr>";
    $message .= "<tr><td><strong>Email:</strong> </td><td>" . $form_data->email . "</td></tr>";
    $message .= "<tr><td><strong>Type:</strong> </td><td>" . $form_data->subject . "</td></tr>";
    $message .= "<tr><td><strong>Message:</strong> </td><td>" . $form_data->message . "</td></tr>";
    $message .= "</table>";
    $message .= "</body></html>";

    if(mail($mail, $subject, $message, $headers)){
        var_dump('message sent');
    }else{
        var_dump('can\'t send mess');
    }
}