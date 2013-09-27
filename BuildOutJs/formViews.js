/*
 *
 *
 */

define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

  // can this code be used for form validation? check out the Backbone and
  // see: http://addyosmani.github.io/backbone-fundamentals/#validation

  var MessageInfo = Backbone.Model.extend({

    defaults : {
      subject: "Contact Form From kaidez.com"
    }

  });

  var msg = new MessageInfo();
  console.log(msg.toJSON());




});