<?php
include 'connParameters.php';

$con = mysqli_connect($host, $userName, $password, $dbName);

if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con, $dbName);
$sql="select * from movies";
$result = mysqli_query($con, $sql);

echo "<option value='-1'>-- please select the movie --</option>";

while($row = mysqli_fetch_array($result)) {
    echo "<option value='" . $row['id'] . "'>" . $row['movieName'] . "</option>";
}

mysqli_close($con);
?>