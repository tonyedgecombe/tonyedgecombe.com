---
title: Creating a null printer in Windows
date: 2009-02-25
layout: post
---

I get quite a lot of requests for support on how to set-up [Print Distributor](http://www.printdistributor.com) to create a null printer that discards any documents. It seems there are applications which produce regular unwanted reports that can't be turned off.

Actually you don't need Print Distributor to do this, everything is already available in Windows.

Start by opening the Printers folder and launch the add printer wizard.

Choose a local printer and create a new port selecting local port for the type.

Enter NUL: for the port name and then select a driver, any one will do although I tend to select the HP LaserJet 5.

Name your printer and finish the wizard, now anything you print to this printer will just disappear.