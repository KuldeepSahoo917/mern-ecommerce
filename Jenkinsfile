pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build --no-cache'
            }
        }

        stage('Security Scan') {
            steps {
                sh 'trivy image --severity HIGH,CRITICAL --exit-code 1 mern-ecommerce-ci-cd-backend:latest'
                sh 'trivy image --severity HIGH,CRITICAL --exit-code 1 mern-ecommerce-ci-cd-frontend:latest'
                sh 'trivy image --severity HIGH,CRITICAL --exit-code 1  mern-ecommerce-ci-cd-admin:latest'
            }
        }

        stage('Deploy Application') {
            steps {
                withCredentials([
                    string(credentialsId: 'PAYPAL_CLIENT_ID', variable: 'PAYPAL_CLIENT_ID'),
                    string(credentialsId: 'JWT_SECRET', variable: 'JWT_SECRET'),
                    string(credentialsId: 'MONGO_URL', variable: 'MONGO_URL')
                ]) {
                    sh 'docker compose down'
                    sh 'docker compose up -d'
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'docker compose ps'
            }
        }
    }
}
