---
title: 'Login to VPS without a password using SSH'
excerpt: 'Connecting to your VPS via ssh without a password is groovy, here how you do it.'
category: 'Linux'
tags: 'bash, ssh, vps'
date: '2022-12-02T07:35:00.322Z'
author:
  name: 'M Ferreira'
  picture: 'https://res.cloudinary.com/mannuel/image/upload/f_auto/v1604067445/images/mee.jpg'
ogImage:
  url: 'https://res.cloudinary.com/mannuel/image/upload/v1676011525/mfcom/ssh-login.png'
coverImage: 'https://res.cloudinary.com/mannuel/image/upload/v1676011525/mfcom/ssh-login.png'
---


It is possible to ssh into your Linux VPS without having to use a password.

Here are the steps:

1. Create ssh key if you dont have one already
2. Add the public ssh to the remote servers `authorized_keys` list

> If you already have an ssh key skip to step 2

## 1 Create ssh key

First go to you `.ssh` folder

```bash
cd ~/.ssh
```

Then type (to create the ssh key)

```bash
ssh-keygen -t rsa -b 4096 -C "your@email.com" 
```

Follow the prompts

- push enter for each question to accept the defaults
- it will create a prive and public ssh key called `id_rsa` and `id_rsa.pub`
- do not enter a passwords

It will look like this:

```bash
Generating public/private rsa key pair.
Enter file in which to save the key (/home/mannuel/.ssh/id_rsa): id_rsa_test
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in id_rsa
Your public key has been saved in id_rsa.pub
The key fingerprint is:
SHA256:52n1XC/4hSWgwC8gqK0Ld0ym/fb3BBXbhHypgmQFUHI your@email.com
The key's randomart image is:
+---[RSA 4096]----+
|      ooEo...... |
|   .   +o   o=o  |
|  . . .oo.  +o.  |
| o   . ..o.o..   |
|. . o   S =.. . o|
| . *     + + + =.|
|o o +     + o = o|
|.o . ..  ... . o |
|.    ..... .. .  |
+----[SHA256]-----+
```

## 2 Add key to `authorized_keys` list

```bash
 cat ~/.ssh/id_rsa.pub | ssh yourUsername@000.000.00.00 'cat >> ~/.ssh/authorized_keys'
```

you will be prompted to enter your VPS password given for `yourUsername`.

```bash
 cat ~/.ssh/id_rsa.pub | ssh yourUsername@000.000.00.00 'cat >> ~/.ssh/authorized_keys'
 yourUsername@000.000.00.00's password: 
```

Jobs done, you should be able to ssh into VPS without entering a password.
