<?php
require_once 'TimetableList.php';
$group = $_POST['group'];
$currDate = $_POST['currDate'];
$plusDate = $_POST['nextDate'];

$timetableList = new TimetableList;
$timetable = $timetableList->getTimetableList($group,$currDate,$plusDate);
echo $timetable;
?>