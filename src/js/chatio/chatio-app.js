import PubSub from 'pubsub-js';
import utils from '../utils';
import timeago from 'timeago.js';
import 'jquery-slimscroll';

/* eslint-disable object-shorthand */

const chatioApp =
(function () {

  let userName = '';
  const modals = {
    chooseName: {
      show: function() { $('#modalChooseName').modal('show'); }, // eslint-disable-line object-shorthand
      hide: () => {
        $('#modalChooseName').modal('hide');
        $('input[name="message"]').focus();
      }
    }
  };

  // Socket.io
  const socket = window.io.connect();

  function addMessage(msg, name, date, isMe) {
    PubSub.publish('NewMessage', {
      message: msg,
      name: name,
      date: date,
      isMe: isMe
    });
  }

  function addName(name, callback) {
    if (!name) {
      callback(false /* isSuccess */);
    } else {
      socket.emit('SetName', name);
      socket.on('AddNameStatus', (data) => {
        if (data === 'ok') {
          callback(true /* isSuccess */);
          userName = name;
        } else {
          callback(false /* isSuccess */);
        }
      });
    }
  }

  socket.on('connect', () => {
    console.log('connected');
  });
  socket.on('UserListData', (data) => {
    console.log('UserListData: '+ JSON.stringify(data));
    PubSub.publish('UserListData', $.extend(data, { curUserName: userName }));
  });
  socket.on('Message', (data) => {
    addMessage(data.message, data.name, new Date().toISOString(), false);
  });

  socket.on('AmIConnected', (isConnected) => {
    if (!isConnected && userName) {
      console.log('Connection lost, attempting to re-connect');
      addName(userName, (isSuccess) => {
        console.log('Re-connected? '+ isSuccess);
      });
    }
  });


  /**
   * Public methods
   */
  return {

    modals: modals, // eslint-disable-line object-shorthand

    /**
     * Adds a connected user name to sever list
     * @param {string} name The user name
     * @param {function} callback(success)
              The function that is called after name added via io.socket
              {object} success: true if successful
     */
    addName: function(name, callback) {
      addName(name, (isSuccess) => {
        callback(isSuccess);
      });
    },

    /**
     * Sends a user's message to the server via io.socket
     * @param {string} message The user's message
     * @param {function} callback(success)
              The function that is called after message sent
              {object} success: true if successful
     */
    sendMessage: function(message, callback) {
      if (userName === '') {
        modals.chooseName.show();
        callback(false /* isSuccess */);
      } else {
        socket.emit('Message', message);
        callback(true /* isSuccess */);
      }
    },

    /**
     * Apply timeago plugin to all timestamps in chat box
     */
    timeAgo: function() {
      $('#chat-box time').each(function() {
        // $(this).text($.timeago($(this).attr('title')));
        $(this).text(timeago().format($(this).attr('title')));
      });
    },

    /**
     * Initialize the app data and app stock chart
     */
    init: function() {
      modals.chooseName.show();
      utils.timeout(1000, () => {
        $('input[name="name"]').focus();
      });

      $('#chat-box').slimScroll({ height: '400px' });

      // After every render of the chatbox, roll the scroll bar down
      PubSub.subscribe('ChatBoxRendered', (/* data */) => {
        console.log('ChatBoxRendered');
        $('#chat-box').slimScroll({ scrollTo: $('#chat-box')[0].scrollHeight });
      });

      // Run the jQuery.timeAgo plugin every 20 seconds
      setInterval(() => { chatioApp.timeAgo(); }, 20000);

      // Check if connection has been dropped (ie server reset)
      setInterval(() => {
        if (socket.connected) {
          socket.emit('AmIConnected', userName);
        }
      }, 10000);
    }
  };

}());

// $(() => {
//   chatioApp.init();
// });

export default chatioApp;
