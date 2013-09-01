/*
 *
 *
 */

define(function() {
  
  // Variables that are global to this RequireJS module only
  var createContactForm;

  createContactForm = function() {
    var searchBoxContainer = document.getElementById("aside-contact-form-section"),
      contactFormFragment = document.createDocumentFragment(),
      contactForm = document.createElement("form"),
      fieldset = document.createElement("fieldset"),
      nameBox = document.createElement("input"),
      emailBox = document.createElement("input"),
      textarea = document.createElement("textarea");

    // Set contact form attributes
    contactForm.id = "contact";
    contactForm.name= "contactForm";
    contactForm.method = "post";
    
    // load <fieldset> into <form>
    contactForm.appendChild(fieldset);
    
    // load <form> into the document fragment
    contactFormFragment.appendChild(contactForm);

    // Load document fragment into #aside-contact-form-section, which is already on the page
    searchBoxContainer.appendChild(contactFormFragment);
  }

  /*
   * IS CSS DISABLED ON PAGE-LOAD?
   *
   * A very clever way to test if CSS is enabled in the browser...
   *
   * First, create a Boolean-type variable called 'isCssDisabled' and set its 
   * value to 'false'. Then create a simple <div> tag.  The default value of a 
   * <div> tag's 'position' property is 'static'...we're going to set/change
   * it to 'absolute'. After that, we place the <div> directly below the
   * opening <body> tag.
   * 
   * We need to detect the value of the <div> tag's 'position' property, which 
   * is 'absolute' at this point.  But doing this is different between oldIE 
   * and other browsers so we need to do it twice.
   *
   * First, we check to see if the <div> tag has a 'currentStyle' property
   * attached to it: if it does, we're in IE8 or lower so we use 
   * 'currentStyle' to help us store the value of the 'position' property 
   * inside of variable called 'currstyle'. Next, we check to see if the 
   * browser has a 'getComputedStyle' property attached to it: if it does,
   * we're in another browser so we use 'getComputedStyle' to help us store 
   * the value of the 'position' property inside of the 'currstyle' variable.
   *
   * Now that the <div>'s postion value is stored in 'currstyle' (regardless 
   * of what browser we're in), we use a ternary operation to find its value. 
   * If the value is 'static', it means that the browser was unable to detect 
   * the <div> tag's absolute positioning we set earlier with
   * 'testcss.style.position:absolute'. Therefore, CSS is disabled in the 
   * browser and the value of the 'isCssDisabled' variable is 'true'. But if 
   * the value is anything else (in this case, the 'absolute' value we set
   * earlier), CSS is enabled so the value of our 'isCssDisabled' variable is 
   * 'false' (which is what it was set to at the start initially). At this 
   * point, we can remove the <div> tag from the page.
   *
   * The 'isCssDisabled' variable is still available to our RequireJS module's
   * namespace so we can see its value. If we see that the value is set to 
   * 'false', it means that CSS is enabled in the browser so it's safe to run
   * the createContactForm() method above and display our fancy searchbox. But if 
   * 'isCssDisabled' is set to true', it means that CSS is NOT enabled. So 
   * don't run the createContactForm() method and instead, return a value of 'false': a 
   * best practice in this case.
   *
   * We've set thngs up so that if either any type of CSS is disabled (extenal 
   * stylesheets, embedded or inline), our Google searchbox will show up.
   *  
   *  Attribution for this trick goes to Kethinov who discussed it over at:
   *  http://bit.ly/11iKpZh
   */

  isCssDisabled = false; // must be proven otherwise
  
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
    createContactForm();
  } else {
    return false;
  }

});