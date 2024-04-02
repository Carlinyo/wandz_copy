pipeline {
    agent any

    environment {
        REGION = 'eu-central-1'
        ECR_REPO_NAME = sh(script: 'basename -s .git `basename -s .git $(git config --get remote.origin.url)`', returnStdout: true).trim()
        DESTINATION_REPO_URL = 'git@github.com:namogoo/wandz_infra_helm_charts.git'
        HELM_CHART_PATH = 'charts/platform-ui'
    }

    stages {
        stage('Checkout') {
            steps {
                println("Checking out code from git.")
                checkout scm
            }
        }

        stage('Create ECR Repository') {
            when {
                expression { true } // false=Skip this stage
            }
            steps {
                println("Create ECR if it doesn't exist.")
                sh "aws ecr create-repository --repository-name $ECR_REPO_NAME || true"
            }
        }

        stage('Build and Push image') {
            when {
                expression { true } // false=Skip this stage
            }
            steps {
                println("Build and Push image to ECR")
                script {
                    sh """
                        aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_BASE_URL
                        docker build -t $ECR_REPO_NAME:${env.BUILD_NUMBER} .
                        docker tag $ECR_REPO_NAME:${env.BUILD_NUMBER} "$ECR_BASE_URL"/$ECR_REPO_NAME:${env.BUILD_NUMBER}
                        docker push "$ECR_BASE_URL"/$ECR_REPO_NAME:${env.BUILD_NUMBER}
                    """
                }
            }
        }

        stage('Update Helm Chart') {
            steps {
                echo "Updating Helm Chart with new image tag"            
                // Use sshagent to manage SSH keys
                script {
                    // Start the SSH agent and add the key
                    sshagent(['jenkins_ssh_key']) {
                        // Clone the Helm chart repository
                        checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[credentialsId: 'jenkins_ssh_key', url: "$DESTINATION_REPO_URL"]]])

                        // Read values and update the image tag
                        def valuesPath = "${HELM_CHART_PATH}/values-${ENV}.yaml"
                        def valuesContent = readFile(file: valuesPath).trim()
                        valuesContent = valuesContent.replaceAll(/tag: "\d+"/, "tag: \"${env.BUILD_NUMBER}\"")
                        writeFile(file: valuesPath, text: valuesContent)

                        // Commit and push the changes
                        dir("charts/platform-ui/") {
                            sh 'git config --global user.email "devops_rnd+wandz@namogoo.com"'
                            sh 'git config --global user.name "wandz-jenkins"'
                            sh "pwd"
                            sh "ls -la"
                            sh "git add ."
                            sh "git diff --cached --exit-code || git commit -m 'Update platform-ui image tag for $ENV to ${env.BUILD_NUMBER}'"
                            sh "git push origin HEAD:main"
                        }
                    }
                }
            }
        }
    }

      post {
        success {
            script {
                echo "Sending Slack notification for success"
                slackSend(                  
                    token: "slack-api-token",
                    color: "good",
                    message: "Pipeline Succeeded: Job *${env.JOB_NAME}* (<${env.BUILD_URL}|#${env.BUILD_NUMBER}>)"
                )
            }
        }
        failure {
            script {
                echo "Sending Slack notification for failure"
                slackSend(                  
                    token: "slack-api-token",
                    color: "red",
                    message: "Pipeline Failed: Job *${env.JOB_NAME}* (<${env.BUILD_URL}|#${env.BUILD_NUMBER}>)"
                )
        }
    }
  }
}
