(function(){

  // Tipue code
  $(function() {
    $('#tipue_search_input').tipuesearch();
  });

  // Variables used throughout the code
  var loadMenu,
    isCSSDisabled,
    testCSS,
    currStyle;
  
  // Function that builds the Tipue search box
  loadMenu = function() {
    var loadSearchBox = document.getElementById("searchbox"),
      frag = document.createDocumentFragment(),
      form = document.createElement("form"),
      searchTextBox = document.createElement("input"),
      searchButton = document.createElement("input");
    
    form.action = "search.html";
    form.setAttribute("role", "search");

    searchTextBox.type = "text";
    searchTextBox.name = "q";
    searchTextBox.id = "tipue_search_input";
    searchTextBox.placeholder = "Search...";

    searchButton.type = "submit";
    searchButton.value = "Search";

    form.appendChild(searchTextBox);
    form.appendChild(searchButton);

    frag.appendChild(form);

    loadSearchBox.appendChild(frag);
    
  }

  // Start detecting if CSS is enabled or disabled
  isCSSDisabled = false;
  
  testCSS = document.createElement('div');

  testCSS.style.position = 'absolute';

  document.getElementsByTagName('body')[0].appendChild(testCSS);

  if (testCSS.currentStyle) {
    currStyle = testCSS.currentStyle['position'];
  } else {
    if (window.getComputedStyle) {
      currStyle = document.defaultView.getComputedStyle(testCSS, null).getPropertyValue('position');
    } 
  }

  isCSSDisabled = (currStyle === 'static') ? true : false;

  document.getElementsByTagName('body')[0].removeChild(testCSS);

  if (isCSSDisabled === false) {
    loadMenu();
  } else {
    return false;
  }
})();