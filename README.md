<div align="center">
  
# Ecommerce Mern
</div>
<p>This is a Full-stack Ecommerce website.
</p>

* Node provides the backend environment for this application
* Express middleware is used to handle requests, routes, isAuthenticatedUser
* Mongoose schemas to model the application data
* React for displaying UI components
* Redux to manage application's state
* Redux Thunk middleware to handle asynchronous redux actions

# 📚 Tech Stack
Frontend: React, Redux, Axios
Backend: Node.js, Express.js, MongoDB
Authentication: JWT, BcryptJS
Payment: PayPal
Deployment: Docker, Docker Compose, Nginx, AWS EC2
CI/CD: Jenkins, GitHub Webhook
Security: Trivy


# 🏗️ Application Architecture

```text
                         Internet
                            │
                            ▼
                     AWS EC2 Instance
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
      Frontend :3002                 Admin :3001
             │                             │
             │                             │
             └──────────────┬──────────────┘
                            │
                           /api
                            │
                            ▼
                     Nginx Reverse Proxy
                            │
                            ▼
                     Backend :5000
                            │
                            ▼
                     MongoDB Atlas
```

The frontend and admin applications use `/api` for backend requests.

They do **not** contain the EC2 public IP.

Nginx forwards the API requests internally to:

```text
http://backend:5000
```

Here, `backend` is the Docker Compose service name.

In MONGO_DB Cluster
```text
Always check you have added your current IP Address.
```

---

# 📥 Installation and Setup

## 1. Clone the Repository

Clone the repository:

```bash
git clone https://github.com/KuldeepSahoo917/mern-ecommerce.git
```

Move into the project directory:

```bash
cd mern-ecommerce
```

---

# 🔐 2. Configure Environment Variables

The backend requires environment variables for MongoDB, authentication, and PayPal.

Create the backend `.env` file:

```bash
vi backend/.env
```
```bash
notepad backend/.env
```

Or create it manually inside the `backend` folder.

Add your environment variables:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
```

Replace the values with your actual credentials.

> ⚠️ **Important:** Never commit your `.env` file or expose your credentials publicly.

---

# 🌐 3. Frontend Environment Variables

The frontend does **not** require:

```env
REACT_APP_API_URL=IP-ADDRESS:5000
```

The frontend uses:

```text
/api
```

for API requests.

Nginx automatically forwards these requests to the backend container.

---

# 🖥️ 4. Admin Environment Variables

The admin application also does **not** require:

```env
REACT_APP_API_URL=IP-ADDRESS:5000
```

The admin application uses:

```text
/api
```

for API requests.

Nginx forwards these requests to:

```text
http://backend:5000
```

---

# 🐳 5. Install Docker

Make sure Docker is installed on the machine.

Check Docker:

```bash
docker --version
```

Check Docker Compose:

```bash
docker compose version
```

If both commands display their versions, Docker is ready.

---

# 🏗️ 6. Build and Run the Application

From the project root directory:

```bash
docker compose up -d --build
```

This command builds the Docker images and starts all application services.

Docker Compose will:

```text
docker-compose.yml
        │
        ▼
Build Backend Image
        │
        ▼
Build Frontend Image
        │
        ▼
Build Admin Image
        │
        ▼
Create Docker Network
        │
        ▼
Start Containers
```

The `-d` option runs the containers in detached mode.

The `--build` option tells Docker Compose to build the images before starting the containers.

---

# 📦 7. Docker Build Process

The frontend and admin applications use a multi-stage Docker build.

The process is:

```text
React Source Code
       │
       ▼
   npm install
       │
       ▼
   npm run build
       │
       ▼
React Production Build
       │
       ▼
Nginx Docker Image
       │
       ▼
Docker Container
```

The React production build is created using:

```bash
npm run build
```

The generated production files are then copied into the Nginx image.

Nginx serves these optimized production files.

The backend is built separately using its Node.js Dockerfile.

---

# 🔍 8. Check Running Containers

After starting the application, check the Docker Compose services:

```bash
docker compose ps
```

You can also check all running containers:

```bash
docker ps
```

You should see the following containers:

```text
mern-backend
mern-frontend
mern-admin
```
---
# JENKINS SETUP
---
---
# TRIVY IMAGE SCAN
---
# 🌍 9. Access the Application

Replace `YOUR-EC2-IP` with your EC2 public IP address.

### Frontend

```text
http://YOUR-EC2-IP:3002
```

### Admin Panel

```text
http://YOUR-EC2-IP:3001
```

### Backend

```text
http://YOUR-EC2-IP:5000
```

---

# 🔄 10. API Request Flow

The frontend sends API requests using:

```text
/api
```

For example:

```text
/api/products
```

The request flow is:

```text
Browser
   │
   ▼
Frontend :3002
   │
   ▼
Nginx
   │
   ▼
/api/products
   │
   ▼
backend:5000
   │
   ▼
Express.js
   │
   ▼
MongoDB Atlas
```

The admin panel follows the same architecture:

```text
Browser
   │
   ▼
Admin :3001
   │
   ▼
Nginx
   │
   ▼
/api
   │
   ▼
