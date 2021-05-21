class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.element = this.getElements(selector);
    this.targetDate = targetDate;
    this.startCount();
    this.start();
  }

  getElements(elementId) {
    const ref = {
      dayEl: document.querySelector(`${elementId} [data-value="days"]`),
      hourEl: document.querySelector(`${elementId} [data-value="hours"]`),
      minEl: document.querySelector(`${elementId} [data-value="mins"]`),
      secEl: document.querySelector(`${elementId} [data-value="secs"]`),
    };

    return ref;
  }

  convertTime(time) {
    const formatingDate = function (value) {
      return String(value).padStart(2, "0");
    };

    const calculateTime = function (time) {
      const day = formatingDate(Math.floor(time / (1000 * 60 * 60 * 24)));
      const hour = formatingDate(
        Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      );
      const min = formatingDate(
        Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
      );
      const sec = formatingDate(Math.floor((time % (1000 * 60)) / 1000));

      return {day, hour, min, sec};
    };

    return calculateTime(time);
  }

  startVals() {
      const startingDate = this.convertTime(this.targetDate - new Date());
      
    this.element.dayEl.textContent = startingDate.day;
    this.element.hourEl.textContent = startingDate.hour;
    this.element.minEl.textContent = startingDate.min;
    this.element.secEl.textContent = startingDate.sec;
  }

  start() {
      const passedVal = "00";
      
    if (this.targetDate <= new Date()) {
      this.element.dayEl.textContent = passedVal;
      this.element.hourEl.textContent = passedVal;
      this.element.minEl.textContent = passedVal;
        this.element.secEl.textContent = passedVal;
        
      return;
    }

    this.startVals();
  }

  startCount() {
    const timerActivity = setInterval(() => {
      if (this.targetDate <= new Date()) {
        clearInterval(timerActivity);
        return;
      }

      this.startVals();
    }, 1000);
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jun 1, 2025"),
});
