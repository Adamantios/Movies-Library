<?php
include 'connParameters.php';

$con = mysqli_connect($host, $userName, $password, $dbName);

if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con, $dbName);
$sql="select t1.id, t1.movieName, t2.genreName " . 
        "from movies t1 join genres t2 on t1.genreId = t2.genreId;";
$result = mysqli_query($con, $sql);

echo '<h2>Movies List</h2>';
echo "<table class='moviesTable'>
          <tr>
              <td>ID</td>
              <td>Movie Title</td>
              <td>Genre</td>
          </tr>";

while($row = mysqli_fetch_array($result)) {
  echo "<tr>";
  echo "<td>" . $row['id'] . "</td>";
  echo "<td>" . $row['movieName'] . "</td>";
  echo "<td>" . $row['genreName'] . "</td>";
  echo "</tr>";
}
echo "</table>";

mysqli_close($con);
?>