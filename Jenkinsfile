pipeline {
      agent any
      stages {
            stage('Init') {
                  steps {
                        echo 'Oi, Aqui é a turma do 2TINR'
                        echo 'Nos estamos testando o deploy de um projeto Maven pelo Jenkins'
                  }
            }
            stage('Build') {
                  steps {
                        echo 'Building Sample Maven Project'
                  }
            }
            stage('Deploy') {
                  steps {
                        echo "Deploying in Staging Area"
                  }
            }
            stage('Deploy Production') {
                  steps {
                        echo "Deploying in Production Area"
                  }
            }
      }
}