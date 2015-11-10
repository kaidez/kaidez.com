(function(){

  // App data
  var jsBooks = {
    "book1" : {
      "title": "Object-Oriented Javascript",
      "author": "Stoyan Stefanov",
      "image": "images/ooj.jpg",
      "amazonLink": "http://www.amazon.com/gp/product/1849693129/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1849693129&linkCode=as2&tag=kaidez-20&linkId=CK7X5SMYEHL3BMEQ"
    },
    "book2" : {
      "title": "Effective Javascript",
      "author": "David Herman",
      "image": "images/effectivejs.jpg",
      "amazonLink": "http://www.amazon.com/gp/product/0321812182/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0321812182&linkCode=as2&tag=kaidez-20&linkId=KC4WGKUBOQWXNFBA"
    },
    "book3" : {
      "title": "JavaScript: The Good Parts",
      "author": "Douglas Crockford",
      "image": "images/goodparts.jpg",
      "amazonLink": "http://www.amazon.com/gp/product/0596517742/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0596517742&linkCode=as2&tag=kaidez-20&linkId=DMIEK65EIJ33NXHM"
    },
    "book4" : {
      "title": "Eloquent Javascript",
      "author": "Marijn Haverbeke",
      "image": "images/eloquentjavascript.jpg",
      "amazonLink": "http://www.amazon.com/gp/product/1593275846/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1593275846&linkCode=as2&tag=kaidez-20&linkId=3EF3Y6ZCF3VNMI2N"
    }
  };
  
  // Select templates & build Shadow DOM & Shadow Root
  var template = document.querySelector("#singleBook"),
    templateContent = template.content,
    host = document.querySelector("#allBooks"),
    root = host.createShadowRoot(); // "#allBooks" is the Shadow Root

  // Use a for...in loop to load "jsBooks" data in  <template>
  for (key in jsBooks) {
    var title = jsBooks[key].title,
      author = jsBooks[key].author,
      image = jsBooks[key].image,
      amazonLink = jsBooks[key].amazonLink;

    // Add image data to src in <img> tag in <template>
    templateContent.querySelector("img").src = image;

    // Add title data to alt in <img> tag & "#bookTitle" in <template>
    templateContent.querySelector("img").alt 
    = templateContent.querySelector("#bookTitle").innerHTML
    = title;
    
    // Add author data to "#bookAuthor" in <template>
    templateContent.querySelector("#bookAuthor").innerHTML = author;

    // Add amazonLink data to href in "#btnPurchase" in <template>
    templateContent.querySelector("#btnPurchase").href = amazonLink;

    // Copy JUST the <article> tag content & place it in the Shadow Root
    root.appendChild(document.importNode(templateContent.querySelector(".templateArticle"), true));
  }

  /*
   * Copy JUST the <style> tag content & place it in the Shadow Root.
   * This is done OUTSIDE the "for...in" loop so that the <style> tag
   * doesn't get duplicated every time it iterates.
   */
  root.appendChild(document.importNode(templateContent.querySelector("style"), true));

})();