---
title: Implementing the Light Box effect
date: 2010-10-26
layout: post
---

I'm sure you have seen the effect by now, clicking on an image thumbnail dims the page you are looking at and opens the full size version of the image in the middle of the browser window. The original implementation of this was [Lightbox](http://www.lokeshdhakar.com/projects/lightbox2/), now we seem to be overrun with [clones](http://planetozh.com/projects/lightbox-clones/) doing very similar things.

The trouble with including one of these clones in your site is you don't really know what the quality of code is like and most seem to be groaning under the weight of all their features. All I needed was a short script to dim the page and display an image, the rest is overkill for me. 

So rather than writing another clone and getting dragged down the same path I thought I'd show you the steps to adding the lightbox effect to your own site.

Most of the work is handled in JavaScript, there isn't anything too demanding but if you haven't used JavaScript before you are probably better off elsewhere. I will also use JQuery simply because scripting the browser is unbearable without it, if you haven't used JQuery before read the [introduction](http://docs.jquery.com/How_jQuery_Works) before you continue.

So the first stage is to dim the whole page, we do this by adding a &lt;div> element to the end of the body. The div is styled with absolute positioning, fixed to the top left corner and with the width and height set to 100% so it fills the whole browser window. The opacity is set to 0.5, the background colour to black and it is hidden for now.

``` javascript
#bl-curtain {
    position:absolute;
    top:0;
    left:0;
    bottom: 0;
    right: 0;
    width: 100%;
    height:100%;
    background:black;
    opacity: .5;
    display:none;
}
```

In our HTML we need an image thumbnail enclosed in an anchor tag, with the class set to boxlight:

``` html
    <a href="image.png">
        <img class="boxlight" src="thumb.png"
            alt="Screenshot thumbnail" border="0">
    </a>
```

JQuery lets us capture a click on any images marked with the boxlight class:

``` javascript
$(document).ready(function() {
    $('.boxlight').click(function() {
```

We will drop out for IE6 or earlier, I think you can probably get this to work with IE6 but I just don't care:

``` javascript
if ($.browser.msie && parseInt($.browser.version) &lt;= 6) {
    return true;
}
```

It's probably a good idea to fetch the url from the parent anchor early on and drop out if we can't find it:

``` javascript
url = $(this).parents('a').attr('href');
if (!url) return true;
```

Now we add our new &lt;div> to the end of the current body:

``` javascript
$('body').append('&lt;div id="bl-curtain">&lt;/div>');
```

This will pick up the style from the earlier style sheet but for IE we need to add the opacity filter after the element is in the page:

``` javascript
if ($.browser.msie) {
    $('#bl-curtain').css('filter', 'alpha(opacity=50)');
}
```

If the user clicks on the background we need to clear the image and curtain:

``` javascript
$('#bl-curtain').click(function() {
    fadeOut();
});
```

Finally we can get around to producing an effect, start by fading in the curtain to cover the existing page:

``` javascript
$('#bl-curtain').fadeIn();
```

With the background in place we need to start loading the main image:

``` javascript
var img = new Image();
$(img)
    .attr('src', url)
    .attr('id', 'bl-image')
    .click(fadeOut)
    .one('load', function() {
        onImageLoad(this);
    });
```

If the image is in the browsers cache then IE doesn't fire the event so we need to do this manually, this might be the same for Opera, I haven't checked:

``` javascript
if ($.browser.msie && !$(img).complete) {
    $(img).trigger('load');
}
```

We return false so the browser doesn't try and follow the link in the anchor tag as we have done everything here:

``` javascript
    return false;
    });
});
```

The onLoad function has a fair amount of work to do, mostly checking if the image is too big for the browser window and if it is resizing it accordingly:

``` javascript
function onImageLoad(image) {
    // Once the image has loaded we can add it to the document
    $('body').append(image);

    imageWidth = $(image).width();
    imageHeight = $(image).height();

    // Resize the image if it is too big for the browser window
    viewPortWidth = $(window).width();
    viewPortHeight = $(window).height();

    if (viewPortWidth &lt; imageWidth || viewPortHeight &lt; imageHeight) {
        horizontalScalingFactor = imageWidth / viewPortWidth;
        verticalScalingFactor = imageHeight / viewPortHeight;
	
        scaling = Math.max(horizontalScalingFactor, verticalScalingFactor);
	
        imageHeight = imageHeight / scaling;
        imageWidth = imageWidth / scaling;
	
        $(image).css('height', imageHeight);
        $(image).css('width', imageWidth);
	
    }

    // Centre the image in the page
    $(image).css('margin-top', -imageHeight / 2);
    $(image).css('margin-left', -imageWidth / 2);

    // Finally we can fade it in
    $(image).fadeIn();
}
```

You might have noticed the negative margins applied to the image in the last piece of code, that is because the styling for the image places the top left corner in the centre of the page:

``` javascript
#bl-image {
    position:absolute;
    top:50%;
    left:50%;
    display:none;
}
```

The last piece of code fades out the image and background then removes them from the page:

``` javascript
function fadeOut() {
    $('#bl-curtain,#bl-image').fadeOut(function() {
        $(this).remove();
    });
}
```
