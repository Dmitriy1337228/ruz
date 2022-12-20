<?php
require_once 'handler.php';

class TimetableList extends handler {
	public function getTimetableList ($group,$dateFrom,$dateTo) {
		$groupOid = $this->getGroupOid($group);	
        $timetable = array (
            "Пн" => [],
            "Вт" => [],
            "Ср" => [],
            "Чт" => [],
            "Пт" => [],
            "Сб" => [], 
        );
        $weekArray = $this->getWeek($groupOid, $dateFrom, $dateTo);
        $Pn = 0 ; $Vt = 0; $Sr = 0; $Ch = 0; $Pt = 0; $Sb = 0;
		$length  = $this->lessonSize($weekArray);
        for ($i=0; $i<$length; $i++) { 
        $lesson = $this->getLesson($weekArray,$i); 
            if ($lesson[4]=="Пн") {
                $timetable["Пн"][$Pn++] = $lesson;
            } elseif ($lesson[4]=="Вт") {
                $timetable["Вт"][$Vt++] = $lesson;
            } elseif ($lesson[4]=="Ср") {
                $timetable["Ср"][$Sr++] = $lesson;
            } elseif ($lesson[4]=="Чт") {
                $timetable["Чт"][$Ch++] = $lesson;
            } elseif ($lesson[4]=="Пт") {
                $timetable["Пт"][$Pt++] = $lesson;
            } elseif ($lesson[4]=="Сб") {
                $timetable["Сб"][$Sb++] = $lesson;
            }
        }
        $timetable = json_encode($timetable, JSON_UNESCAPED_UNICODE);
        return $timetable;
    }
}
?>