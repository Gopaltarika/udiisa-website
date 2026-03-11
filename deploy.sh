#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="/var/www/udiisa-website"
BACKEND_NAME="udiisa-backend"

echo "==> Starting deployment..."
cd "$APP_ROOT"

echo "==> Pulling latest code..."
git pull

echo "==> Installing backend dependencies..."
cd "$APP_ROOT/backend"
npm install

echo "==> Restarting backend (PM2)..."
pm2 restart "$BACKEND_NAME"
pm2 save

echo "==> Building web frontend..."
cd "$APP_ROOT/webfrontend"
npm install
npm run build

echo "==> Building admin frontend..."
cd "$APP_ROOT/admin"
npm install
npm run build

echo "==> Validating and reloading Nginx..."
nginx -t
systemctl reload nginx

echo "==> Running health checks..."
curl -s http://localhost:5000/api/health
echo
curl -I --max-time 15 https://udisports.in/ | sed -n '1p'
curl -I --max-time 15 https://udisports.in/admin/login | sed -n '1p'

echo "==> Deployment completed successfully."