backend:5000
```

---

# 🛑 11. Stop the Application

To stop and remove the Docker containers:

```bash
docker compose down
```

This removes the containers and Docker Compose network.

The Docker images are not removed.

---

# ▶️ 12. Start the Application Again

If the containers already exist, start them using:

```bash
docker compose up -d
```

There is no need to rebuild the images unless you have made application or Dockerfile changes.

---

# 🔨 13. Rebuild After Code Changes

Whenever you make changes to the application source code, rebuild the Docker images:

```bash
docker compose up -d --build
```

Docker Compose will rebuild the required images and restart the services when necessary.

For a complete stop and rebuild:

```bash
docker compose down
docker compose up -d --build
```

---

# 🧹 14. Force a Fresh Docker Build

If you experience Docker caching issues, use:

```bash
docker compose down
```

Then:

```bash
docker compose build --no-cache
```

Then start the containers:

```bash
docker compose up -d
```

The `--no-cache` option forces Docker to rebuild the images without using previous build layers.

---

# 📋 15. View Application Logs

View logs from all services:

```bash
docker compose logs
```

Follow logs continuously:

```bash
docker compose logs -f
```

### Backend Logs

```bash
docker compose logs backend
```

### Frontend Logs

```bash
docker compose logs frontend
```

### Admin Logs

```bash
docker compose logs admin
```

---

# 🔄 16. Restart Services

Restart the backend:

```bash
docker compose restart backend
```

Restart the frontend:

```bash
docker compose restart frontend
```

Restart the admin panel:

```bash
docker compose restart admin
```

---

# 🐳 17. Docker Images

View all Docker images:

```bash
docker images
```

---

# 📦 18. Docker Containers

View running containers:

```bash
docker ps
```

View all containers, including stopped containers:

```bash
docker ps -a
```

---

# 🗑️ 19. Remove Containers and Images

To stop and remove the containers:

```bash
docker compose down
```

To remove the containers and Docker images created by Compose:

```bash
docker compose down --rmi all
```

> ⚠️ Use `--rmi all` only when you want to remove the Docker images as well.

---

# ☁️ AWS EC2 Deployment

## 20. Connect to the EC2 Instance

Connect to your Ubuntu EC2 instance using SSH.

After connecting, clone the repository:

```bash
git clone https://github.com/KuldeepSahoo917/mern-ecommerce.git
```

Move into the project:

```bash
cd mern-ecommerce
```

---

# 🔐 21. Configure Backend Environment on EC2

Create the backend environment file:

```bash
nano backend/.env
```

Add:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
```

Save the file.

---

# 🐳 22. Deploy the Application on EC2

From the project root:

```bash
docker compose up -d --build
```

Check the containers:

```bash
docker compose ps
```

If all services are running, the application is ready.

---

# 🔒 23. AWS Security Group

If accessing the application directly through the EC2 public IP, allow the required ports in the EC2 Security Group:

```text
3001 → Admin Panel
3002 → Frontend
5000 → Backend API
```

For production environments, it is recommended to place the application behind a proper reverse proxy/load balancer and avoid exposing unnecessary ports publicly.

---

# 🔄 24. Update the Application

After making new changes and pushing them to GitHub, connect to your EC2 instance.

Move into the project:

```bash
cd mern-ecommerce
```

Pull the latest changes:

```bash
git pull origin ui-redesign
```

Then rebuild and start the application:

```bash
docker compose up -d --build
```

Check the deployment:

```bash
docker compose ps
```

---

# 📌 25. EC2 Public IP

The React applications do not contain a hardcoded EC2 public IP for API communication.

The applications use:

```text
/api
```

and Nginx forwards the requests internally to:

```text
backend:5000
```

Therefore, if the EC2 public IP changes, the React applications do not need to be rebuilt just to update the API URL.

However, the URL used to access the application will change.

For example:

```text
Old:
http://OLD-IP:3002

New:
http://NEW-IP:3002
```

For a permanent public IP, an AWS Elastic IP can be associated with the EC2 instance.

---

# ⚡ Quick Start

For a fresh deployment:

```bash
git clone https://github.com/KuldeepSahoo917/mern-ecommerce.git

cd mern-ecommerce

nano backend/.env

docker compose up -d --build

docker compose ps
```

Then access:

```text
Frontend → http://YOUR-EC2-IP:3002
Admin    → http://YOUR-EC2-IP:3001
Backend  → http://YOUR-EC2-IP:5000
```

---

# 🛠️ Common Docker Commands

### Check Docker version

```bash
docker --version
```

### Check Docker Compose version

```bash
docker compose version
```

### Build and start application

```bash
docker compose up -d --build
```

### Start existing containers

```bash
docker compose up -d
```

### Stop application

```bash
docker compose down
```

### Check services

```bash
docker compose ps
```

### Check containers

```bash
docker ps
```

### Check all containers

```bash
docker ps -a
```

### Check images

```bash
docker images
```

### View logs

```bash
docker compose logs -f
```

### Rebuild without cache

```bash
docker compose build --no-cache
```

---

# 🔐 Security

Never commit sensitive credentials to GitHub.

Do not expose:

```text
backend/.env
frontend/.env
admin/.env
```

Make sure environment files are included in `.gitignore`.

Example:

```gitignore
.env
*.env
```

---


### How to run locally

git clone https://github.com/KuldeepSahoo917/mern-ecommerce.git

For Client:
```bash
cd mern-ecommerce/frontend
```
//Insert your respective environment variables in .env file
//REACT_APP_API_URL=IP-ADDRESS:5000

For Server:
```bash
cd mern-ecommerce/backend
```
Insert your respective environment variables in .env file

For Admin:
```bash
cd mern-ecommerce/admin
```
//Insert your respective environment variables in .env file
//REACT_APP_API_URL=IP-ADDRESS:5000

Install all dependencies:
```bash
npm install
```
Before running next Command
--> In Powershell
```bash
$env:NODE_OPTIONS="--openssl-legacy-provider"
```
--> In Linux
```bash
export NODE_OPTIONS=--openssl-legacy-provider
```
```bash
npm start
```




