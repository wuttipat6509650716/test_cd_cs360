#!/bin/bash

#Define
base_path=$(pwd)
echo "$base_path"

# Update package lists And install curl
echo "อัปเดต package lists..."
if command -v apt &> /dev/null; then
    echo "This system uses apt"
    sudo apt update && sudo apt upgrade -y
elif command -v yum &> /dev/null; then
    echo "This system uses yum"
    sudo yum check-update || sudo yum update -y
else
    echo "Unsupported package manager"
fi

if command -v curl &> /dev/null; then
    echo "curl is already installed."
else
    echo "curl is not installed. Installing..."
    sudo yum install -y curl
fi

publicIPv4=$(curl ipinfo.io/ip)

install_git(){
    sudo yum install git
}

install_nvm(){
    echo "Installing NodeJs V.16"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
    source ~/.bashrc
    nvm install 16
    nvm use 16
}

check_and_add_to_env() {
    VAR_NAME=$1
    VAR_VALUE=$2
    ENV_PATH=$3
    if ! grep -q "^$VAR_NAME=" "$ENV_PATH"; then
        echo "$VAR_NAME=$VAR_VALUE" >> "$ENV_PATH"
        echo "$VAR_NAME added to $ENV_PATH"
    else
        echo "$VAR_NAME is already set, skipping..."
    fi
}

# NodeJs Check
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    NPM_VERSION=$(npm -v)
    echo "NodeJs is already installed. Node: ${NODE_VERSION}, npm: ${NPM_VERSION}"

    # Check NodeJs Version is equal to 16
    if [[ $(node -v | sed ''s/v//) =~ ^(1[6])\. ]]; then
        echo "Node.js version: $NODE_VERSION is within the allowed range."
    else
        echo "Node.js version: $NODE_VERSION is not v.16"
        exit 1
    fi

else
    echo "NodeJs is not installed. Installing NodeJs..."
    install_nvm
    if command -v node &> /dev/null; then
        echo "NodeJs installed successfully. Node: $(node -v)"
    else
        echo "NodeJs installation failed. Exiting."
        exit 1
    fi
fi

# Git Check
if command -v git &> /dev/null; then
    echo "Git is already installed. Git: $(git --version)"
else
    echo "Git is not installed. Installing Git..."
    install_git
    if command -v git &> /dev/null; then
        echo "Git installed successfully. Git: $(git --version)"
    else
        echo "Git installation failed. Exiting."
        exit 1
    fi
fi

# pm2 Check
if command -v pm2 &> /dev/null; then
    echo "pm2 is already installed."
else
    echo "pm2 is not installed. Installing pm2..."
    npm install -g pm2@5.4.2
    if command -v pm2 &> /dev/null; then
        echo "pm2 installed successfully."
    else
        echo "pm2 installation failed. Exiting."
        exit 1
    fi
fi

# yarn Check
if command -v yarn &> /dev/null; then
    echo "yarn is already installed."
else
    echo "yarn is not installed. Installing yarn..."
    npm install -g yarn@1.22.22
    if command -v yarn &> /dev/null; then
        echo "yarn installed successfully."
    else
        echo "yarn installation failed. Exiting."
        exit 1
    fi
fi

source ~/.bashrc

path_api=$base_path/api
path_client=$base_path/client

cd $path_api

#load Libs
yarn

#check .env file API 
if [ ! -f "${path_api}/.env" ]; then
    echo "Create .env"
    touch  "${path_api}/.env"
else
    echo ".env file alredy exists."
fi

# Set .env API
check_and_add_to_env "HOST" "0.0.0.0" "${path_api}/.env"
check_and_add_to_env "PORT" "1337" ".env"
check_and_add_to_env "STRAPI_ADMIN_CLIENT_URL" "http://${publicIPv4}:3000" "${path_api}/.env"
check_and_add_to_env "STRAPI_ADMIN_CLIENT_PREVIEW_SECRET" "ARNFCb9zrC9ZHm5hZzCigWivD40icS4s" "${path_api}/.env"
check_and_add_to_env "JWT_SECRET" "$(openssl rand -base64 16)" "${path_api}/.env"
check_and_add_to_env "NODE_ENV" "production" "${path_api}/.env"

yarn seed

echo "Starting Strapi..."
pm2 start yarn --name Strapi_Api -- start

cd $path_client

#check .env file NextJs
if [ ! -f "${path_api}/.env" ]; then
    echo "Create .env"
    touch  "${path_client}/.env"
else
    echo ".env file alredy exists."
fi

#load Libs
yarn

# Set .env NextJS
check_and_add_to_env "NEXT_PUBLIC_API_URL" "http://${publicIPv4}:1337" ".env"
check_and_add_to_env "PREVIEW_SECRET" "ARNFCb9zrC9ZHm5hZzCigWivD40icS4s" ".env"

echo "Build NextJS..."
yarn build
echo "Starting Client..."
pm2 start yarn --name client -- start

echo "Deploy Success"

echo "You Can Access Web-Application at http://${publicIPv4}:3000"
echo "You Can Access Strapi-Backend at http://${publicIPv4}:1337"