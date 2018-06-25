<?php
include 'connParameters.php';

$con = mysqli_connect($host, $userName, $password, $dbName);

if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con, $dbName);
$sql="select * from genres";
$result = mysqli_query($con, $sql);



while($row = mysqli_fetch_array($result)) {
    if ($_GET["id"] == $row['genreId'])
        echo "<option selected='selected' value='" . $row['genreId'] . "'>" . $row['genreName'] . "</option>";
    else
        echo "<option value='" . $row['genreId'] . "'>" . $row['genreName'] . "</option>";
}

mysqli_close($con);
?>