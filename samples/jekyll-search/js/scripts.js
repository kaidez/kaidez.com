(function(){

    // The Tipue-powered code that returns search results to
    // "search.html".
    $(function() {
      $('#tipue_search_input').tipuesearch();
    });

    var loadSearchBox = document.getElementById("searchbox"),
      frag = document.createDocumentFragment(),
      form = document.createElement("form"),
      searchTextBox = document.createElement("input"),
      searchButton = document.createElement("input");
    
    // set attributes for form
    form.action = "search.html";
    form.setAttribute("role", "search");

    // set attributes for Search text box
    searchTextBox.type = "text";
    searchTextBox.name = "q";
    searchTextBox.id = "tipue_search_input";
    searchTextBox.placeholder = "Search...";

    // set attributes for Submit button
    searchButton.type = "submit";
    searchButton.setAttribute("class", "btnSearch");
    searchButton.value = "Search";

    // Arrange elements
    form.appendChild(searchTextBox);
    form.appendChild(searchButton);

    // Load arranged elements into document fragment
    frag.appendChild(form);

    // Load document fragment into #searchbox, which is already on the page
    loadSearchBox.appendChild(frag);
    
})();