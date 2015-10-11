<?php
/**
 * Template part for displaying single posts.
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
        <div class="post-ad">
      <a href="http://www.lynda.com/HTML-training-tutorials/224-0.html?utm_medium=ldc-partner&utm_source=SSPRC&utm_content=11866&utm_campaign=CD2146&cid=l0:en:pt:le:prosc:s88:224:ind:ssprc:CD2146&bid=11866&aid=CD2146"><img src="http://lynda.directtrack.com/42/2146/11866/" alt="Learn HTML5" border="0"></a>
    </div>
    <?php the_content(); ?>
    </div><!-- .entry-content -->
    
  </article><!-- #post-## -->
  <hr class="post-hr">
  
  