#!/bin/bash
# Update the package manager and install Docker
sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo usermod -aG docker ec2-user

sudo yum install -y amazon-ssm-agent
sudo systemctl start amazon-ssm-agent
sudo systemctl enable amazon-ssm-agent
sudo systemctl restart amazon-ssm-agent
