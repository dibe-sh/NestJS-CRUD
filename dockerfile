# Step 1: Use Node 20 as the base image
FROM node:20-alpine

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy root-level files and backend-specific files
COPY package.json yarn.lock /app/
COPY . /app/

ENV UPLOAD_DIR=/app/uploads
RUN mkdir -p /app/uploads

# Step 4: Install dependencies with Yarn Workspaces
RUN yarn
RUN npx prisma generate

# Step 5: Install NestJS CLI globally (optional)
RUN yarn global add @nestjs/cli

# Step 6: Set environment and expose port 7002
ENV NODE_ENV=${NODE_ENV}
EXPOSE ${PORT}

# Step 7: Start the backend server
CMD ["yarn", "dev"]