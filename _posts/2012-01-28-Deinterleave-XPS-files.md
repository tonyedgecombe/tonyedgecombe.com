---
title: Deinterleave XPS files
date: 2012-01-28
layout: post
---

XPS files have a nice feature called interleaving. 

When a printer receives an XPS file it needs to receive any resources such as fonts or images before those resources are used on a page. The way this is handled is items are split into parts, so the first part of the page is spooled then it may be followed by a font then more of the page followed by an image and so on.

This is effective for the creator and consumer software but it does make the files difficult to navigate manually.

To work around this I wrote a small [utility to deinterleave an XPS file.](https://github.com/tonyedgecombe/Deinterleave)