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