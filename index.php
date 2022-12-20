<?php
/*$curl = curl_init();
curl_setopt ($curl, CURLOPT_URL, "http://10.1.1.47/RUZService/RUZservice.svc/lessons?fromdate=2022.10.17&todate=2022.10.22&&groupoid=14686");
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

$result = curl_exec ($curl);
curl_close ($curl);
$resultArray=(json_decode($result, true));
print_r($resultArray[12]);*/
?>
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Test</title>
    <link rel="stylesheet" href="./styles.css">
    <!--<script type="text/javascript" src="./bitrix.js"></script>-->
    <script type="module" src="./main.js"></script>
    <script type="module" src="./scripts/ruzLib.js"></script>
  </head>
  <body>
	<input id="groupInput" placeholder="Группа" style="display:none"></input>
    <button id="groupButton" type="button">Список</button>
    <button  id="TableButton" type="button">Таблица</button>
	<div class="but-cont">
		<button id="Prev" type="button"></button>
	</div>
	<div class="but-cont">
		<button id="Next" type="button"></button>
	</div>
  <div class="rasp-cont" id="rasp-cont">
    <div class="flex-cont" id="flex-cont"></div>
  </div>
  </body>  
</html>