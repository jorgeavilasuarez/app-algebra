goog.provide('myproject.start');

goog.require('goog.dom');
goog.require('goog.ui.Dialog');

myproject.start = function() {
  var newDiv = goog.dom.createDom('h1', {'style': 'background-color:#EEE'},
    'Hello world!');
	var test = $("div");
	alert(test);
  goog.dom.appendChild(document.body, newDiv);
};

// Ensures the symbol will be visible after compiler renaming.
goog.exportSymbol('myproject.start', myproject.start);