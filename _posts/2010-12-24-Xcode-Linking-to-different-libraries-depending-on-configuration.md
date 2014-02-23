---
title: Xcode Linking
date: 2010-12-24
layout: post
---

<p>I've just started a cross platform project in Xcode and one of the problems I came across is it doesn't seem possible to link to different libraries depending on whether you are building the Debug or Release configuration.</p>

<p>I did find an <a href="http://lists.apple.com/archives/xcode-users/2005/Jul/msg00439.html">old message</a> on the Apple developer forums that indicates you can do this with dependent projects, the trouble with this is when you clean your target all the dependent projects will clean as well.</p>

<p>In the end I did find a method that works for my project. The trick is to add a "Library Search Path" with the BUILD_STYLE environment variable:</p>

<code>
/path/to/mylibrary/build/$(BUILD_STYLE)/x86_64
</code>

<p>The $(BUILD_STYLE) macro gets expanded to Debug or Release depending on which configuration I am using, I just need to make sure the libraries are created in the appropriate folders.</p>

<p>I can then add the libraries using the setting "Other linker flags" with the -l option:</p>

<code> 
-l mylibraryname
</code>

<p>Not as nice as the Visual Studio solution but it does seem to work.</p>