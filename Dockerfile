# Use the official Node.js image as the base image
FROM node:lts

# Install necessary dependencies
RUN apt-get update && apt-get install -y libnss3

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Command to run the application
CMD ["npm", "start"]
