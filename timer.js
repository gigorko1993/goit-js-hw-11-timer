export class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.element = this.getElements(selector);
    this.targetDate = targetDate;
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
    const formatingDate = value => {
      if (value === 0) {
        return "00";
      } else if (value < 10) {
        return "0" + value;
      }
      return value;
    };

    const calculateTime = time => {
      const day = formatingDate(Math.floor(time / (1000 * 60 * 60 * 24)));
      const hour = formatingDate(
        Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      );
      const min = formatingDate(
        Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
      );
      const sec = formatingDate(Math.floor((time % (1000 * 60)) / 1000));

      return { day, hour, min, sec };
    };
    return calculateTime(time);
  }

  elTimeTextChange() {
    const startingDate = this.convertTime(this.targetDate - new Date());

    this.element.dayEl.innerHTML = startingDate.day;
    this.element.hourEl.innerHTML = startingDate.hour;
    this.element.minEl.innerHTML = startingDate.min;
    this.element.secEl.innerHTML = startingDate.sec;
  }

  start() {
    const timerActivity = setInterval(() => {
      if (this.targetDate <= new Date()) {
        clearInterval(timerActivity);
        return;
      }

      this.elTimeTextChange();
    }, 1000);
  }
}

