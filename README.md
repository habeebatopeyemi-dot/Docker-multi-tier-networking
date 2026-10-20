# Docker Multi-Tier Network Architecture 

This repository demonstrates a secure, multi-tier container networking pattern using custom Docker bridge networks.

## Architecture

- **`frontend-net` (Public Bridge):** Connects Nginx (Port 9000) and Node.js API.
- **`backend-net` (Isolated Internal Bridge):** Connects Node.js API and PostgreSQL. Uses `--internal` to prevent internet access.

### Security Guarantees
1. **Frontend Isolation:** The Nginx container cannot reach the database directly (`db-app`).
2. **Database Protection:** PostgreSQL is not exposed to the host machine (no `-p` flag) and has no outbound internet connectivity.
3. **Controlled Routing:** Node.js acts as the secure bridge between the public frontend network and the internal database network.

## Project Structure

```text
docker-network-demo/
├── index.html        # Frontend HTML
├── Dockerfile.nginx  # Nginx Reverse Proxy Dockerfile
├── server.js         # Express API
├── Dockerfile.node   # Express Backend Dockerfile
└── README.md
```
## How to Run

### Create Networks
```bash
docker network create frontend-net
docker network create --internal backend-net
```
### Run Containers

# Database
```bash
docker run -d --name db-app --network backend-net -e POSTGRES_PASSWORD=secret postgres:alpine
```
# Backend API
```bash
docker run -d --name backend-app --network frontend-net my-backend
docker network connect backend-net backend-app
```
# Frontend Proxy
```bash
docker run -d --name frontend-app --network frontend-net -p 9000:80 my-frontend
```
# Verify
Access http://localhost:9000 in your browser or run curl http://localhost:9000/api/data.

