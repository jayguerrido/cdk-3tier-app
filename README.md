# 🚀 AWS 3-Tier Web App with CDK & Azure DevOps CI/CD

This project demonstrates how to deploy a 3-tier web application on AWS using the **AWS Cloud Development Kit (CDK)** in TypeScript, with a fully automated **CI/CD pipeline using Azure DevOps**.

The infrastructure includes:
- A public-facing EC2 instance running a Node.js app
- A PostgreSQL RDS database
- An S3 bucket for file storage

All development is done inside **Gitpod**, a cloud-based IDE, and the infrastructure is deployed automatically on push to `main`.

---

## 🧱 Architecture Overview

| Component | Purpose |
|----------|---------|
| **CDK (TypeScript)** | Infrastructure as Code (VPC, EC2, RDS, S3) |
| **EC2 (App Tier)** | Runs Node.js app on launch using User Data |
| **RDS (Data Tier)** | PostgreSQL database for structured data |
| **S3** | Object storage (e.g., user uploads, assets) |
| **Gitpod** | Cloud-based development environment |
| **Azure DevOps** | CI/CD pipeline for automated deployments |
| **GitHub** | Source control for code and pipeline config |

---

## 📦 Prerequisites

- An [AWS account](https://aws.amazon.com/)
- An [Azure DevOps account](https://dev.azure.com/)
- A GitHub repository (you can fork this one)
- [Gitpod](https://www.gitpod.io/) for cloud-based development

---

## 🧑‍💻 Getting Started

### 1. Clone & Open in Gitpod

Click to open this repo in Gitpod:

https://gitpod.io/#https://github.com/YOUR_USERNAME/cdk-3tier-app

yaml
Copy
Edit

> This will launch a ready-to-go CDK dev environment.

---

### 2. Install Dependencies

In the Gitpod terminal, run:

```bash
npm install
3. Deploy Your CDK Stack
Bootstrap your environment (only once per account/region):

bash
Copy
Edit
cdk bootstrap aws://<your-account-id>/<region>
Then deploy the stack:

bash
Copy
Edit
cdk deploy
4. Access Your Web App
Go to EC2 in the AWS Console

Grab the public IP of your EC2 instance

Open http://<public-ip> in your browser

🤖 Automate with Azure DevOps
1. Create a New Pipeline
Go to Pipelines → New Pipeline

Select GitHub as the source

Choose your repo

Use the existing .azure-pipelines.yml file

2. Set Up AWS Service Connection
Go to Project Settings → Service Connections

Create a new AWS service connection

Provide IAM Access Key & Secret for a user with CDK deploy permissions

3. Push to main
Any changes pushed to main will:

Trigger the pipeline

Re-deploy your CDK stack automatically

🧠 How It All Works Together
Component	Role
CDK	Defines AWS infrastructure in code
Gitpod	Streamlines development with zero local setup
EC2 User Data	Installs & runs Node.js app on startup
Azure DevOps	Runs pipeline on push to main
S3 + RDS	App stores files and interacts with the database
CI/CD	Automates repeatable environment setup and deployment
📈 Future Improvements
Add Load Balancer and auto-scaling

Use ECS or Lambda instead of EC2

Add frontend hosting via S3 + CloudFront

Add pipeline stages for test, build, and approval

Add monitoring/alerting with CloudWatch

📄 License
MIT License

🙌 Acknowledgments
AWS CDK

Azure DevOps Pipelines

Gitpod
