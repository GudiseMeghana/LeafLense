# 🚀 AWS EC2 Deployment Guide for Leaf-Lense

This guide walks you through deploying the full-stack Leaf-Lense app (FastAPI + React + PostgreSQL) on AWS EC2 using Docker Compose.

---

## 1. Launch an AWS EC2 Instance

1. Go to the [AWS EC2 Console](https://console.aws.amazon.com/ec2/).
2. Click **Launch Instance**.
3. Choose an Ubuntu Server 22.04 LTS (or Amazon Linux 2) AMI.
4. Select an instance type (t2.medium or better recommended).
5. Configure storage (default is fine for most cases).
6. Configure security group:
   - Allow **SSH (22)** from your IP.
   - Allow **HTTP (80)** from anywhere (for web access).
   - Allow **TCP 3000** (frontend), **8000** (backend/API), and **5432** (Postgres, optional/private) from your IP or 0.0.0.0/0 for testing.
7. Launch and download your key pair (e.g., `my-key.pem`).
8. Note your instance's **Public IPv4 address** or **Public DNS**.

---

## 2. Connect to Your EC2 Instance

```sh
ssh -i /path/to/my-key.pem ubuntu@<EC2_PUBLIC_IP>
```
- Replace `/path/to/my-key.pem` with your key file path.
- Replace `<EC2_PUBLIC_IP>` with your instance's public IP.

---

## 3. Install Docker & Docker Compose

```sh
sudo apt update
sudo apt install -y docker.io git
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
# Log out and back in, or run:
newgrp docker
sudo apt install -y docker-compose-plugin
```

---

## 4. Clone Your Repository

```sh
git clone https://github.com/GudiseMeghana/LeafLense.git
cd LeafLense
```

---

## 5. Set Up Environment Variables

```sh
cp .env.example .env
nano .env
```
- Edit `.env` as needed (set DB credentials, secrets, etc).

---

## 6. Build and Run the App

```sh
docker compose up --build -d
```
- The `-d` flag runs containers in the background.

---

## 7. Check Running Containers

```sh
docker ps
```

---

## 8. (Optional) View Logs

```sh
docker compose logs -f
```

---

## 9. Access Your App

- **Frontend:**  
  http://<EC2_PUBLIC_IP>:3000
- **Backend/API docs:**  
  http://<EC2_PUBLIC_IP>:8000/docs

---

## 10. (Optional) Set Up a Domain and HTTPS
- Point your domain to your EC2 public IP.
- Use Nginx or AWS Certificate Manager for HTTPS (not covered here).

---

## 11. (Optional) Stop the App

```sh
docker compose down
```

---

## Troubleshooting
- Make sure your security group allows inbound ports 22, 80, 3000, 8000, 5432.
- If you change `.env`, re-run: `docker compose up --build -d`
- For persistent data, use Docker volumes (already set up in `docker-compose.yml`).

---

**You are now running Leaf-Lense on AWS EC2!**
