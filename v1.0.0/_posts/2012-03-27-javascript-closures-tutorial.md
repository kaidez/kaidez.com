---
title: 'TUTORIAL: What NYC Subways Can Teach Us About JavaScript Closures'
comments: true
author: Kai Gittens
layout: post
meta-excerpt: JavaScript closures tutorial using the New York City subway to explain how they work. With demo, code samples and short reading list.
permalink: /javascript-closures-tutorial/
category: tutorials
cat-name: "Tutorials"
has-thumbnail: subwayMap.png
tags: [javascript, beginner, tute]
---

[VIEW THE DEMO FIRST »][1]


 [1]: http://jsfiddle.net/kaidez/KypGQ/

JavaScript doesn’t fit the strict definition of an object-oriented programming language, but it fits well enough so that you can use it to do object-oriented stuff. Closures play a big role here so understanding how they work is important.

## Encapsulation

First, understand a programming concept called *encapsulation* and understand that it has two roles:

*   Encapsulation hides your code from the web browser’s global space until the global space actually needs it, a top-notch JavaScript best practice.
*   It organizes your code quite nicely.

You encapsulate variables and functions for the most part, and do so by placing them inside another function. Encapsulated variables are called *private variables* while encapsulated functions are called *methods*.

A private variable is not directly visible by the world outside of the encapsulating function. Encapsulated methods, however, act a little differently:

*   An encapsulated method that returns something is called *public method* because whatever it returns, it returns to the global space. This means that other parts of your code can access it *if you tell your code to do so*.
*   A public method is also a *privileged method*. This is because it has “privileged” access to any variables and methods that it’s encapsulated with.
*   An encapsulated method can also be a *private method* if it doesn’t return anything that doesn’t return a specific value we give it (meaning that it will still return `undefined`). Despite this, always remember that it’s doing something…that’s the point of functions, isn’t it? Maybe it’s doing something as simple as sending out an alert, but it’s doing *something*. And if it’s encapsulated with a public method, the public method can take whatever the private method is doing and send out to the global space.

The stricter object-oriented languages like C# and Java have syntax to create private, public and privileged code, but JavaScript does not. JavaScript can still create such code, and it can still be accessed if it’s private.

*In JavaScript, accessing private, encapsulated code from the outside is done with closures.*

Obviously, closures can be tough to understand at first, but understanding them is a must if you want to master JavaScript. So, I’m going to try to help here.

A little parable about the New York City subway may help...

## The Subway Story

Of all the subway systems in the world, New York City’s is the most famous. It averages 10 million rides a week and is made up of 421 subway stations.

The NYC subway has 24 lines, each traveling through four of the city’s five boroughs: Manhattan, Brooklyn, Queens and the Bronx (sorry Staten Island). So for example: the L line travels from 8th Avenue in Manhattan to Canarsie in Brooklyn, the 6 train travels from Pelham Bay Park in the Bronx to Manhattan’s Wall Street neighborhood, and so on.

There is no borough that all of these lines run through: every borough has a line that doesn’t run through it. And in the case of Manhattan, the busiest borough, that line is the G line that, as of this article, runs from Long Island City in Queens to the Kensington neighborhood in Brooklyn.

The only way to get to “the G” from Manhattan is to take another subway line to a connecting station where the G stops, then transfer over. The G has many connecting stations that you can get to from Manhattan. A few options are:

*   Someone catching the E train at its 14th Street Manhattan stop can take it to its Court Square Queens stop and catch the G.
*   Someone catching the F train at its 2nd Avenue Manhattan stop can take it its to Fort Hamilton Parkway Brooklyn stop and catch the G.
*   Someone catching the N train at its 34th Street Manhattan stop can take it to its 4th Avenue Brooklyn stop and catch the G.

A more direct line between Manhattan and the neighborhoods that the G runs along would be great, but impossible. Strictly speaking, Manhattan can’t see the G line so it can’t access it directly.

## The Simple Subway Closure Examples

Now…how does all of this subway stuff tie in with closures?

* Think of the G line as a private variable encapsulated by a function named `brooklyn`.
* All those stops along the G, like Court Square? Think of them as both public and privileged methods: they’re public because things outside of the `brooklyn` function can access them, but they’re also privileged because they’re inside the `brooklyn` function and have access to the private variable, the G line.
* Since the only way to get to the G is via one the connecting lines, think of the connecting lines as closures.

Let’s start with small examples that will build up to the big one. I’ll be running these simple examples in Firebug Console for Firefox.

***IMPORTANT: Every time you run a new block of code in the Console, you must do it in a new browser tab.***

Cut-and-paste the code below in to the Console and run it:

{% prism javascript %}
var GLine = "You have connected to the G line!";
alert(GLine); //alert popup appears!
{% endprism %}


