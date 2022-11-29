"use strict";

var preferedColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
var switchTheme = document.getElementById('themeApp');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}