import * as lib from './scripts/ruzLib.js';

window.onload = function () {
    let currentMonday = lib.getYYYYMMDDdate(0);
    let groupButton = document.getElementById('groupButton');
    let nextButton = document.getElementById('Next');
    let prevButton = document.getElementById('Prev');
    let tableButton = document.getElementById('TableButton');

	if (!lib.showSearch()) {
		lib.ruzCond.isTable = false;
		lib.clearScreen();
		lib.renderWeek(currentMonday);
	}
	// onclick handlers
    groupButton.onclick = function () {
		if (lib.ruzCond.canContinue) {
			lib.ruzCond.isTable = false;
			lib.clearScreen();
			lib.renderWeek(currentMonday);
		}
    }

    nextButton.onclick = function () {  // inc текущий понедельник 
        if (lib.ruzCond.canContinue) {
            currentMonday = new Date(currentMonday);
            currentMonday.setDate(currentMonday.getDate()+7);
            currentMonday = lib.getYYYYMMDDdate(currentMonday);
            currentMonday = new Date(currentMonday);

            lib.clearScreen();
            lib.renderWeek(currentMonday);
        }
    }

    prevButton.onclick = function () { // dec текущий понедельник
        if (lib.ruzCond.canContinue) {
            currentMonday = new Date(currentMonday);
            currentMonday.setDate(currentMonday.getDate()-7);
            currentMonday = lib.getYYYYMMDDdate(currentMonday);
            currentMonday = new Date(currentMonday);

            lib.clearScreen();
            lib.renderWeek(currentMonday);
        }
    }

    tableButton.onclick = function () {
		if (lib.ruzCond.canContinue) {
			lib.ruzCond.isTable = true;
			lib.clearScreen();
			lib.renderWeek(currentMonday);
		}
    }

}