---
title: "Install Minikube on Ubuntu 22.04"
excerpt: "A simple guide to install minikube, help you get up and running with kubernetes on you local development environment."
category: "Kubernetes"
tags: "Minikube, Docker, Linux"
coverImage: "https://res.cloudinary.com/mannuel/image/upload/v1669098514/images/kubernetes-cover.png"
date: "2022-11-23T07:58:00.322Z"
author:
  name: M Ferreira
  picture: "https://res.cloudinary.com/mannuel/image/upload/f_auto/v1604067445/images/mee.jpg"
ogImage:
  url: "https://res.cloudinary.com/mannuel/image/upload/v1669098514/images/kubernetes-cover.png"
---

In a [previous post](https://mannuelferreira.com/posts/install-kubectl-on-ubuntu-22-04) we installed [kubectl](https://mannuelferreira.com/posts/install-kubectl-on-ubuntu-22-04) now we will install minikube.

Minikube creates a `VM` that will run the Docker containers inside of. Use `kubectl` to manage the lifespan of these containers apps.

![Minikube Diagram](https://res.cloudinary.com/mannuel/image/upload/v1669269521/images/diagram-node-cluster.svg)

You will need Docker in order to use, or any other flavour of container/virtual manachine manager (Hyperkit, Podman, Virtualbox, VMware Fusion/Workstation, KVM, Hyper-v).

## 1. Download the minikube binary

In your terminal, make sure you at your home directory. Type `$HOME` hit enter:

```bash
$HOME
```

Install latest, stable minkikube release on x86-64 Linux

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

## 2. Start minikube

```bash
minikube start
```

## 3. Permission errors

```bash
😄  minikube v1.28.0 on Ubuntu 22.04
👎  Unable to pick a default driver. Here is what was considered, in preference order:
    ▪ docker: Not healthy: "docker version --format {{.Server.Os}}-{{.Server.Version}}" exit status 1: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/version": dial unix /var/run/docker.sock: connect: permission denied
    ▪ docker: Suggestion: Add your user to the 'docker' group: 'sudo usermod -aG docker $USER && newgrp docker' <https://docs.docker.com/engine/install/linux-postinstall/>
💡  Alternatively you could install one of these drivers:
    ▪ kvm2: Not installed: exec: "virsh": executable file not found in $PATH
    ▪ podman: Not installed: exec: "podman": executable file not found in $PATH
    ▪ vmware: Not installed: exec: "docker-machine-driver-vmware": executable file not found in $PATH
    ▪ virtualbox: Not installed: unable to find VBoxManage in $PATH
    ▪ qemu2: Not installed: exec: "qemu-system-x86_64": executable file not found in $PATH

❌  Exiting due to DRV_NOT_HEALTHY: Found driver(s) but none were healthy. See above for suggestions how to fix installed drivers.
```

This is permission error while minikube attempts to connect to Docker daemon, to fix run the following commands:

> DO NOT RUN DOCKER WITH sudo COMMAND ever.
>
> [Docker daemon attack surface](https://docs.docker.com/engine/security/#docker-daemon-attack-surface)

Create a docker group and add your user:

```bash
sudo groupadd docker
```

Add user to the the group

```bash
sudo usermod -aG docker $USER
```

You can also run the following command to activate the changes to groups:

```bash
newgrp docker
```

Then run `minikube start` again:

```bash
minikube start

😄  minikube v1.28.0 on Ubuntu 22.04
✨  Automatically selected the docker driver. Other choices: ssh, none
📌  Using Docker driver with root privileges
👍  Starting control plane node minikube in cluster minikube
🚜  Pulling base image ...
💾  Downloading Kubernetes v1.25.3 preload ...
    > preloaded-images-k8s-v18-v1...:  385.44 MiB / 385.44 MiB  100.00% 11.16 M
    > gcr.io/k8s-minikube/kicbase:  386.27 MiB / 386.27 MiB  100.00% 8.53 MiB p
    > gcr.io/k8s-minikube/kicbase:  0 B [________________________] ?% ? p/s 31s
🔥  Creating docker container (CPUs=2, Memory=3900MB) ...
🐳  Preparing Kubernetes v1.25.3 on Docker 20.10.20 ...
    ▪ Generating certificates and keys ...
    ▪ Booting up control plane ...
    ▪ Configuring RBAC rules ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: storage-provisioner, default-storageclass
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```

## 4. Test it out

Run `minkube` to see the help docs

```bash
minikube
minikube provisions and manages local Kubernetes clusters optimized for development workflows.

Basic Commands:
  start            Starts a local Kubernetes cluster
  status           Gets the status of a local Kubernetes cluster
  stop             Stops a running local Kubernetes cluster
  delete           Deletes a local Kubernetes cluster
  dashboard        Access the Kubernetes dashboard running within the minikube cluster
  pause            pause Kubernetes
  unpause          unpause Kubernetes
```

Now we can use `kubectl` cli tools run `kubectl get po -A` to see the current of kubernetes cluster required to run/operate it.

```bash
kubectl get po -A

NAMESPACE     NAME                               READY   STATUS    RESTARTS   AGE
kube-system   coredns-565d847f94-vj8kq           1/1     Running   0          63s
kube-system   etcd-minikube                      1/1     Running   0          76s
kube-system   kube-apiserver-minikube            1/1     Running   0          76s
kube-system   kube-controller-manager-minikube   1/1     Running   0          76s
kube-system   kube-proxy-mw44h                   1/1     Running   0          63s
kube-system   kube-scheduler-minikube            1/1     Running   0          76s
kube-system   storage-provisioner                1/1     Running   0          75s
```

## 5. Interacting with minikube &amp; other helpfull commands

Minikube Dashboard

```bash
minikube dashboard
```

![Dashboard](https://res.cloudinary.com/mannuel/image/upload/v1669267625/images/minikube-dashboard.png)

```bash
minkube pause
```

```bash
minikube unpause
```

```bash
minikube stop
```

```bash
minikube start
```

```bash
minikube addons list

|-----------------------------|----------|--------------|--------------------------------|
|         ADDON NAME          | PROFILE  |    STATUS    |           MAINTAINER           |
|-----------------------------|----------|--------------|--------------------------------|
| ambassador                  | minikube | disabled     | 3rd party (Ambassador)         |
| auto-pause                  | minikube | disabled     | Google                         |
| cloud-spanner               | minikube | disabled     | Google                         |
| csi-hostpath-driver         | minikube | disabled     | Kubernetes                     |
| dashboard                   | minikube | enabled ✅   | Kubernetes                     |
| default-storageclass        | minikube | enabled ✅   | Kubernetes                     |
| efk                         | minikube | disabled     | 3rd party (Elastic)            |
...
```

Okay we have established all is working, that's all for now. We will create and deploy an application in the next step.
