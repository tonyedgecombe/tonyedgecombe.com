---
title: Raw printing in Windows 8
date: 2012-09-10
layout: post
---

With the introduction of V4 drivers in Windows 8 and Server 2012 Microsoft has taken another step down the road of making everything print related based on XPS. One of the issues this created in several of my programs is raw printing stopped working for printers using V4 drivers.

It appears (although I haven't tested this thoroughly) that if you try and send a document directly to the printer using the established methods Windows treats it as an XPS document. If it is then everything is fine, if not then it drops into a black hole.

Fortunately there is a new data type you can specify "XPS_PASS" which will bypass the driver and send your output directly to the printer, more details on this on <a href="http://msdn.microsoft.com/en-us/library/windows/desktop/ff686812(v=vs.85).aspx">MSDN.</a>

To be able to print to both V4 and earlier printers you will need to test for the driver version, this code will flag whether you have a version 4 driver or not.

``` c++
bool IsV4Driver(wchar_t* printerName)
{
	HANDLE handle;
	PRINTER_DEFAULTS defaults;

	defaults.DesiredAccess = PRINTER_ACCESS_USE;
	defaults.pDatatype = L"RAW";
	defaults.pDevMode = NULL;

	if (::OpenPrinter(printerName, &handle, &defaults) == 0)
	{
		return false;
	}

	DWORD version = GetVersion(handle);

	::ClosePrinter(handle);

	return version == 4;
}

DWORD GetVersion(HANDLE handle)
{
	DWORD needed;

	::GetPrinterDriver(handle, NULL, 2, NULL, 0, &needed);
	if (::GetLastError() != ERROR_INSUFFICIENT_BUFFER)
	{
		return -1;
	}

	std::vector<char> buffer(needed);
	if (::GetPrinterDriver(handle, NULL, 2, (LPBYTE) &buffer[0], needed, &needed) == 0)
	{
		return -1;
	}

	return ((DRIVER_INFO_2*) &buffer[0])->cVersion;
}
```