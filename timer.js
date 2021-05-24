export class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.element = this.getElements(selector);
    this.targetDate = targetDate;
    this.start();
  }

  getElements(elementId) {
    const timerEl = document.querySelector(`${elementId}`);
    const dayEl = timerEl.querySelectorAll(`[data-value="days"]`);
    const hourEl = timerEl.querySelectorAll(`[data-value="hours"]`);
    const minEl = timerEl.querySelectorAll(`[data-value="mins"]`);
    const secEl = timerEl.querySelectorAll(`[data-value="secs"]`);
    return { dayEl, hourEl, minEl, secEl };
  }

  convertTime(time) {
    const formatingDate = value => {
      if (value < 10) {
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

    this.element.dayEl.forEach(el => (el.textContent = startingDate.day));
    this.element.hourEl.forEach(el => (el.textContent = startingDate.hour));
    this.element.minEl.forEach(el => (el.textContent = startingDate.min));
    this.element.secEl.forEach(el => (el.textContent = startingDate.sec));
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
