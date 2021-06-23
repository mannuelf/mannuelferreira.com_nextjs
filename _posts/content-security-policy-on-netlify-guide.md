---
title: 'Content Security Policy on Netlify guide'
excerpt: 'A developers job is never done 🙂 . After deploying your website to Netlify naturally you run some performance tests using WebPageSpeedTest. You might notice and alarming red `F` or `E` in the top right of the screen. What the heck is that?'
coverImage: 'https://res.cloudinary.com/mannuel/image/upload/v1624456617/images/netlify.png'
date: '2021-06-23T13:45:00.322Z'
author:
  name: 'M Ferreira'
  picture: 'https://res.cloudinary.com/mannuel/image/upload/v1604067445/images/mee.jpg'
ogImage:
  url: 'https://res.cloudinary.com/mannuel/image/upload/v1624456617/images/netlify.png'
---


After deploy your website to Netlify (any server) naturally you will run some performance tests using [WebPageSpeedTest](https://www.webpagetest.org/). You might notice and alarming red `F` or `E` in the top right of the screen.

![WebPageSpeedTest](/assets/blog/content-security-policy-on-netlify-guide/webpagespeedtest_0001.png)

## TL;DR

This is a security score linked to a `CSP` (Content Security Policy), it shows whether any security policies are configured. The CSP provides a way to control the loading and execution of scripts in your webpage. CSP provides directives to configure what scripts you will allow to be loaded and executed on a webpage.

Setting the correct directives will prevent clickjacking, cross-site scripting and illegal embedding of your webpage in an offsite frame/iframe.

Create a `netlify.toml` file and place this script within, deploy and test one more time. Below is a good basic starter policy it allows css, form actions, ajax requests, scripts and images from the same origin, does not allow object, frame, media.

```bash
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Content-Security-Policy = "default-src 'none'; style-src 'self'; form-action 'self'; script-src 'self'; connect-src 'self'; img-src 'self'; base-uri 'self';"
```

## The long story

Clicking on the red `E` icon  will load the Snyk test results, which looks like this:

![WebPageSpeedTest](/assets/blog/content-security-policy-on-netlify-guide/webpagespeedtest_0001.png)

The Snyk test results page:

![issue1](/assets/blog/content-security-policy-on-netlify-guide/snyk_001.png)

### JavaScript Libraries with vulnerabilities

On the left you can see all the newest reported vulnerabilities in popular npm packages.

![issue1](/assets/blog/content-security-policy-on-netlify-guide/snyk_002.png)

### Security headers

On the right you can see our very own reported Security Headers related vulnerabilities.

![issue1](/assets/blog/content-security-policy-on-netlify-guide/snyk_003.png)

[Snyk Results](hhttps://snyk.io/test/website-scanner/?test=210622_AiDcMX_c311f91860c1b197dd104d0454678220&utm_medium=referral&utm_source=webpagetest&utm_campaign=website-scanner)

### netlify.toml

Okay back to the Headers, given these headers:

```bash
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Content-Security-Policy = "default-src 'none'; style-src 'self'; form-action 'self'; script-src 'self'; connect-src 'self'; img-src 'self'; base-uri 'self';"
```

Once the Policy has been set above with the above configuration, upload it and test it by opening the browser dev tools. Looking at the `console` , you will notice some errors that you have never seen before because you had no CSP configured. In my case on Netlify deploy preview-mode I saw:

> 60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:1 Refused to load the script 'https://d33wubrfki0l68.cloudfront.net/bundles/1bd814911a09d5e56b421403a658cbae5d2685ce.js' because it violates the following Content Security Policy directive: "script-src 'self'". Note that 'script-src-elem' was not explicitly set, so 'script-src' is used as a fallback.

My CSP is preventing `cloudfront.net` above from executing in my webpage.

GREAT 🚀 stuff if working.

Now I can decide to allow `cloudfront.net` because I trust Netlify and it's domains, so I should whitelist it by adding the domain and sub-domains to the `default-src` directive e.g.

```bash
Content-Security-Policy = "default-src 'self' cloudfront.net *.cloudfront.net; frame-ancestors 'self'; form-action 'self'"
```

Bare in mind this list has the potential to get lengthy the more scripts you plan to allow execution, you can see how mine has grown here: [netlify.toml](https://github.com/mannuelf/mannuelferreira.com_nextjs/blob/main/netlify.toml#L15)

### Rerun the test

`WebpageSpeedTest` results:

![WebPageSpeedTest](/assets/blog/content-security-policy-on-netlify-guide/webpagespeedtest_success.png)

`Security Headers` results:

![SecurityHeaders](/assets/blog/content-security-policy-on-netlify-guide/security-headers-result.png)

[Click here](https://securityheaders.com/?q=www.mannuelferreira.com&followRedirects=on)

Not using Netlify? try one of these:

### Nginx

```bash
server {
  ...
  add_header "X-Frame-Options" "SAMEORIGIN";
  add_header "X-XSS-Protection" "1; mode=block";
  add_header "X-Content-Type-Options" "nosniff";
  add_header "Content-Security-Policy" "default-src 'self'; frame-ancestors 'self'; form-action 'self'";
  ...
}
```

### Apache

```bash
<IfModule mod_headers.c>
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set X-Content-Type-Options "nosniff"
  Header set Content-Security-Policy "default-src 'self'; frame-ancestors 'self'; form-action 'self'"
</IfModule>
```

### IIS

```bash
<system.webServer>
  <httpProtocol>
    <customHeaders>
      <add name="X-Frame-Options" value="SAMEORIGIN" />
      <add name="X-XSS-Protection" value="1; mode=block" />
      <add name="X-Content-Type-Options" value="nosniff" />
      <add name="Content-Security-Policy" value="default-src 'self'; frame-ancestors 'self'; form-action 'self'" />
    </customHeaders>
  </httpProtocol>
</system.webServer>
```

keep reading if you want to know more.

## CSP Content Security Policy

CSP stands for Content Security Policy

> **DO NOT** use X-Content-Security-Policy or X-WebKit-CSP. Their implementations are obsolete (since Firefox 23, Chrome 25), limited, inconsistent, and incredibly buggy. [Read more here](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html#http-headers)

### Let's break it down

By adding those configurations to your server you are essentially creating a security policy.

A policy that tells the browser what to do with a request, allow it or block it based on what you've configured. Note the absence of this configuration will render your server in-secure.

(in order or appearance):

- `X-Frame-Options` prevents **click jacking** by not allowing your webpage to be loaded in a frame or iframe. The SAMEORIGIN property allows a page to be loaded in a frame on the same origin as the page itself only.
- `X-XSS-Protection` blocks any request that is deemed to be [Cross Site Scripting Attack](#CrossSiteScriptingAttack).
- `X-Content-Type-Options` protects against MIME type confusion attacks, ensures to load a resource only if the correct MIME type of is a matched against what is expected.
- `Content-Security-Policy` allows you to set a custom policy on what scripts, urls, images, fonts and resources are allowed to execute in your webpage. Any resource that is not whitelisted will not be allowed to execute.

### Tools

1. [ImmuniWeb](https://www.immuniweb.com/websec/)
2. [Security Headers](https://securityheaders.com/)
3. [OWASP cheat sheets](https://github.com/OWASP/CheatSheetSeries)

### References

- [Scott Helme](https://scotthelme.co.uk/content-security-policy-an-introduction/)
- [MDN CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/default-src)
- [Snyk + WebpageSpeedTest integration](blog/test-website-security-with-webpagetest-integration/)
- [Netlify Headers](https://docs.netlify.com/routing/headers/)
- [Nginx Headers](https://www.nginx.com/resources/wiki/start/topics/examples/server_blocks/)
- [Apache Headers](https://httpd.apache.org/docs/current/mod/mod_headers.html)
- [IIS Headers](https://docs.microsoft.com/en-us/iis/configuration/system.webserver/httpprotocol/customheaders/)
