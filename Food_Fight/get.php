<?php

include 'database.php';

$name = $_GET['name']; 

$sql = "SELECT * FROM scores WHERE Name = '$name'";

$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result)>0){

    $row = mysqli_fetch_assoc($result);
    
    echo $row['Name'] . " " . $row['Score'];    
}

