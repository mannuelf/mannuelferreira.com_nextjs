---
title: 'Install Minikube on Ubuntu 22.04 using bash'
excerpt: 'Some helpful commands to install the kubectl the Kubenetes tool to help you manager your Kubernetes cluster'
coverImage: 'https://res.cloudinary.com/mannuel/image/upload/v1669098514/images/kubernetes-cover.png'
date: '2022-11-23T07:58:00.322Z'
author:
  name: M Ferreira
  picture: 'https://res.cloudinary.com/mannuel/image/upload/f_auto/v1604067445/images/mee.jpg'
ogImage:
  url: 'https://res.cloudinary.com/mannuel/image/upload/v1669098514/images/kubernetes-cover.png'
---

After installing [kubectl](https://mannuelferreira.com/posts/install-kubectl-on-ubuntu-22-04) you will need Minikube.

Minikube will run your kubernetes cluster on your local machine, it will essentially be you `server like container` on which your Docker containers will run.

You will need Docker in order to use, or any other flavour of container/virtual manachine manager (Hyperkit, Podman, Virtualbox, VMware Fusion/Workstation, KVM, Hyper-v).

## 1. Download the minikube binary

In your terminal, make sure you at your home directory.

```bash
cd
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

This is permission error while minikube trys to connect to Docker daemon, to fix run the following command:

```bash
sudo usermod -aG docker $USER && newgrp docker
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

Now we can use `kubectl` cli tools

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
