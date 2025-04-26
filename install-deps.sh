#!/bin/bash

# Check if we're running on Linux
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "Installing Playwright dependencies for Linux..."
    # Update package list
    apt-get update
    # Install all required dependencies for Playwright
    apt-get install -y \
        libnss3 \
        libnspr4 \
        libgbm1 \
        libx11-xcb1 \
        libxcomposite1 \
        libxcursor1 \
        libxdamage1 \
        libxext6 \
        libxi6 \
        libxtst6 \
        libcups2 \
        libxss1 \
        libxrandr2 \
        libasound2 \
        libpangocairo-1.0-0 \
        libatk1.0-0 \
        libatk-bridge2.0-0 \
        libgtk-3-0
else
    echo "🤖 Skipping Linux dependencies installation - not running on Linux"
fi
