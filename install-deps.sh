#!/bin/bash

# Check if we're running on Linux
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    yum install -y nss libgbm
else
    echo "🤖 Skipping Linux dependencies installation - not running on Linux"
fi
