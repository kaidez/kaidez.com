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
    <section class="col-md-4">
      <h4 class="aside-section-header">social</h4>
      <ul class="aside-list">
        <li class="aside-list-item">
          <a href="http://facebook.com/kaidezblog" class="aside-link" alt="follow kaidez on facebook"><i class="fa fa-facebook fa-lg"></i> facebook</a>
        </li>
        <li class="aside-list-item">
          <a href="http://twitter.com/kaidez" class="aside-link" alt="follow kaidez on twitter"><i class="fa fa-twitter fa-lg"></i> twitter</a>
        </li>
        <li class="aside-list-item">
          <a href="http://youtube.com/c/kaidezblog" class="aside-link" alt="follow kaidez on YouTube"><i class="fa fa-youtube fa-lg"></i> youtube</a>
        </li>
        <li class="aside-list-item">
          <a href="http://github.com/kaidez" class="aside-link" alt="follow kaidez on YouTube"><i class="fa fa-github fa-lg"></i> github</a>
        </li>
        <li class="aside-list-item">
          <a href="https://plus.google.com/+KaiGittens" class="aside-link" alt="follow kaidez on Google +"><i class="fa fa-google-plus fa-lg"></i> google+</a>
        </li>
      </ul>
    </section>
    <section class="col-md-4">
      <h4 class="aside-section-header">categories</h4>
      <ul class="aside-list">
        <li class="aside-list-item">
          <a href="#" class="aside-link" alt="read tutorials on the kaidez blog">tutorials</a>
        </li>
        <li class="aside-list-item">
          <a href="#" class="aside-link" alt="read code tips on the kaidez blog">code tips</a>
        </li>
        <li class="aside-list-item">
          <a href="/personal/" class="aside-link" alt="read personal posts on the kaidez blog">personal</a>
        </li>
        <li class="aside-list-item">
          <a href="#" class="aside-link" alt="read old reviews on the kaidez blog">reviews</a>
        </li>
      </ul>
    </section>
    <section class="col-md-4">
      <h4 class="aside-section-header">site navigation</h4>
      <ul class="aside-list">
        <li class="aside-list-item">
          <a href="#" class="aside-link" alt="read the kaidez blog">blog</a>
        </li>
        <li class="aside-list-item">
          <a href="#" class="aside-link" alt="read articles written by blog">articles</a>
        </li>
        <li class="aside-list-item">
          <a href="#" class="aside-link" alt="read the AJAX beginner's tutorial written by kaidez">ajax tutorial</a>
        </li>
            <li class="aside-list-item">
            <a href="#" class="aside-link" alt="read the lynda.com courses developed by kaidez">kaidez on lynda</a>
            </li>
          </ul>
        </section>
      </div>  
    </aside> <!-- aside-id -->

    <footer id="colophon" class="site-footer" role="contentinfo" itemscope="itemscope" itemtype="http://schema.org/WPFooter">
      footer goes here
    </footer><!-- #colophon -->
    </div><!-- #page -->

  <?php wp_footer(); ?>
  </div><!-- #content -->
  <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
  <script>
  $("#mobile-menu-button").click(function(){
    $("#site-navigation").addClass("kai");
  });
</script>
  </body>
</html>
