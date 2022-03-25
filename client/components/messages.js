
export class Messages {
  constructor(selector) {
    this.node = document.querySelector(selector);
  }

  append(username, message) {
    this.node_2 = document.querySelector('.username');
    if(username == "system")
      this.node.innerHTML += `<div style="width: 100%"> <div class="message-card" style="background: #5FBDCE; border-top-left-radius: 0px;"><div class="name-user" style="color:white;">${username}</div><div class="message">${message}</div></div></div>`;
    else
    if(this.node_2.innerHTML != username)
      this.node.innerHTML += `<div style="width: 100%"> <div class="message-card" style="border-top-left-radius: 0px; border: 1px solid rgba(45,46,47,0.2);"><div class="name-user">${username}</div><div class="message">${message}</div></div></div>`;
    else
      this.node.innerHTML += `<div style="width: 100%; display: flex; justify-content: flex-end;"><div class="message-card" style="border-top-right-radius: 0px; background: #4D426D; color:#ffffff"><div class="name-user">${username}</div><div class="message" style="text-align: right;">${message}</div></div></div>`;
    
  }

  appendSystem(message) {
    this.append('system', message);
  }

  clear() {
    this.node.innerHTML = '';
  }
}
