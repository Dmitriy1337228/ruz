<?php
require_once 'TimetableTable.php';
$group = $_POST['group'];
$currDate = $_POST['currDate'];
$plusDate = $_POST['nextDate'];

$timetableList = new TimetableTable;
$timetable = $timetableList->getTimetableTable($group,$currDate,$plusDate);
echo $timetable;
?>