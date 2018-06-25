<?php
include 'connParameters.php';

$con = mysqli_connect($host, $userName, $password, $dbName);

if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con, $dbName);
$sql="delete from movies where id=" . $_GET["id"];

if (!mysqli_query($con, $sql)) {
  die('Error: ' . mysqli_error($con));
}
echo "1 record deleted";

mysqli_close($con);
?>