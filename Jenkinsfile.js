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