All works fine...we get an alert popup that says “You have connected to the G line!”

Now, **open up a new tab** and plug this code in the console and run it:

{% prism javascript %} 
function brooklyn() {
  var GLine = "You have connected to the G line!";
}
    
alert(GLine); //Oops! The alert doesn't show!
{% endprism %}   

The console now returns a message that the `GLine` is not defined. This because `GLine` is now a private variable wrapped inside the `brooklyn` function, meaning the outside world can’t see it. And since our alert lives in the outside world, it’s giving us this error.

A closure named `connectingLine` can help us here. **Open up a new tab again** and run this code in the console.

{% prism javascript %} 
function brooklyn() {
  var GLine = "You have connected to the G line!";
  return function() {
    alert(GLine);
  };
}

var connectingLine = brooklyn();
connectingLine(); //alert popup appears!
{% endprism %} 

And with that, the alert now pops up…let’s break down why:

The `brooklyn` function now contains the not only the `GLine` private variable, but also an inner function. This inner function is a public method that’s also a privileged method.

As a public method, the function returns whatever it does to the world outside of `brooklyn`, which is our alert from the earlier examples. And as a privileged method, the function has access to the `GLine` private variable that it’s encapsulated with, which is the alert message.

Our closure, `connectingLine`, has the power to find what the public/privileged method returns to the world outside of `brooklyn`. And again, what it returns is an alert that displays the value of `GLine`.

## The Difficult Subway Closure Example

We started with alerts for the sake of easy explanation-now let’s create something more complicated with a private method:

### HTML for the difficult closure example

{% prism markup %}
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="utf-8">
 <title>The NYC subway can teach you about closures!</title>
</head>
<body>
<ul>
 <li><a href="#" id="eTrain">Catch the G train by taking the E Train</a></li>
 <li><a href="#" id="fTrain">Catch the G train by taking the F Train</a></li>
 <li><a href="#" id="nTrain">Catch the G train by taking the N Train</a></li>
</ul>
 
<div id="myRoute"></div>
 
<script src="http://code.jquery.com/jquery-1.7.2.js"></script>
<script src="scripts.js"></script>
</body>
</html>
{% endprism %}
    
[2]: # Our simple HTML5-formatted page has three links, each with unique page ID. Using jQuery (note the jQuery core library is attached), our links will run the our JavaScript when clicked. Our JavaScript code will go in the `scripts.js` file.

### JavaScript for the difficult closure example (scripts.js)
{% prism javascript %}
(function() {

  var brooklyn, connectWithETrain, connectWithFTrain, connectWithNTrain;
    
  brooklyn = function() {
    var GLine = 'G line!';
    function howToGetThere(trainLine,startingStation,endingStation) {
      $('#myRoute').html('Catch the ' + trainLine + ' at the ' +   startingStation  + ' station. Take it to ' + endingStation + ' station   and get off to catch the ' + GLine);
    }
    return {
      ETrain: function() {
        howToGetThere('E train','14th Street, Manhattan','Court Square');
      },
      FTrain: function() {
        howToGetThere('F train','2nd Avenue Manhattan','Fort Hamilton Parkway');
      },
      NTrain: function() {
        howToGetThere('N train','34th Street Manhattan','4th Avenue');
      }
    };
  };
    
  connectWithETrain = brooklyn();
  connectWithFTrain = brooklyn();
  connectWithNTrain = brooklyn();
    
  $('#eTrain').click(function () {
    return connectWithETrain.ETrain();
  });
    
  $('#fTrain').click(function () {
    return connectWithFTrain.FTrain();
  });
    
  $('#nTrain').click(function () {
    return connectWithNTrain.NTrain();
  });
})(); 
{% endprism %}

Let’s break this code down:
{% prism javascript %}  
(function() {
...
})();
{% endprism %}    

This is a lot of code and we don’t want it in the global space as that can screw things up, so we’re wrapping it in a *self-executing anonymous function* (it has other names, but I like this one).

This means that we wrap all this code up in an unnamed function: note that there’s no name between `function` and `()` on the first line. The code ends with another `()` on the last line which makes the function run, or “self-execute.”

And a little piece of trivia: the code for the jQuery core library is wrapped up in a self-executing anonymous function. This type of function has been around for a while, but jQuery’s usage of it has increased its popularity with developers.

{% prism javascript %} 
var brooklyn, connectWithETrain, connectWithFTrain, connectWithNTrain;
{% endprism %}

These are variables that we’re going to use at some point in our code. We’re naming them but not initializing them by giving them a value (although you should if possible).

