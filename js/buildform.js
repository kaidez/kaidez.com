/*
 * 
 */

define(function() {
  
  var loadMenu, cssdisabled, testcss, currstyle; // 4 variables global to this RequireJS module only. 

  /*  
   *  Dynamically create a form that looks like this:
   *
   *  <form action="/search.html" id="js-searchbox">
   *    <input type="text" name="q" id="tipue_search_input"
   *     placeholder="Search for JavaScript, HTML5, etc">
   *    <input type="submit" id="tipue_search_button" value="Search">
   *  </form>
   */
  loadMenu = function() {
    var loadBox = document.getElementById("searchbox"),
      frag = document.createDocumentFragment(),
      form = document.createElement("form"),
      searchTextBox = document.createElement("input"),
      searchButton = document.createElement("input");
    
    // set attributes for form
    form.action = "/search.html";
    form.id = "js-searchbox";

    // set attributes for Search text box
    searchTextBox.type = "text";
    searchTextBox.name = "q";
    searchTextBox.id = "tipue_search_input";
    searchTextBox.placeholder = "Search for JavaScript, HTML5, etc";

    // set attributes for Submit button
    searchButton.type = "submit";
    searchButton.id = "tipue_search_button";
    searchButton.value = "Go";

    // Arrange elements
    form.appendChild(searchTextBox);
    form.appendChild(searchButton);

    // Load arranged elements into document fragment
    frag.appendChild(form);

    // Load document fragment into #searchbox
    loadBox.appendChild(frag);
  }

  /*  
   * A very clever way to test if CSS is enabled in the browser. First, create
   * a Boolean-type variable called 'cssdisabled' and set its value to 'false'.
   * Then create a <div> with an inline style of 'position:absolute' and place
   * it directly below the opening <body> tag. Then detect the <div> tag's
   * position property, but doing this is different between oldIE and everyone
   * else.
   *
   * Next, we check to see if the <div> tag has a 'currentStyle' property
   * attached to it: if it does, we're in IE8 or lower so we use
   * 'currentStyle' to store the value of the 'position' property inside of
   * variable called 'currstyle'. Then we check to see if the browser has a
   * 'getComputedStyle' property attached to it: if it does, we're in another
   * browser so we use 'getComputedStyle' to store the value of the 'position'
   * property inside of the 'currstyle' variable.
   *
   * Now that the <div>'s postion value is stored in 'currstyle' regardless of 
   * what browser we're in, use a ternary operation to check it's value. If
   * the value is 'static', CSS is disabled so the value of our 'cssdisabled'
   * variable remains 'false'. But if the value is anything else (specifically
   * the 'absolute' value we set earlier), CSS is enabled so the value of our
   *'cssdisabled' variable switches over to 'true'. Our test is sone so remove
   * the <div> tag from the page.
   *
   * 'cssdisabled' is still available to our module's namespace so if it's set
   * to 'false', CSS is enabled in the browser so it's safe to run loadMenu()
   * function and display our fancy search box. But 'cssdisabled' is set to
   * 'true', CSS is NOT enabled so don't run the loadMenu() function but return
   * a value of 'false' as it's a best practice in this case. We've set it up * so that if either inline CSS is disable or stylesheets or disabled, our
   * Google searchbox will show up.  All this means that a searchbox will
   * appear on our page regardless of whether or not either CSS or JS is 
   * available in the browser.

   *  
   *  Attribution for this trick goes to Kethinov who discussed it over at:
   *  http://bit.ly/11iKpZh
   */

  cssdisabled = false; // must be proven otherwise
  testcss = document.createElement('div');

  testcss.style.position = 'absolute';

  document.getElementsByTagName('body')[0].appendChild(testcss);

  if (testcss.currentStyle) {
    currstyle = testcss.currentStyle['position'];
  }

  else if (window.getComputedStyle) {
  currstyle = document.defaultView.getComputedStyle(testcss, null).getPropertyValue('position');
  } 

  cssdisabled = (currstyle === 'static') ? true : false;

  document.getElementsByTagName('body')[0].removeChild(testcss);

  if (cssdisabled === false) {
    loadMenu();
  } else {
    return false;
  }

});