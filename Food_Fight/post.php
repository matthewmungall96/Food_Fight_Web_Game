<?php

include 'database.php';

$name = $_REQUEST['name']; 
$score = $_REQUEST['score'];

$sql = "SELECT * FROM scores WHERE Name = '$name'";

$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result)>0){
    $sql = "UPDATE scores SET Name = '$name', Score=$score WHERE Name = '$name'";
}else {
    $sql = "INSERT INTO Name, Score VALUES ('$name', $score)";
}

$result = mysqli_query($con, $sql);