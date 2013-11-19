(function(){

  $(function() {
    $('#tipue_search_input').tipuesearch();
  });

  // Variables that are global to this RequireJS module only
  var loadMenu,
    isCssDisabled,
    testcss,
    currstyle;

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
  

  // Start checking if CSS is disabled
  isCssDisabled = false;
  
  testcss = document.createElement('div');

  testcss.style.position = 'absolute';

  document.getElementsByTagName('body')[0].appendChild(testcss);

  if (testcss.currentStyle) {
    currstyle = testcss.currentStyle['position'];
  }

  else if (window.getComputedStyle) {
    currstyle = document.defaultView.getComputedStyle(testcss, null).getPropertyValue('position');
  } 

  isCssDisabled = (currstyle === 'static') ? true : false;

  document.getElementsByTagName('body')[0].removeChild(testcss);

  if (isCssDisabled === false) {
    loadMenu();
  } else {
    return false;
  }
    
})();