#!/bin/bash
# setup-react-nginx.sh
# Installs Node.js, npm, and Nginx on a fresh EC2 instance, then clones a
# React app from GitHub, builds it, and serves it via Nginx.
#
# Tested on: Ubuntu 22.04 / 24.04 EC2 instances
#
# Usage:
#   ./setup-react-nginx.sh                         # uses the default repo below, branch 'main'
#   ./setup-react-nginx.sh <git-repo-url> [branch]  # override with a different repo/branch

set -e  # stop immediately if any command fails

# ============================================================
# Config
# ============================================================
REPO_URL="${1:-https://github.com/<your-username>/<your-repo>.git}"
BRANCH="${2:-main}"
NODE_MAJOR="20"                              # LTS release line

REPO_NAME=$(basename -s .git "$REPO_URL")
APP_DIR="$HOME/$REPO_NAME"
NGINX_WEBROOT="/var/www/$REPO_NAME"

# ============================================================
# Step 1: Install Node.js + npm (via NodeSource, gives a current LTS)
# ============================================================
if command -v node >/dev/null 2>&1; then
    echo "=== Step 1: Node.js already installed ($(node -v)), skipping ==="
else
    echo "=== Step 1: Installing Node.js ${NODE_MAJOR}.x and npm ==="
    curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | sudo -E bash -
    sudo apt install -y nodejs
fi
node -v
npm -v

# ============================================================
# Step 2: Install Nginx
# ============================================================
if command -v nginx >/dev/null 2>&1; then
    echo "=== Step 2: Nginx already installed, skipping ==="
else
    echo "=== Step 2: Installing Nginx ==="
    sudo apt update -y
    sudo apt install -y nginx
    sudo systemctl enable nginx
fi

# ============================================================
# Step 3: Clone or pull the repo from GitHub
# ============================================================
if [ -d "$APP_DIR/.git" ]; then
    echo "=== Step 3: Repo already exists, pulling latest changes ($BRANCH) ==="
    cd "$APP_DIR"
    git fetch origin
    git checkout "$BRANCH"
    git pull origin "$BRANCH"
else
    echo "=== Step 3: Cloning repo ($BRANCH) ==="
    git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
fi

# ============================================================
# Step 4: Install dependencies and build
# ============================================================
echo "=== Step 4: Installing dependencies (npm install) ==="
npm install

echo "=== Step 4b: Building production bundle (npm run build) ==="
npm run build

if [ ! -d "dist" ]; then
    echo "ERROR: Build did not produce a dist/ folder. Check the build output above."
    exit 1
fi

# ============================================================
# Step 5: Deploy build output to Nginx webroot
# ============================================================
echo "=== Step 5: Deploying build to Nginx webroot ($NGINX_WEBROOT) ==="
sudo mkdir -p "$NGINX_WEBROOT"
sudo rm -rf "${NGINX_WEBROOT:?}"/*
sudo cp -r dist/* "$NGINX_WEBROOT"/

# ============================================================
# Step 6: Configure Nginx to serve the app (SPA-friendly)
# ============================================================
echo "=== Step 6: Writing Nginx site config ==="
NGINX_CONF="/etc/nginx/sites-available/$REPO_NAME"

sudo tee "$NGINX_CONF" > /dev/null <<EOF
server {
    listen 80;
    server_name _;

    root $NGINX_WEBROOT;
    index index.html;

    location / {
        try_files \$uri /index.html;
    }
}
EOF

sudo ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/$REPO_NAME"

# Remove the default site if it's still enabled, so it doesn't conflict
if [ -f /etc/nginx/sites-enabled/default ]; then
    sudo rm /etc/nginx/sites-enabled/default
fi

sudo nginx -t
sudo systemctl restart nginx

# ============================================================
# Step 7: Verify
# ============================================================
echo "=== Step 7: Verifying the app responds ==="
sleep 2
if curl -s -o /dev/null -w "%{http_code}" http://localhost/ | grep -q "200"; then
    echo "✅ Deployment successful — app is being served by Nginx on port 80."
    echo "Visit: http://<your-ec2-public-ip>/"
else
    echo "⚠️  App did not respond with HTTP 200. Check Nginx logs:"
    echo "    sudo tail -f /var/log/nginx/error.log"
    exit 1
fi
