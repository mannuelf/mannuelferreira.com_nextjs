---
title: 'Setup a response HTTP Header security policy'
excerpt: 'A developers job is never done 🙂 . After deploying your website to Netlify naturally you run some performance tests using WebPageSpeedTest. You might notice and alarming red `F` or `E` in the top right of the screen. What the heck is that?'
coverImage: 'https://res.cloudinary.com/mannuel/image/upload/v1623933965/images/git-article.png'
date: '2021-06-22T06:45:00.322Z'
author:
  name: 'M Ferreira'
  picture: 'https://res.cloudinary.com/mannuel/image/upload/v1604067445/images/mee.jpg'
ogImage:
  url: 'https://res.cloudinary.com/mannuel/image/upload/v1623933965/images/git-article.png'
---

## Security Response HTTP Headers

A developers job is never done 🙂 .

After deploying your website to Netlify (any server) naturally you run some performance tests using [WebPageSpeedTest](https://www.webpagetest.org/). You might notice and alarming red `F` or `E` in the top right of the screen. What the heck is that?

## TLDR

![WebPageSpeedTest](/public/assets/blog/setup-netlify-security-headers/webpagespeedtest_0001.png)

This is a `CSP` (Content Security Policy) score, it shows whether any security policies are configured and to what degree. The CSP provides directives to help protect your website from nefarious actions. It can help prevent clickjacking, cross-site scripting and illegal embedding of your webpage in an frame/iframe.

Create a `netlify.toml` file and place this script within, deploy and test one more time.

### netlify.toml

```bash
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Content-Security-Policy = "default-src 'self'; frame-ancestors 'self'; form-action 'self'"
```

`Test result`

![WebPageSpeedTest](/public/assets/blog/setup-netlify-security-headers/webpagespeedtest_success.png)

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

- `X-Frame-Options` prevents **click jacking** by not allowing your webpage to be loaded in a frame or iframe. The SAMEORIGIN directive allows a page to be loaded in a frame on the same origin as the page itself
- `X-XSS-Protection` block any request that is deemed to be [Cross Site Scripting Attack](#CrossSiteScriptingAttack).
- `X-Content-Type-Options` protects against MIME type confusion attacks, ensures to load a resource only if the correct MIME type of is a matched against what is expected.
- `Content-Security-Policy` what requests to block, allow and from what domains.

### References

- [OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html#http-headerss)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/default-src)
- [Snyk](blog/test-website-security-with-webpagetest-integration/)
- [Netlify](https://docs.netlify.com/routing/headers/)
- [Nginx](https://www.nginx.com/resources/wiki/start/topics/examples/server_blocks/)
- [Apache](https://httpd.apache.org/docs/current/mod/mod_headers.html)
- [IIS](https://docs.microsoft.com/en-us/iis/configuration/system.webserver/httpprotocol/customheaders/)

```bash
Refused to load the script 'https://www.googletagmanager.com/gtag/js?id=G-H5QZ22R2QN' because it violates the following Content Security Policy directive: "script-src 'self'". Note that 'script-src-elem' was not explicitly set, so 'script-src' is used as a fallback.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:1 Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-n1NauWTrB7agVRwmBfOrO8tgbYt/DRdn67stxeua1q8='), or a nonce ('nonce-...') is required to enable inline execution.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:1 Refused to load the script 'https://www.googletagmanager.com/gtag/js?id=G-H5QZ22R2QN' because it violates the following Content Security Policy directive: "script-src 'self'". Note that 'script-src-elem' was not explicitly set, so 'script-src' is used as a fallback.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:8 Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-n1NauWTrB7agVRwmBfOrO8tgbYt/DRdn67stxeua1q8='), or a nonce ('nonce-...') is required to enable inline execution.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:15 Refused to load the stylesheet 'https://d33wubrfki0l68.cloudfront.net/css/94947fcdbb847edd9634d37f8e652420c8931ee3/_next/static/css/56112d60a5b5a19ee173.css' because it violates the following Content Security Policy directive: "style-src 'self'". Note that 'style-src-elem' was not explicitly set, so 'style-src' is used as a fallback.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:15 Refused to load the stylesheet 'https://d33wubrfki0l68.cloudfront.net/css/94947fcdbb847edd9634d37f8e652420c8931ee3/_next/static/css/56112d60a5b5a19ee173.css' because it violates the following Content Security Policy directive: "style-src 'self'". Note that 'style-src-elem' was not explicitly set, so 'style-src' is used as a fallback.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:1 Refused to load the script 'https://d33wubrfki0l68.cloudfront.net/bundles/1bd814911a09d5e56b421403a658cbae5d2685ce.js' because it violates the following Content Security Policy directive: "script-src 'self'". Note that 'script-src-elem' was not explicitly set, so 'script-src' is used as a fallback.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:15 Refused to apply inline style because it violates the following Content Security Policy directive: "style-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-YgZnhKlCW+KB/IlmaSm1nLnpkxF+Q+i1GCFJb19jjZU='), or a nonce ('nonce-...') is required to enable inline execution.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:15 Refused to apply inline style because it violates the following Content Security Policy directive: "style-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-Jm/xxsNTmsOOuRob6di/aT5qIoP490QyjtL7m5YnfWM='), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:15 Refused to apply inline style because it violates the following Content Security Policy directive: "style-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-Ljy7H99j8bpv7OY6QzOrOkiDan4SDXENbDwoLj+PByg='), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:15 Refused to apply inline style because it violates the following Content Security Policy directive: "style-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-lSmhTH3Eqj5ahT1Rt9ER5ohV4Y9ua8v8Kh9wXAnQbPY='), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:15 Refused to apply inline style because it violates the following Content Security Policy directive: "style-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-d72pVhmRTNXT2Gr2OHFRLnVaHBfiBI5EvDCF6tA924Y='), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:15 Refused to load the image 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iTmFOIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIvPg==' because it violates the following Content Security Policy directive: "img-src 'self'".

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:15 Refused to load the image 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' because it violates the following Content Security Policy directive: "img-src 'self'".

inpage.js:1 You are accessing the MetaMask window.web3.currentProvider shim. This property is deprecated; use window.ethereum instead. For details, see: https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3
get @ inpage.js:1
ef84 @ cxWeb3.js:18
r @ cxWeb3.js:1
176c @ cxWeb3.js:1
r @ cxWeb3.js:1
dcd6 @ cxWeb3.js:18
r @ cxWeb3.js:1
(anonymous) @ cxWeb3.js:1
(anonymous) @ cxWeb3.js:1
60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:1 Refused to load manifest from 'https://60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/favicon/site.webmanifest' because it violates the following Content Security Policy directive: "default-src 'none'". Note that 'manifest-src' was not explicitly set, so 'default-src' is used as a fallback.

Navigated to https://60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/
60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:1 Refused to load the script 'https://www.googletagmanager.com/gtag/js?id=G-H5QZ22R2QN' because it violates the following Content Security Policy directive: "script-src 'self'". Note that 'script-src-elem' was not explicitly set, so 'script-src' is used as a fallback.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:1 Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-n1NauWTrB7agVRwmBfOrO8tgbYt/DRdn67stxeua1q8='), or a nonce ('nonce-...') is required to enable inline execution.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:1 Refused to load the script 'https://www.googletagmanager.com/gtag/js?id=G-H5QZ22R2QN' because it violates the following Content Security Policy directive: "script-src 'self'". Note that 'script-src-elem' was not explicitly set, so 'script-src' is used as a fallback.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:8 Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-n1NauWTrB7agVRwmBfOrO8tgbYt/DRdn67stxeua1q8='), or a nonce ('nonce-...') is required to enable inline execution.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:15 Refused to load the stylesheet 'https://d33wubrfki0l68.cloudfront.net/css/94947fcdbb847edd9634d37f8e652420c8931ee3/_next/static/css/56112d60a5b5a19ee173.css' because it violates the following Content Security Policy directive: "style-src 'self'". Note that 'style-src-elem' was not explicitly set, so 'style-src' is used as a fallback.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:15 Refused to load the stylesheet 'https://d33wubrfki0l68.cloudfront.net/css/94947fcdbb847edd9634d37f8e652420c8931ee3/_next/static/css/56112d60a5b5a19ee173.css' because it violates the following Content Security Policy directive: "style-src 'self'". Note that 'style-src-elem' was not explicitly set, so 'style-src' is used as a fallback.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:1 Refused to load the script 'https://d33wubrfki0l68.cloudfront.net/bundles/1bd814911a09d5e56b421403a658cbae5d2685ce.js' because it violates the following Content Security Policy directive: "script-src 'self'". Note that 'script-src-elem' was not explicitly set, so 'script-src' is used as a fallback.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:15 Refused to apply inline style because it violates the following Content Security Policy directive: "style-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-YgZnhKlCW+KB/IlmaSm1nLnpkxF+Q+i1GCFJb19jjZU='), or a nonce ('nonce-...') is required to enable inline execution.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:15 Refused to apply inline style because it violates the following Content Security Policy directive: "style-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-Jm/xxsNTmsOOuRob6di/aT5qIoP490QyjtL7m5YnfWM='), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:15 Refused to apply inline style because it violates the following Content Security Policy directive: "style-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-Ljy7H99j8bpv7OY6QzOrOkiDan4SDXENbDwoLj+PByg='), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:15 Refused to apply inline style because it violates the following Content Security Policy directive: "style-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-lSmhTH3Eqj5ahT1Rt9ER5ohV4Y9ua8v8Kh9wXAnQbPY='), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:15 Refused to apply inline style because it violates the following Content Security Policy directive: "style-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-d72pVhmRTNXT2Gr2OHFRLnVaHBfiBI5EvDCF6tA924Y='), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present.

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:15 Refused to load the image 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iTmFOIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIvPg==' because it violates the following Content Security Policy directive: "img-src 'self'".

60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:15 Refused to load the image 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' because it violates the following Content Security Policy directive: "img-src 'self'".

inpage.js:1 You are accessing the MetaMask window.web3.currentProvider shim. This property is deprecated; use window.ethereum instead. For details, see: https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3
get @ inpage.js:1
ef84 @ cxWeb3.js:18
r @ cxWeb3.js:1
176c @ cxWeb3.js:1
r @ cxWeb3.js:1
dcd6 @ cxWeb3.js:18
r @ cxWeb3.js:1
(anonymous) @ cxWeb3.js:1
(anonymous) @ cxWeb3.js:1
60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/:1 Refused to load manifest from 'https://60d2b0fc45694e0008dd4d32--mannuelferreira.netlify.app/favicon/site.webmanifest' because it violates the following Content Security Policy directive: "default-src 'none'". Note that 'manifest-src' was not explicitly set, so 'default-src' is used as a fallback.
```