We’re creating them using the *single var pattern*, meaning that we group all of our variables together with one `var` keyword and comma-separate them. This keeps our variables organized and easy to find, and since ***JavaScript moves variables to the top of functions anyway***, we might as well do it ourselves.
{% prism javascript %} 
brooklyn = function() {
  ...
};
{% endprism %}   

Our `brooklyn` function has returned…only this time, it’s not a function. Remember, we declared it as a variable in the beginning.

This `brooklyn` variable is now equal to another anonymous function that encapsulates a lot of code.
{% prism javascript %}  
var GLine = 'G line!';
function howToGetThere(trainLine,startingStation,endingStation) {
  $('#myRoute').html('Catch the ' + trainLine + ' at the ' +   startingStation  + ' station. Take it to ' + endingStation + ' station   and get off to catch the ' + GLine);
}
{% endprism %}  

Our `GLine` private variable is still here and it’s still a text string, but it’s shorter than the earlier versions. `GLine` is joined by a private method called `howToGetThere()`.

A reminder: a private method is method that doesn’t return anything that returns no other value than `undefined` but does something. And as we can see, this describes `howToGetThere()` perfectly.

And what’s `howToGetThere()` “doing?” It’s using jQuery to look for the `myRoute` ID on our HTML page, then load a text string into it with the jQuery’s `.html()` function (*FYI: `.html()` is actually a jQuery method!*)

The `howToGetThere` method also has parameters that will be passed into the text string: `trainLine`, `startingStation` and `endingStation`. They will represent, respectively, the name of the train line to catch, where in Manhattan to catch it and where to get off to catch the G Line. The `GLine` variable will be passed to the text string as well.

The `howToGetThere` private method is going to run when a link is clicked, but we have a few more things to do first, code-wise.

{% prism javascript %}  
return {
ETrain: function() {
  howToGetThere('E train','14th Street, Manhattan','Court Square');
},
FTrain: function() {
  howToGetThere('F train','2nd Avenue Manhattan','Fort Hamilton Parkway');
},
NTrain: function() {
  howToGetThere('N train','34th Street Manhattan','4th Avenue');
}
{% endprism %}  
    

Here are three public methods: `ETrain`, `FTrain` and `NTrain`. They all have access to the `howToGetThere` private method and are written out using something called the *[module pattern][3]*.

 [3]: http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript

Each of these methods runs the `howToGetThere` private method, returning the parameters we discussed earlier. Again, `howToGetThere` will run when a page link is clicked but before we talk about that, we have to set up our closures first.

{% prism javascript %} 
connectWithETrain = brooklyn();
connectWithFTrain = brooklyn();
connectWithNTrain = brooklyn();
{% endprism %}
    

Here are the closures. They’re actually the variable names we created at the top of our code with the single var pattern-we’ve just now given them a value.

The value of each closure is the `brooklyn()` function, meaning it can access the public methods. It will do this with links, which we’ll now set up.

{% prism javascript %}
$('#eTrain').click(function () {
  return connectWithETrain.ETrain();
});
    
$('#fTrain').click(function () {
  return connectWithFTrain.FTrain();
});
    
$('#nTrain').click(function () {
  return connectWithNTrain.NTrain();
});
{% endprism %}
    

Every time one of our three page links is clicked, jQuery’s `.click()` method runs a callback function. This function then runs one of our three public methods, which in turn, runs the `howToGetThere()` private method.

This means that a text string will load into the `myRoute` page ID when a link is clicked. The parameters defined with the public methods decide what the text string will say.

That’s it for the code. I hope it helps but am sure you want to read up more on the subject. These articles may help.

## Further Reading

### [MDN Closure Article »][4]

 [4]: https://developer.mozilla.org/en/JavaScript/Guide/Closures

The Mozilla Developer Network’s excellent post on closures is your first stop. Take note of the potential performance issues mentioned at the end.

### [*Why use “closure”?* by Tim Caswell »][5]

 [5]: http://howtonode.org/why-use-closure

Another excellent article by this California-based developer. His closure examples also use factory patterns and `Object.prototype`.

### [Stuart Langridge: Secrets of JavaScript Closures (video) »][6]

 [6]: http://vimeo.com/1967261

Hilarious presentation from this UK-based developer.

### [meta-excerpt from John Resig’s Upcoming Book, *Secrets of the JavaScript Ninja* »][7]

 [7]: http://www.manning.com/free/meta-excerpt_resig.html

jQuery creator John Resig has written extensively on JavaScript closures. This sample content about closures from his upcoming book is, I think, his most in-depth article on the subject. It’s probably the toughest read on this list, but a great read nonetheless. Registration is required.

## Conclusion

Closures are tough to understand in the beginning, I don’t deny it. But they’re useful as hell and make your JavaScript super-efficient. Re-read this article if you need to, check out the articles on the reading list and hit me up if you have questions.