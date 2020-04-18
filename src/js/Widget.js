/* eslint-disable class-methods-use-this */
export default class Widget {
  constructor(url) {
    this.url = url;
  }

  init() {
    this.createWidget();
    this.widgetField = document.querySelector('.widget-field');
    this.addEventListeners();
  }

  createWidget() {
    const newWidget = document.createElement('div');
    newWidget.id = 'widget';
    newWidget.innerHTML = `
      <ul class="widget-field">
      </ul>
    `;
    document.body.appendChild(newWidget);
  }

  pushMessage(message) {
    const {
      field, msg, date, id,
    } = JSON.parse(message);
    this.newMessage = document.createElement('li');
    this.newMessage.className = 'message';
    this.newMessage.dataset.id = id;
    this.newMessage.innerHTML = `
    <span class="${field} img-action"></span>
    <div class="message-container">
    <span class="current-date">${this.showDate(date)}</span>
    <p class="current-message">${msg}</p>
    </div>
    `;
    this.widgetField.appendChild(this.newMessage);
  }

  addEventListeners() {
    const eventSource = new EventSource(this.url);

    eventSource.addEventListener('open', () => {
      console.log('connected');
    });

    eventSource.addEventListener('error', () => {
      console.log('error');
    });

    eventSource.addEventListener('comment', (evt) => {
      this.pushMessage(evt.data);
    });
  }

  showDate(newDate) {
    const currentDate = new Date(newDate);
    const day = this.formatDate(currentDate.getDate());
    const month = this.formatDate(currentDate.getMonth() + 1);
    const year = this.formatDate(currentDate.getFullYear());
    const hour = this.formatDate(currentDate.getHours());
    const min = this.formatDate(currentDate.getMinutes());
    const sec = this.formatDate(currentDate.getSeconds());

    return `${hour}:${min}:${sec} ${day}.${month}.${year}`;
  }

  formatDate(value) {
    return value < 10 ? `0${value}` : value;
  }
}
