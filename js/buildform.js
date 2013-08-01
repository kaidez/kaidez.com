/*
 * 
 */

define(function() {
  
  var loadMenu, cssdisabled, testcss, currstyle; // 4 variables global to this RequireJS module only. 

  /*  
   *  Dynamically create a form that looks like this:
   *
   *  <form action="/search.html" id="js-searchbox" class="form">
   *    <input type="text" name="q" id="tipue_search_input"
   *     placeholder="Search...">
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
    form.setAttribute("role", "search");
    form.id = "js-searchbox";
    form.setAttribute("class", "form");

    // set attributes for Search text box
    searchTextBox.type = "text";
    searchTextBox.name = "q";
    searchTextBox.id = "tipue_search_input";
    searchTextBox.placeholder = "Search...";

    // set attributes for Submit button
    searchButton.type = "submit";
    searchButton.setAttribute("class", "btnSearch");
    searchButton.value = "Go";

    // Arrange elements
    form.appendChild(searchTextBox);
    form.appendChild(searchButton);

    // Load arranged elements into document fragment
    frag.appendChild(form);

    // Load document fragment into #searchbox, which is already on the page
    loadBox.appendChild(frag);
  }

  /* IS CSS DISABLED ON PAGE-LOAD?
   *
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
   * what browser we're in, use a ternary operation to check its value. If
   * the value is 'static', it means that the browser was unable to detect the <div> tag's absolute positioning we set up earlier with "testcss.style.position = 'absolute'".  Therefore, CSS is disabled in the browser and the value of the 'cssdisabled' variable is 'true'. But if the value is anything else (in this case, 
   * the 'absolute' value we set earlier), CSS is enabled so the value of our
   * 'cssdisabled' variable is 'false' (what it was set to initially). Our test is done so we can remove
   * the <div> tag from the page.
   *
   * The 'cssdisabled' varibale is still available to our module's namespace so if it's set
   * to 'false', it means that CSS is enabled in the browser so it's safe to run the loadMenu() method above and display our fancy search box. But 'cssdisabled' is set to
   * 'true', CSS is NOT enabled so don't run the loadMenu() method and, instead, return
   * a value of 'false' as it's a best practice in this case.
   *
   * We've set thngs up
   * so that if either any type of CSS is disabled (extenal stylesheets, embedded or inline), our
   * Google searchbox will show up.  All this means that a searchbox will
   * appear on our page regardless of whether or not either CSS and/or JS is 
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