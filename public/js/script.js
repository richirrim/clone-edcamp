"use strict";

var toggleMenu = function toggleMenu(menuId, toggleId) {
  var menuEl = document.getElementById(menuId);
  var toggleEl = document.getElementById(toggleId);

  if (menuEl && toggleEl) {
    toggleEl.addEventListener('click', function () {
      menuEl.classList.toggle('showMenu');
    });
  } else {
    console.warn('Alguno de los elementos no existen en el HTML 👀');
  }
};

toggleMenu('js-menu', 'js-menu-icon');