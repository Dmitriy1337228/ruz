export var ruzCond = {
    isTable: false,
    canContinue: true,
	isValid: true,
	isEmpty: false,
}

async function getLessons (formData) {
    if (!ruzCond.isTable) {
        ruzCond.canContinue = false;
        let posts = await makeFetch('./handlerFolder/postList.php',formData);
		isEmpty(posts);
		if (!ruzCond.isEmpty) {
			fillRuzList(posts);
		} 
        ruzCond.canContinue = true;
    } else {
        ruzCond.canContinue = false;
        let posts = await makeFetch('./handlerFolder/postTable.php',formData);
		isEmpty(posts);
		if (!ruzCond.isEmpty) {
			drawRuzTable();
			fillRuzTable (posts);
		}
		ruzCond.canContinue = true;
    }
}

function isEmpty (posts) {
	for (let i=0; i<Object.entries(posts).length; i++) {
			if (Object.entries(posts)[i][1].length !=0) {
				ruzCond.isEmpty = false;
				return;
			}
		}
	ruzCond.isEmpty = true;	
	document.getElementById('flex-cont').innerHTML +='За данный период расписание не найдено';
}

async function makeFetch (url,formData) {
    let res= await fetch(url,{
        method: 'POST',
        body: formData
    });
    return await res.json();
}

function drawRuzTable () {
    document.getElementById('flex-cont').innerHTML += `
             <table id="table-ruz">
             <tr class="first-row">
                 <td class="first-row-cell">Время</td>
                 <td class="first-row-cell">Пн</td>
                 <td class="first-row-cell">Вт</td>
                 <td class="first-row-cell">Ср</td>
                 <td class="first-row-cell">Чт</td>  
                 <td class="first-row-cell">Пт</td>  
                 <td class="first-row-cell">Сб</td>     
             </tr>
            `;
    for (let i=1; i<6; i++) {
        document.getElementById('table-ruz').innerHTML += (`<tr id='${i}lesson'>` + "<td></td>".repeat(7) + "</tr>")
    }
}

function fillRuzTable (posts) {
    let i = 1;
        for (let [key,value] of Object.entries(posts)) {
            let td = document.querySelectorAll('tr')[i].getElementsByTagName('td');
            td[0].innerHTML += key;
            for (let j=0; j<value.length; j++) {
                if (value !== 'undefined') { // номер td определяется днем недели | нужна какая то проверка на пустые дни
					let inputString = `
						<b>${value[j][2]}</b><br>
                        ${value[j][0]}<br>
                        ${value[j][3]}<br>
					`;
					if (value[j][5] === null && value[j][8] === null ) {
						inputString+= `
						${value[j][7]}<br> 
						${value[j][6]}<br>
						`;
					} else if (value[j][5] === null) {
						inputString+= `
						${value[j][8]}<br> 
						${value[j][6]}<br>
						`;
					} else {
						inputString+= `
						${value[j][5]}<br> 
						${value[j][6]}<br>
						`;
					}
                    switch (value[j][4]) {
                        case 'Пн':
                            td[1].innerHTML += inputString;
                            break;
                        case 'Вт':
                            td[2].innerHTML += inputString;
                            break;
                        case 'Ср':
                            td[3].innerHTML += inputString;
                            break;
                        case 'Чт':
                            td[4].innerHTML += inputString;
                            break;
                        case 'Пт':
                            td[5].innerHTML += inputString;
                            break;
                        case 'Сб':
                            td[6].innerHTML += inputString;
                            break;                
                    }
                }
            }
        i++;
        }
}

function fillRuzList (posts) {
	console.log(Object.entries(posts));
	for (let [key,value] of Object.entries(posts)) {
			document.getElementById('flex-cont').innerHTML += `
				<div class="dayOfWeek">${key}</div>
			`;
			for (let i=0; i<value.length; i++) {
				if (value[i] !== 'undefined') {
					let inputString = `
					<div style="display:flex;">
					<div class="timeOfLesson">${value[i][1]}</div>
					<div class="lessonInfo">
						<b>${value[i][2]}</b><br>
						${value[i][0]}<br>
						${value[i][3]}<br>
					`;
					console.log(value[i][5]);
					if (value[i][5] === null && value[i][8] === null ) {
						inputString+= `
						${value[i][7]}<br> 
						${value[i][6]}<br>
						`;
					} else if (value[i][5] === null) {
						inputString+= `
						${value[i][8]}<br> 
						${value[i][6]}<br>
						`;
					} else {
						inputString+= `
						${value[i][5]}<br> 
						${value[i][6]}<br>
						`;
					}
					inputString += '</div></div><hr>';
					document.getElementById('flex-cont').innerHTML += inputString;
			}
		}
	}
}

export function showSearch () {
	let url = window.location.href;
	let isVisible=decodeURI(url).split('?')[1].split('=')[1];
	if (isVisible == 'Y') {
		document.getElementById('groupInput').style.display="inline-block";
		return true;
	} else {
		return false;
	}  
}

function getGroup () {
	const regex = new RegExp('^[А-Яа-я]{1,5}-\\d{2}[а,м]?-\\d{2}$','gm');
	if (!showSearch()) {
		let url = window.location.href;
		var group = decodeURI(url).split('?')[1];
	} else {
		var group = document.getElementById('groupInput').value;
	}
	if (!regex.test(group)) {
		console.log('Ой');
		ruzCond.isValid = false;
		document.getElementById('flex-cont').innerHTML = "Группа с таким названием не найдена";
		return;
	}
	ruzCond.isValid = true;
	clearScreen();
	return group;
	
}

export function getYYYYMMDDdate (date) { // date == 0 - дата понедельника текущей недели
    if (date == 0) {
        var currentDate = new Date();
    }  else {
        var currentDate = new Date(date);
    }  
 
    let dd = currentDate.getDate();
    if (date == 0) {
        if (currentDate.getDay() != 1) {
            currentDate.setDate(currentDate.getDate()-currentDate.getDay()+1);
            dd = currentDate.getDate(); 
        }
    }
    if (dd < 10) dd = '0' + dd;

    let mm = currentDate.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    let yy = currentDate.getFullYear();
    if (yy < 10) yy = '0' + yy;

    return yy+'.'+mm+'.'+dd;
}

function plusWeek (date) { // дата субботы  недели
    let currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 5);
    currentDate = getYYYYMMDDdate(currentDate);
    return currentDate;
}

export function renderWeek(date) { // render  неделю
	let group = getGroup();
	if (ruzCond.isValid) {
		if (date == 0) {
			var currentDate = getYYYYMMDDdate(0); // если 0 - получаем теущий понедельник
		} 
		else {
			var currentDate = getYYYYMMDDdate(date);
		}
		let plusWeekDate = plusWeek(currentDate);
		let formData = new FormData();
		console.log(group);
		formData.set('group',group);
		formData.set('currDate',currentDate);
		formData.set('nextDate',plusWeekDate);
		getLessons(formData).then(()=>{
			if (!ruzCond.isEmpty) {
				for (let i=0; i<6; i++) {
					let day = new Date(currentDate);
					day.setDate(day.getDate()+i);
					day = getYYYYMMDDdate(day);
					day = day.split(".");
					day = day[2]+"."+day[1];
					if (!ruzCond.isTable) {
						document.querySelectorAll('.dayOfWeek')[i].innerHTML += ` ${day}`;
					} else {
						document.querySelectorAll('.first-row-cell')[i+1].innerHTML += ` ${day}`;
					}
				}
			}
		});
	}
}

export function clearScreen() {
    document.getElementById('flex-cont').innerHTML = "";
}