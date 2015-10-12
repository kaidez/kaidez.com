<?php
/**
 * Template part for displaying single posts, BUT WITH A GOOGLE AD.
 *
 * @package Kaidez Swiss
 */

?>


  <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> itemscope="itemscope" itemtype="http://schema.org/BlogPosting" itemprop="blogPost">
    <header class="entry-header">

    <div class="breadcrumbs">
      <span><a href="/">home</a></span>
      <span>&rsaquo;</span>
      <span class="breadcrumb-category-name">
        <?php the_category(', '); ?>
      </span>
      <span class="hide-breadcrumb-element">&rsaquo;</span>
      <span class="hide-breadcrumb-element">
        <?php the_title(''); ?></span>
    </div>
      <div class="entry-meta">
        <?php kaidez_swiss_posted_on(); ?>
      </div><!-- .entry-meta -->
    <?php the_title( '<h1 id="blog-post-title" class="entry-title entry-title-margin" itemprop="headline">', '</h1>' ); ?>
  

    </header><!-- .entry-header -->

    <div class="entry-content">

      <style>

        /* Default ad size setting: used for desktops */
        .kaidezpostad {
          width: 300px; height: 250px;
        }

        /* for tablets */
        @media(max-width: 728px) {
          .kaidezpostad { width: 200px; height: 200px; }
        }
      
        /* for hand-helds */
        @media(max-width: 568px) {
          .kaidezpostad { width: 125px; height: 125px; }
        }

      </style>
      <div class="kaidezpostad post-ad">
      
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

        <!-- kaidezPostAd -->
        <ins class="adsbygoogle kaidezpostad"
            style="display:inline-block"
            data-ad-client="ca-pub-7363372172009273"
            data-ad-slot="6054182915"></ins>

        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>

      </div>
    <?php the_content(); ?>
    </div><!-- .entry-content -->
    
  </article><!-- #post-## -->
  <hr class="post-hr">
  
  