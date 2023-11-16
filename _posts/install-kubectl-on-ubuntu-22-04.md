---
published: true
title: "Install kubectl on Ubuntu 22.04 using bash"
excerpt: "Some helpful commands to install the kubectl the Kubernetes tool to help you manager your Kubernetes cluster."
category: "Kubernetes"
tags: "Ubuntu, Docker, Linux"
coverImage: "https://res.cloudinary.com/mannuel/image/upload/v1669098514/images/kubernetes-cover.png"
date: "2022-11-22T06:25:00.322Z"
author:
  name: M Ferreira
  picture: "https://res.cloudinary.com/mannuel/image/upload/f_auto/v1604067445/images/mee.jpg"
ogImage:
  url: "https://res.cloudinary.com/mannuel/image/upload/v1669098514/images/kubernetes-cover.png"
---

Getting started with Kubernetes you will need `kubectl` command line tool.

## 1. Install kubectl binary

This command will bring down the latest version.

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```

If you want a specific version do:

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```

## Validate the binary

You should validate your download by using the checksum file, get it here:

```bash
curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
```

Validate the kubectl binary agains the checksum file:

```bash
echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check
```

If ok it should output:

> kubectl: OK

If it failed for some reason `sha256` exits with nonzero status and outputs:

> kubectl: FAILED sha256sum: WARNING: 1 computed checksum did NOT match

Check you URL and try again.

## 3. Finally Install kubectl

```bash
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

Command downloads the binary to you local bin to a folder called `kubectl` with the required permissions.

### Chmod owner

✅ Owner can read

✅ Owner can write

✅ Owner can execute

### Chmod group

✅ Group can read

❌ Group can't write

✅ Group can execute

### Chmod other

✅ Others can read

❌ Others can't write

❌ Others can execute

## 4. Check to ensure all went well

```bash
kubectl version
```

outputs:

```js
Client Version: v1.25.4
Kustomize Version: v4.5.7
Error from server (NotFound): the server could not find the requested resource
```
