---
title: HelpSpot Help Desk Software
date: 2006-03-15
layout: post
---

For the last couple of years I have been using FogBugz to manage all my support emails and bug tracking. FogBugz is primarily a bug tracking application but it has a nice interface for managing support email which fits in quite well with my work patterns.

There is however one large problem for me in using FogBugz and that is it isn't easy to install on most web hosts. The solution to this up until has been to setup a separate hosting account at Server Intellect. After some initial problems this has been OK but I really wanted to offer my customers the ability to track issues in our web site, this was proving to be more difficult than it should have been.

I looked at a number of open and closed source solutions, installing most of them on a local test server. Sadly it seems there is a lot of software out there with reliability and security problems, a quick glance through the PHP code showed many opportunities for sql-injection type attacks.

One application I looked at some time ago is HelpSpot written by Ian Landsman. I have been following Ian's blog about developing HelpSpot for some time but had initially ruled it out because one of it's requirements is the installation of the Zend Optimizer. This wasn't available on my original shared web hosting account but I have just recently upgraded to a dedicated server so I decided to take another look.

Installation was very straight forward, first I needed to setup a database in the control panel on my host then upload the application. There is a configuration file to edit with the database details and an install script to run. The whole process is very simple and took less than ten minutes.

Configuration is a bit more complex, a couple of options I needed to change were quite hard to find. The upside to this of course is you are likely to find just about anything you need to modify. There is quite a nice category system which lets you split different types of calls, sales vs support for instance. Each category can then have a set of tags which you tick for each call, in my case I setup tags for different products and call types. Once I have been using it for a while I should be able to gather stats on each product's support load.

During normal day to day use I spend most of my time in the workspace, an in-box for support requests. The look and feel is very similar to a web based email client with a general in-box and my own queue. When a customer open's a request you can see the complete history of the request and you have the option to add both public and private notes. This can be slightly confusing as by default notes are private so if your aren't careful enough your customer might not see your replies. The next release of HelpSpot has an option to make note public by default so this should resolve this issue.

It's still early days for HelpSpot but it has got off to a good start, it has a nice polished feel to it, well done Ian.