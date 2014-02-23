---
title: Software Trial Protection
date: 2008-02-08
layout: post
---

Over the last six months I have been writing Mail Print version 2, this is a big upgrade with many changes and is now nearly complete. The last signifcant piece of work is to implement the trial protection mechanism. This is a feature in the software which lets the customer use it on a trial basis for a short period (usually 30 days) in order for them to check it satisfies their requirements before they hand over their money.

In the past I have used an off the shelf commercial "wrapper" to handle trial protection. This had a lot of benefits at the time including cutting development time and the use of more secure encryption than I have the skills to develop. However this hasn't been without it's problems, the worst of which was the introduction of DEP (Data Execution Protection) in Windows which blocks code which changes on the fly. The vendor of this software has struggled to resolve problems in this area and offered very little constructive support.

So the choice I had to make was whether to buy another product or code my own system, I decided on the later. This post is really a specification for what I need to write.

I thought it might be useful for anybody else looking at developing their own scheme to see what my requirements are. As I sell mainly to businesses traditional piracy hasn't been a big issue for me, more of a problem are issues like under licensing within an organization and handling refunds.

There are some basic principles I apply to all my software development which are worth listing.


* The software is written for my customers benefit, not mine. This means the trial mechanism should inconvenience them as little as possible. Of course there is a trade off here, if I took away any protection then it would be very convenient for the customer but my revenue would dry up so I need to strike a balance.

* Favor simplicity over complexity, this is often more difficult than you would think. If you watch a duck glide across water and it looks very smooth, this is how the user should see my software, under the water though there is a lot of effort being expended to achieve this smoothness.

* Minimise support costs, currently a significant proportion of my support emails relate to problems with registering Mail Print. I'd really like to reduce these as much as possible even if it has a small impact on revenue.

Having laid out the principles I can cover the main functionality in the trial mechanism.

1. Trial version. The standard trial needs to work for 30 days from the point of installation, after 30 days the application can continue to work except it should stop checking messages. During the trial period Mail Print will put a banner on all the printed documents to indicate how much longer the trial period will last for. It's quite common for customers to try the software and decide not to buy only for them to come back some time later and try again, to for allow this Mail Print will reset the trial for each new version.   
The splash screen will indicate how much longer the trial will run for and give the customer an opportunity to buy Mail Print and enter their registration key.

2. Trial extensions. To extend the trial the user just needs to type extension into the keycode field. This lets us extend a users trial without having to issue a new keycode. The extension will last for 14 days and can only be done once.

3. Expiring keys. Currently when I accept a purchase order from a customer I deliver a full keycode straight away. Mostly this works OK but there are a regular stream of customers who never pay the invoice. For new purchase orders the key generator will issue a temporary key which will work for 90 days, when the customer pays their bill they will get a full keycode, this can be automated so that it is transparent to the customer.

4. Mail Print will be available in Standard and Professional editions. The mechanism which handles this can support new versions in the future.

5. Key Format. There is a trade off here between the security of the key and ease of entry. I have been surprised by how difficult some users find it to enter the key-code, I'm pretty sure some of them don't know what copy and paste is and they certainly have problems distinguishing 0 with O and 1 with l. The key-name is a frequent problem, the current key generator will use the customers business name if it is available but users still try and enter their own name when they register. To solve both of these problems I am going to disconnect the users name from the key-code and stick with a short numeric only code something like this:
        1234-5678-9012-3456-7890
This should eliminate a lot of support issues, it remains to be seen what impact it will have on crackers. The key will be packed using modular arithmetic to make it as short as possible and have a simple checksum to make sure it is valid on entry.

6. Key Verification. Rather than focussing too much on strong encryption of the key I'm going to rely on partial verification of the key-code, there will be a section of the key with a secret bit pattern. Each new release of the software will only check one of these bits which should frustrate anybody trying to create a key generator, as soon as one is released I can produce a new build which checks an extra bit and makes the generator useless.

7. Upgrading. Currently I rely on a back end system to handle upgrades, customers get a completely new key-code. This works well so I don't plan to change it.

8. Volume licenses. The key-code will hold the quantity of licenses the customer has bought. One area I know I loose business at the moment is from customers who purchase a single license then install the software on many machines. Although I don't have an accurate figure for this I see enough support emails hinting at it that I am convinced it is costing me revenue. Although I'm not going to implement it straight away at some point in the future I will write some local network checking code to identify overuse.

9. Online Activation. Up to now I have been quite negative about online activation schemes, the mechanisms in Windows and Office have caused me problems a number of times even though I am using fully licensed software. However there is a problem with the use of stolen credit cards which results in chargebacks and to a lesser extent people continuing to use the software after a refund has been issued.


Mail Print will use a passive activation scheme so if it can't make a connection to the server for some reason it will assume everything is OK and there is a legitimate reason for this, only if it can reach the server and the server tells it the key-code is illegitimate then it will stop working. This will provide a mechanism to deactivate the software without inconveniencing any legitimate customers.

Now all I have to do is write the code!