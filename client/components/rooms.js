export class Rooms {
  constructor(selector) {
    this.node = document.querySelector(selector);
    this.rooms = ['general'];
    this.activeRoom = 'general';
  }

  render() {
    this.node.innerHTML = this.rooms
      .map(this.renderRoom)
      .join('\n');
  }

  renderRoom = room => (
    this.activeRoom === room ?
      `<div class="room-card active-room" style="background: gray;"><div style="height: 60px;"><img class="img-room" src="https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 60)}"></div><div class="room-name">${room}</div></div>` :
      `<div class="room-card"><div style="height: 60px;"><img class="img-room" src="https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 60)}"></div><div class="room-name">${room}</div></div>`
  );

  add(room) {
    if (this.rooms.includes(room)) {
      return;
    }

    this.rooms.push(room);
  }

  select(room) {
    this.activeRoom = room;
  }
}
