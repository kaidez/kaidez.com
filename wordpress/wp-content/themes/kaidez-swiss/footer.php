<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Kaidez Swiss
 */

?>
<aside id="aside-id" class="aside">
  <h3 class="aside-header">Other Site Information</h3>
  <div class="row aside-inner">

    <section id="footer-social-links" class="col-md-4">
      <h4 class="aside-section-header">social</h4>
      <ul class="aside-list">
        <li class="aside-list-item">
          <a href="http://facebook.com/kaidezblog" class="aside-link" title="follow kaidez on facebook"><i class="fa fa-facebook fa-lg"></i> facebook</a>
        </li>
        <li class="aside-list-item">
          <a href="http://twitter.com/kaidez" class="aside-link" title="follow kaidez on twitter"><i class="fa fa-twitter fa-lg"></i> twitter</a>
        </li>
        <li class="aside-list-item">
          <a href="http://youtube.com/c/kaidezblog" class="aside-link" title="follow kaidez on YouTube"><i class="fa fa-youtube fa-lg"></i> youtube</a>
        </li>
        <li class="aside-list-item">
          <a href="http://github.com/kaidez" class="aside-link" title="follow kaidez on YouTube"><i class="fa fa-github fa-lg"></i> github</a>
        </li>
        <li class="aside-list-item">
          <a href="https://plus.google.com/+KaiGittens" class="aside-link" title="follow kaidez on Google +"><i class="fa fa-google-plus fa-lg"></i> google+</a>
        </li>
      </ul>
    </section> <!-- #footer-social-links -->

    <section id="footer-category-links" class="col-md-4">
      <h4 class="aside-section-header">categories</h4>
      <ul class="aside-list">
        <li class="aside-list-item">
          <a href="#" class="aside-link" title="read tutorials on the kaidez blog">tutorials</a>
        </li>
        <li class="aside-list-item">
          <a href="#" class="aside-link" title="read code tips on the kaidez blog">code tips</a>
        </li>
        <li class="aside-list-item">
          <a href="/personal/" class="aside-link" title="read personal posts on the kaidez blog">personal</a>
        </li>
        <li class="aside-list-item">
          <a href="#" class="aside-link" title="read old reviews on the kaidez blog">reviews</a>
        </li>
      </ul>
    </section> <!-- #footer-category-links -->

    <section id="footer-navigation" class="col-md-4">
      <h4 class="aside-section-header">site navigation</h4>
      <ul class="aside-list">
        <li class="aside-list-item">
          <a href="#" class="aside-link" title="read the kaidez blog">blog</a>
        </li>
        <li class="aside-list-item">
          <a href="#" class="aside-link" title="read articles written by blog">articles</a>
        </li>
        <li class="aside-list-item">
          <a href="#" class="aside-link" title="read the AJAX beginner's tutorial written by kaidez">ajax tutorial</a>
        </li>
        <li class="aside-list-item">
          <a href="#" class="aside-link" title="read the lynda.com courses developed by kaidez">kaidez on lynda</a>
        </li>
      </ul>
    </section> <!-- #footer-navigation -->
  </div>  
</aside> <!-- #aside-id -->

<footer id="colophon" class="site-footer" role="contentinfo" itemscope="itemscope" itemtype="http://schema.org/WPFooter">

  <p class="footer-text">
    <a href="" class="footer-links">site map</a>
    <a href="" class="footer-links">affiliate disclaimer</a>
  </p>

  <p class="footer-text footer-text-spaced">made with love by kaidez</p>
  <p class="footer-text">built with <a href="http://wordpress.org/" class="colophon-link" title="Visit Wordpress">wordpress</a></p>
  <p class="footer-text">powered by <a href="http://mediatemple.net/" class="colophon-link" title="Visit Media Temple">media temple</a> and <a href="http://maxcdn.com/" class="colophon-link" title="Visit kaidez on MaxCDN">maxcdn</a></p>
  <p class="footer-text footer-text-spaced">&copy; 2008-15 kai gittens</p>

  <div class="jump-to-top">
    <a href="#page" class="jump-to-top-link" title="Go back to the top of the page">back to top</a>
  </div> <!-- .jump-to-top -->

</footer> <!-- #colophon -->
</div> <!-- #page -->


<?php wp_footer(); ?>
</div> <!-- #content -->
<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
<script>
  $("#mobile-menu-button").click(function(){
    $(".site-content").addClass("kai");
  });
</script>
</body>
</html>
