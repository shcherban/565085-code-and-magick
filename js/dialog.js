'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var dialogHandle = setup.querySelector('.setup-user-pic + input');

  dialogHandle.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();
    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };
    var dragged = false;
    var documentMousemoveHandle = function (moveEvt) {
      dragged = true;
      moveEvt.preventDefault();
      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };
      setup.style.left = setup.offsetLeft + shift.x + 'px';
      setup.style.top = setup.offsetTop + shift.y + 'px';
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
    };
    var documentMouseupHandle = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', documentMousemoveHandle);
      document.removeEventListener('mouseup', documentMouseupHandle);
      if (dragged) {
        var dialogHandelClickPreventDefault = function (evt) {
          evt.preventDefault();
          dialogHandle.removeEventListener('click', dialogHandelClickPreventDefault);
        };
        dialogHandle.addEventListener('click', dialogHandelClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', documentMousemoveHandle);
    document.addEventListener('mouseup', documentMouseupHandle);
  });

})();
