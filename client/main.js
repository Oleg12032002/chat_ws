import {UserName} from './components/user-name.js';
import {Socket} from './components/socket.js';
import {Messages} from './components/messages.js';
import {MessageForm} from './components/message-form.js';
import {TypingStatus} from './components/typing-status.js';
import {RoomForm} from './components/room-form.js';
import {Rooms} from './components/rooms.js';

document.addEventListener('DOMContentLoaded', () => {
  const socket = new Socket();
  const userName = new UserName('#username');
  const messages = new Messages('#messages');
  const messageForm = new MessageForm('#messageForm');
  const typingStatus = new TypingStatus('#typingStatus');
  const roomForm = new RoomForm('#room');
  const rooms = new Rooms('#collection-rooms');

  document.querySelector('#collection-rooms').addEventListener('click', e => {
    e.preventDefault();
    if(e.target.className == 'img-room') {
      socket.emitRoomChange( e.target.parentElement.parentElement.querySelector('.room-name').innerHTML );
    } else
    if(e.target.className == 'room-name') {
      socket.emitRoomChange( e.target.parentElement.querySelector('.room-name').innerHTML );
    } else
      socket.emitRoomChange( e.target.querySelector('.room-name').innerHTML );
  });


  socket.onNameAssigned(username => {
    userName.render(username);
    messages.appendSystem(`<b>${username}</b> assigned to you.`);
  });

  socket.onUserJoined(username => {
    messages.appendSystem(`<b>${username}</b> joined.`);
  });

  socket.onUserLeft(username => {
    messages.appendSystem(`<b>${username}</b> left.`);
  });

  socket.onChatMessage( ( { username, message } ) => {
    messages.append(username, message);
    typingStatus.removeTypingUser(username);
  });

  socket.onUserTyping( username => {
    typingStatus.addTypingUser(username);
  });

  messageForm.onSubmit( message => {
    socket.emitChatMessage(message);
  });

  messageForm.onKeypress( () => {
    socket.emitUserTyping();
  });

  rooms.render();

  roomForm.onSubmit( room => {
    socket.emitRoomChange(room);
  });

  socket.onRoomChanged( room => {
    rooms.add(room);
    rooms.select(room);
    rooms.render();
    messages.clear();
  });

  


});
