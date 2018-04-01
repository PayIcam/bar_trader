<?php

session_start(); 

$_SESSION['val0'] += rand(0,1);
$_SESSION['val1'] += rand(0,1);
$_SESSION['val2'] += rand(0,1);
$_SESSION['val3'] += rand(0,1);
$_SESSION['val4'] += rand(0,1);
$_SESSION['val5'] += rand(0,1);
$_SESSION['val6'] += rand(0,1);
$_SESSION['val7'] += rand(0,1);
$_SESSION['val8'] += rand(0,1);
$_SESSION['val9'] += rand(0,1);
$_SESSION['val10'] += rand(0,1);
$_SESSION['val11'] += rand(0,1);

$ar1 = array($_SESSION['val0'], $_SESSION['val1'], $_SESSION['val2'], $_SESSION['val3'], $_SESSION['val4'], $_SESSION['val5'], $_SESSION['val6'], $_SESSION['val7'], $_SESSION['val8'], $_SESSION['val9'], $_SESSION['val10'], $_SESSION['val11']);
$ar2 = array(43,8,4,31,360,721,32,258,541,22,19,534);

array_multisort($ar1, $ar2);

header("Content-Type: text/xml");
echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>";

echo "<root>";

for($i = 0; $i < 12; $i++){
	echo "<row id='" . $ar2[$i] . "' nombre_vendu='" . $ar1[$i] . "' />";
}

echo "</root>";