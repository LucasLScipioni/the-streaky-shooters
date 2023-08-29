# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY . /app

# Install the app's dependencies
RUN yarn

# Copy the rest of the app's files to the working directory
COPY . .

# Build the React app
RUN yarn build

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the app
CMD ["yarn", "start"]
