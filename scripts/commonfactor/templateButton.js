// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

goog.provide('asiker.commonFactor');

goog.require('soy');
goog.require('soy.StringBuilder');


asiker.commonFactor.createButton = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t', (! opt_data.valor) ? '<input type="button"  value="hola" />' : '<input type="button"  onclick="alert(\'hola\');" value="' + soy.$$escapeHtml(opt_data.valor) + '" />');
  return opt_sb ? '' : output.toString();
};
