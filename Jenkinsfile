pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
    }
  
    stages {
        stage('Cleanup Workspace') {
            steps {
                // Clean up the workspace to ensure no conflicts with previous builds
                script {
                    sh '''
                        if [ -d "Frontend" ]; then
                            rm -rf Frontend
                        fi
                    '''
                }
            }
        }
        
        stage('Checkout Frontend') {
            steps {
                // Clone the backend repository
                withCredentials([usernamePassword(credentialsId: 'github-auth', passwordVariable: 'GITHUB_TOKEN', usernameVariable: 'GITHUB_USERNAME')]) {
                    sh 'git clone https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/Bidayya/Front-end.git Frontend'
                }
            }
        }
        
        stage('Build Frontend Image') {
            steps {
                script {
                    dir('Frontend') {
                        // Login to Docker Hub
                        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                        
                        // Build the Docker image
                        sh 'docker build -t bidayya-frontend-image .'
                        
                        // Tag the Docker image
                        sh "docker tag bidayya-frontend-image:latest ${DOCKERHUB_CREDENTIALS_USR}/bidayya-frontend-image:latest"
                        
                        // Push the Docker image to Docker Hub
                        echo 'Pushing image to Docker Hub...'
                        sh 'docker push ${DOCKERHUB_CREDENTIALS_USR}/bidayya-frontend-image:latest'
                        
                        // Logout from Docker Hub
                        sh 'docker logout'
                    }
                }
            }
        }
        /*
           stage('Deploy to Kubernetes') {
            steps {
                script {
                    withEnv(["KUBECONFIG=/var/lib/jenkins/.kube/config-rancher-cluster"]) {
                        dir('Backend') {
                           sh 'kubectl delete deployment backend-deployment || true'
                            sh 'kubectl apply -f backend-depl.yaml --validate=false'
                        }
                    }
                }
            }
        }
        */
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    dir('Frontend') {
                        // Ensure Docker Compose is up-to-date
                        sh 'docker-compose -f docker-compose.yaml pull'

                        // Stop and remove any existing containers to avoid conflicts
                        sh 'docker-compose -f docker-compose.yaml down'

                        // Start containers defined in the docker-compose file
                        sh 'docker-compose -f docker-compose.yaml up -d'
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up...'
            script {
                echo 'Cleaning up Docker system...'
                // Remove all stopped containers
                sh 'docker container prune -f --filter "until=1h"'
                // Remove all dangling images
                sh 'docker image prune -f'
                // Remove all unused volumes
                sh 'docker volume prune -f'
                // Remove all unused networks
                sh 'docker network prune -f'

                // Remove all unused Docker objects (containers, images, volumes, networks) ==> in kube only
                //sh 'docker system prune -a -f'
            }
        }
        
        success {
            echo 'Pipeline completed successfully!'
        }
        
        failure {
            script {   // ==> in compose only
               dir('Frontend') {
                  // Stop and remove existing containers
                  sh 'docker-compose -f docker-compose.yaml down'
               }
            }
            echo 'Pipeline failed.'
        }
    }
}
