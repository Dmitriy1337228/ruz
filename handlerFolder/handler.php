<?php
class handler {

    private function makecURL ($URL) {
        $curl = curl_init();
        curl_setopt ($curl, CURLOPT_URL, $URL);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec ($curl);
		$info = curl_getinfo($curl);
		$f = fopen('time.log', 'a');
		fwrite($f, $info['total_time'] . $info['url'] . PHP_EOL);
		fclose($f);
        curl_close ($curl);
        $resultArray=(json_decode($result, true));
        return $resultArray;
    }

    protected function getGroupOid ($group) { 
        $URL = "http://10.1.1.47/RUZService/RUZservice.svc/subgroups"; // быстро
        $resultArray = $this->makecURL($URL);
        $key = array_search($group,array_column($resultArray,'group'));
		if ($key == 0) {
			$URL = "http://10.1.1.47/RUZService/RUZservice.svc/groups"; // медленно | ! ЗДЕСЬ ДОБАВИТЬ ПОИСК ИЗ МАССИВА-КОНСТАНТЫ ПО ПЕРВЫМ ДВУМ БУКВАМ НАЗВАНИЯ ГРУППЫ  ЗНАЧЕНИЯ facultyOid
			$resultArray = $this->makecURL($URL);
			$key = array_search($group,array_column($resultArray,'name'));
		}
        $groupOidArray = array_column($resultArray,'groupOid');
        $groupOid = $groupOidArray[$key];
        return $groupOid;
    }

    protected function lessonSize ($weekArray) {
        return count($weekArray);
    }

    protected function getWeek ($groupOid, $dateFrom, $dateTo) { // возвращает массив пар на неделю 
        $URL ="http://10.1.1.47/RUZService/RUZservice.svc/lessons?fromdate=".$dateFrom."&todate=".$dateTo."&&groupoid=".$groupOid;
        $weekArray = $this->makecURL($URL);
        return $weekArray;  
    }

    protected function getLesson ($weekArray,$lessonIndex) {  // получить конкретную пару из weekArray
        $lesson=[];
        array_push(
			$lesson,
			$weekArray[$lessonIndex]["auditorium"],
			$weekArray[$lessonIndex]["beginLesson"],$weekArray[$lessonIndex]["discipline"],
			$weekArray[$lessonIndex]["lecturer"],
			$weekArray[$lessonIndex]["dayOfWeekString"],
			$weekArray[$lessonIndex]["group"],
			$weekArray[$lessonIndex]["kindOfWork"],
			$weekArray[$lessonIndex]["stream"],
			$weekArray[$lessonIndex]["subGroup"]
		);
        return $lesson;
    }
}
?>