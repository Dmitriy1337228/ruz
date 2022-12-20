<?php
require_once 'handler.php';

class TimetableTable extends handler {
	public function getTimetableTable ($group,$dateFrom,$dateTo) { 
		$groupOid = $this->getGroupOid($group);	
		$timetable = array (
			"09:20" => [],
			"11:10" => [],
			"13:45" => [],
			"15:35" => [],
			"17:20" => [],
		);
		$weekArray = $this->getWeek($groupOid, $dateFrom, $dateTo);
		$P1 = 0 ; $P2 = 0; $P3 = 0; $P3 = 0; $P4 = 0; $P5 = 0;
		$length  = $this->lessonSize($weekArray);
		for ($i=0; $i<$length; $i++) { 
		$lesson = $this->getLesson($weekArray,$i); 
			if ($lesson[1]=="09:20") {
				$timetable["09:20"][$P1++] = $lesson;
			} elseif ($lesson[1]=="11:10") {
				$timetable["11:10"][$P2++] = $lesson;
			} elseif ($lesson[1]=="13:45") {
				$timetable["13:45"][$P3++] = $lesson;
			} elseif ($lesson[1]=="15:35") {
				$timetable["15:35"][$P4++] = $lesson;
			} elseif ($lesson[1]=="17:20") {
				$timetable["17:20"][$P5++] = $lesson;
			} 
		}
		$timetable = json_encode($timetable, JSON_UNESCAPED_UNICODE);
		return $timetable;
	}
}
?>