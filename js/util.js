'use strict';

(function () {

  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;
  window.util = {
    isEnterKeyCode: function (keyCode) {
      return keyCode === ENTER_KEY_CODE;
    },
    isEscapeKeyCode: function (keyCode) {
      return keyCode === ESCAPE_KEY_CODE;
    },

    getRandomElement: function (elements) {
      var randomIndex = Math.round(Math.random() * (elements.length - 1));
      return elements[randomIndex];
    }
  };

})();
