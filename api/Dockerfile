# Use the official Node.js 16 image as base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the entire application source code
COPY . .

RUN yarn seed
# Expose the port your app runs on
EXPOSE 1337

# Start the app
CMD ["yarn", "start"]
