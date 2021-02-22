pipeline {
    agent {label 'Naveen-machine'}
    
    environment {
        REPOSITORY="git@gitlab.com:tenjinonline"
        GIT_CREDENTIALS="ARC_SSH"
    }
    
    stages {
        stage ('Maven Build') {
            
            stages {
                stage ('Build Eureka') {
                    steps {
                        dir("./yethi-service-discovery") {
                            git credentialsId: "$GIT_CREDENTIALS", url: "$REPOSITORY/services/yethi-service-discovery.git", branch: "master"
                            bat 'mvn clean package -DskipTests=true'
                        }
                    }
                }

                stage ('Build API Gateway') {
                    steps {
                        dir("./tplus-api-gateway") {
                            git credentialsId: "$GIT_CREDENTIALS", url: "$REPOSITORY/services/tplus-api-gateway.git", branch: "release-1.2"
                            bat 'mvn clean package -DskipTests=true'
                        }
                    }
                }
                
                stage ('Build Identity') {
                    steps {
                        dir("./tplus-identity-service") {
                            git credentialsId: "$GIT_CREDENTIALS", url: "$REPOSITORY/services/tplus-identity-service.git", branch: "release-1.2"
                            bat 'mvn clean package -DskipTests=true'
                        }
                    }
                }
                
                stage ('Build Project Service') {
                    steps {
                        dir("./tplus-project-service") {
                            git credentialsId: "$GIT_CREDENTIALS", url: "$REPOSITORY/services/tplus-project-service.git", branch: "release-1.2"
                            bat 'mvn clean package -DskipTests=true'
                        }
                    }
                }
                
                
                
                stage ('Build Test Builder Service') {
                    steps {
                        dir("./tplus-test-builder-service") {
                            git credentialsId: "$GIT_CREDENTIALS", url: "$REPOSITORY/services/tplus-test-builder-service.git", branch: "dev-ss-481"
                            bat 'mvn clean package -DskipTests=true'
                        }
                    }
                }
                
                stage ('Build App Service') {
                    steps {
                        dir("./tplus-app-service") {
                            git credentialsId: "$GIT_CREDENTIALS", url: "$REPOSITORY/services/tplus-app-service.git", branch: "release-1.2"
                            bat 'mvn clean package -DskipTests=true'
                        }
                    }
                }
            }
            
        }

        stage ('Build all docker images') {
            steps {
                bat "docker-compose build"
            }
        }

        stage ('Deploy All containers') {
            steps {
                bat "docker-compose down"
                bat "docker-compose up -d"
            }
        }
     }
}