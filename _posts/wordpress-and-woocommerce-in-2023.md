---
published: true
title: "Wordpress and Woocommerce in 2023"
excerpt: "So you want to sell something online and skill and budget is tight, I believe WooCommerce is still an OK option"
category: "Wordpress"
tags: "Woocommerce"
date: "2023-12-03T15:58:35.322Z"
author:
  name: "M Ferreira"
  picture: "https://res.cloudinary.com/mannuel/image/upload/f_auto/v1604067445/images/mee.jpg"
ogImage:
  url: "https://res.cloudinary.com/mannuel/image/upload/v1701615056/mfcom/mp9c4svvugedvmrhoxk2.png"
coverImage: "https://res.cloudinary.com/mannuel/image/upload/v1701615056/mfcom/mp9c4svvugedvmrhoxk2.png"
---

I recently setup and WordPress site with WooCommerce. Shipping globally selling from the UK, Thomas is selling his artwork on [www.boomslap.com](https://www.boomslap.com), some great pieces go buy some.

## Requirements

- he must be able to maintain it himself
- no coding skill required for mainting products
- we must keep costs low for hosting
- we must keep as much margin as possible with regards to payment gateways
- has to be fast loading webpage
- has to be simple design, you can [see it here](https://www.figma.com/proto/A0u6vl99LrpvBFx1JGe5xY/boomslap.com?page-id=0%3A1&node-id=1-3&starting-point-node-id=1%3A3&mode=design&t=qph9NcOReGggWpuB-1)
- stripe payments

## Options we faced

### Custom frontend + Headless CMS

This is the most expensive and complex approach, requires special skill and a lot of time.

Could have built ontop of something like [https://nextjs.org/commerce](https://nextjs.org/commerce) and use [WordPress REST API](https://developer.wordpress.org/rest-api/) or some other headless CMS.

- [https://crystallize.com/](https://crystallize.com/)
- [https://www.contentful.com/](https://www.contentful.com/)
- [https://strapi.io/](https://strapi.io/)
- [https://www.sanity.io/](https://www.sanity.io/)
- [https://www.enonic.com/](https://www.enonic.com/)
- heres a more complete list [https://instantcommerce.io/blog/best-headless-cms](https://instantcommerce.io/blog/best-headless-cms)
  (Immediate no)

### Wix Commerce

- Hosted solution,
- Performant free templates (React JS frontends)

Costs:

- $20 a month
- Stripe transaction fees, which is 1.5% (UK cards) and 2.5% (EU cards) + 20p.

### Shopify

- Hosted solution,
- performant free web templates,
- with a awesome backend and stock management solution.

Costs:

- $39 a month
- Stripe fees 1.5% (UK Cards) and 2.5% (EU cards) + 20p.

## What we chose

WORDPRESS and WooCommerce.

For a one man band I believe this is a okay solution.

We chose convenience of him being able to update the site with out my help over performance.

WordPress sites are not the fastest loading, living on the edge kind of sites, we knew that. It was more important for us to keep the costs as low as we could and he be able to update the site himself.

- Business Plan hosted with [www.hostinger.com](https://hostinger.com?REFERRALCODE=1MANNUELFER05).

Costs:

- $9.99 a month
- transaction fees 1.5% (UK Cards) and 2.5% (EU cards) + 20p.
- WooCommerce (Free)
- WordPress (Free)

```bash
Disk Space: 200 GB
RAM: 1536 MB
CPU Cores:2
Inodes: 600000
Addons/Websites: 100
Active Processes: 60
Entry Processes: 30
Bandwidth: Unlimited
```

### How we did it

Now I had to setup the server and hostinger account and the install WordPress, its plugins and theme. But once that was done I was able to hand it over to Thomas to update and add products, change the theme.

#### Bought a theme

> Just buy a great theme, DO NOT USE FREE ones.

Figure out what your needs are and go and buy a theme on [themeforest](https://themeforest.net/item/x-the-theme/5871901) that meets those specific needs. $60 to $90 for a perpetual license. Do not buy a theme that is missing a feature because we are not going to be "coding" at all.

Find the fastest loading theme you can find you can test using [https://www.webpagetest.org/](https://www.webpagetest.org/)

#### Adapted the theme

We used the WYSIWYG editor to "design" what we envisaged in the Figma. Which of course what a predefined template itself, we adjusted to suite our taste.

#### Scalability

Well the backend is hosted in one region, nothing we can about that.

The Frontend we use [Cloudflare](https://www.cloudflare.com/) to distribute the all over the world on the cloudflare edge, makes the site perceivably faster than it normally would be with out it.

#### Security

Cloudflare gives you some basic protections, DDOS and a Firewall against known bad actors. Good enough
Also use [WordFence](https://www.wordfence.com/?utm_source=plugin&utm_medium=plugEM&utm_campaign=EMC8), also has firewall against bad actors.

#### Plugins used

Here is list of things we make use of to mee our needs, takes care of custom 404 pages, email list subscription, contact forms, analytics, and more.

- [Flexible SSL for CloudFlare](https://icwp.io/cloudflaresslpluginauthor): by One Dollar Plugin – 1.3.1
- [Contact Form 7](https://contactform7.com/): by Takayuki Miyoshi – 5.8.4
- [Convert Plus](https://www.convertplug.com/plus): by Brainstorm Force – 3.5.24
- [CookieYes | GDPR Cookie Consent](https://www.cookieyes.com/): by CookieYes – 3.1.7
- [Facebook for WooCommerce](https://github.com/woocommerce/facebook-for-woocommerce/): by Facebook – 3.1.5
- [Site Kit by Google](https://sitekit.withgoogle.com/): by Google – 1.114.0
- [Hostinger](https://hostinger.com/): by Hostinger – 1.9.5
- [Smash Balloon Instagram Feed](https://smashballoon.com/instagram-feed): by Smash Balloon – 6.2.6
- [AI Powered Marketing](https://woo.kliken.com/): by Kliken – 1.4.1
- [Mailchimp for WooCommerce](https://mailchimp.com/connect-your-store/): by Mailchimp – 3.3
- [MC4WP: Mailchimp for WordPress](https://www.mc4wp.com/#utm_source=wp-plugin&utm_medium=mailchimp-for-wp&utm_campaign=plugins-page): by ibericode – 4.9.10
- [Rank Math SEO](https://rankmath.com/): by Rank Math – 1.0.207
- [Custom 404](http://theme.co/): by Themeco – 2.0.6
- Google Analytics: by Themeco – 3.0.3
- [Woo Checkout Editor](https://boomslap.com/wp-admin/admin.php?page=wc-status#): by Themeco – 2.2.4
- [WooCommerce Stripe Gateway](https://wordpress.org/plugins/woocommerce-gateway-stripe/): by WooCommerce – 7.7.0
- [PDF Invoices & Packing Slips for WooCommerce](https://wpovernight.com/downloads/woocommerce-pdf-invoices-packing-slips-bundle/): by WP Overnight – 3.7.3
- [WooCommerce](https://woocommerce.com/): by Automattic – 8.3.1
- [Wordfence Security](https://www.wordfence.com/): by Wordfence – 7.11.0
- [WP Super Cache](https://wordpress.org/plugins/wp-super-cache/): by Automattic – 1.11.0

### Things to remember

- keep plugins updated, its a chore.
  - make sure they are supported by the theme before updating or bad things will happen
- regular backups enable it.
- update core wordpress regularly, or bad things will happen
  - make sure the theme supports it before updating or bad things will happen
- get a plugin to taker care of GDPR issues, one that can delete users data at click of button.
