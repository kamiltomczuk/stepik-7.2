#!/bin/bash

# Sprawdzenie połączenia frontend -> backend
echo "Checking frontend -> backend connection..."
docker run --rm --network docker-zadania_frontend_network curlimages/curl:latest -s http://backend:3000/api || {
  echo "Frontend cannot connect to backend"
  exit 1
}

# Sprawdzenie połączenia backend -> database poprzez API backendu
echo "Checking backend -> database query..."
winpty docker exec -it $(docker ps -q -f name=docker-zadania-backend-1) curl -s http://localhost:3000/db || {
  echo "Backend cannot query the database"
  exit 1
}

echo "All connections are working correctly"
