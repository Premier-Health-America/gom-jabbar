# Use the official Node.js image as the base image
FROM node:18

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app will run on (adjust if necessary)
EXPOSE 5001

FROM postgres
COPY src/config/init-db.sql /docker-entrypoint-initdb.d/

# Command to run the app in development mode
CMD ["npm", "run", "dev"]