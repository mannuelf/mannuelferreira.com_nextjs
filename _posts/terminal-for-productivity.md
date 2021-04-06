---
title: 'Terminal for productivity'
excerpt: 'If you are are software developer, that means if you build websites, backend code, configure databases, configure servers and are using html, javascript, work with php, node js, .net, ruby, python insert favourite language.'
coverImage: '/assets/blog/dynamic-routing/cover.jpg'
date: '2020-03-16T05:35:07.322Z'
author:
  name: M Ferreira
  picture: 'https://res.cloudinary.com/mannuel/image/upload/v1604067445/images/mee.jpg'
ogImage:
  url: 'https://res.cloudinary.com/mannuel/image/upload/v1604067445/images/mee.jpg'
---

# Terminal for productivity

If you are are software developer, that means if you build websites, backend code, configure databases, configure servers and are using html, javascript, work with php, node js, .net, ruby, python insert favourite language.

If this is you and you are you just starting out.
 
The best self investement you can do to boost your productivity is to learn the terminal and get comfortable moving around your computer using the terminal.

You dont have know all the commands right up front. You only need a few key commands lets me show a few. and slowly build from there.

## Make Directory

```bash
mkdir my-project/
```

## Change Directory

Go to specific folder, type first 2/3 letters and hit the tab key for autocompletion

```bash
cd folder-name/
```

Go back a directory
```bash
cd ..
```

Go back home (on unix based systems)
```bash
cd ~/
```

## List directory

Once youve arived in the directory, you of course want to list the contents

```bash
ls
```

To see more details about when the files were last updated, or if you want to see the file permissions

```bash
ls -la
```

## Adding new files

Creating files is easy, using the touch command.

```bash
touch module.js
```

## Removing files

As easy as creating, deleting is simple as two commands

```bash
rm another-module.js
```

## Removing folders

To delete a folder you need to specify the `-r` flag to remove the parent directory and its sub directories.

```bash
rm -r folder-name/
```
Some times you want to force remove.

```bash
rm -rf some-folder/
```
