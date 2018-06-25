<?php
include 'connParameters.php';

$con = mysqli_connect($host, $userName, $password, $dbName);

if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con, $dbName);
$sql="select * from movies where id=" . $_GET["id"];
$result = mysqli_query($con, $sql);

header("Content-type: text/xml; charset=utf-8");

$response = '<?xml version="1.0" encoding="utf-8"?>';

while($row = mysqli_fetch_array($result)) {
    $response = $response . '<movie>';
    $response = $response . '<id>' . $row['id'] . '</id>';
    $response = $response . '<movieName>' . $row['movieName'] . '</movieName>';
    $response = $response . '<genreId>' . $row['genreId'] . '</genreId>';
    $response = $response . '</movie>';
}

echo $response;

mysqli_close($con);
?>