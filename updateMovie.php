<?php
include 'connParameters.php';

$con = mysqli_connect($host, $userName, $password, $dbName);

if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

$movieID = mysqli_real_escape_string($con, $_GET['itemID']);
$movieName = mysqli_real_escape_string($con, $_GET['itemName']);
$genreID = mysqli_real_escape_string($con, $_GET['itemGenre']);

$sql = "update movies set movieName = '" . $movieName .
    "', genreId = " . $genreID . 
    " where id = " . $movieID;

if (!mysqli_query($con, $sql)) {
  die('Error: ' . mysqli_error($con));
}
echo "record updated";

mysqli_close($con);
?>