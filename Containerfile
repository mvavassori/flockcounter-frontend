# Use Node 20 as the base image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app
# Copies all files matching the pattern package*.json from the current directory to the root directory of the image
COPY package*.json ./

# Installs the dependencies specified in the package.json file, using the exact versions locked in the package-lock.json file
RUN npm ci

# copies all files and directories from the current directory (where the Dockerfile is located) to the working directory in the container (/app)
COPY . .

# Build your Next.js application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the application (next start)
CMD ["npm", "start"]