/*
 *
 *
 */

define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {



  var MessageInfo = Backbone.Model.extend({

    defaults : {
      subject: "Contact Form From kaidez.com"
    }
    
  });

  var msg = new MessageInfo();
  console.log(msg.toJSON());




});