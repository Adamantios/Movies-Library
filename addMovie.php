<?php
include 'connParameters.php';

$con = mysqli_connect($host, $userName, $password, $dbName);

if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

$movieName = mysqli_real_escape_string($con, $_GET['itemName']);
$genreID = mysqli_real_escape_string($con, $_GET['itemGenre']);

$sql="insert into movies (movieName, genreId) values ('" .
        $movieName . "', " . $genreID . ")";

if (!mysqli_query($con, $sql)) {
  die('Error: ' . mysqli_error($con));
}
echo "1 record added";

mysqli_close($con);
?>