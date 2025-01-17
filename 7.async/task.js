class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.intervalId = null;
    }

    addClock(startTime, doAction) {
        if (!startTime || !doAction) {
            throw new Error('Отсутствуют обязательные аргументы');
        }

        if (this.alarmCollection.find(timer => timer.time === startTime)) {
            console.warn('Уже присутствует звонок на это же время');
        } 

        this.alarmCollection.push({callback: doAction, time: startTime, canCall: true});
    }

    removeClock(time) {
        this.alarmCollection = this.alarmCollection.filter(timer => timer.time !== time);
    }

    getCurrentFormattedTime() {
        return (new Date().toLocaleTimeString()).slice(0, 5);
    }

    start() {
        if (this.intervalId) {
            return;
        }

        this.intervalId = setInterval(() => {
            this.alarmCollection.forEach(timer => {
                if (timer.time === this.getCurrentFormattedTime() && timer.canCall) {
                    timer.canCall = false;
                    timer.callback();
                }
            });
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    resetAllCalls() {
        this.alarmCollection.forEach(timer => timer.canCall = true);
    }

    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }
}