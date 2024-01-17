pipeline 
{
    agent any
    
    
    stages 
    {
        stage('Checkout')
        {
            steps{
                script{
                    git branch: 'main', credentialsId:'jenkinsGithubToken', url:'https://github.com/Maulopez23/CICD_Kakin.git'
                }
            }
        }
        stage('Desarrollo') 
        {
            steps {
                script {
                    withCredentials([string(credentialsId: 'jenkinsGithubToken', variable: 'GIT_TOKEN')]) {
                        try {
                            def desarrolloActions = {
                            sh 'git config --global credential.helper "!f() { echo username=Maulopez23; echo password=$GIT_TOKEN; }; f"'
                            sh 'git checkout desarrollo'
                            sh 'git fetch origin main:main'
                            sh 'git merge main'
                            sh 'git push origin desarrollo'
                            sh 'git config --global --unset credential.helper'
                            }
                            desarrolloActions.call()

                        def developmentTests = 
                        {
                            //sh 'export PATH=$PATH:/usr/local/bin/node'
                            sh 'npm install'
                            sh 'npm run build || true'

                            // Ensure to stop the Firebase emulator
                           // sh 'firebase emulators:stop'
                          // Add this input step
                        input(id: 'ProceedToQA', message: 'Quieres pasar a QA?', ok: 'Yes')
                        }
                        developmentTests.call()
                        } catch (Exception e) {
                            echo "Error in Desarrollo stage: ${e.message}"
                            throw e
                        }
                    }
                }
            }
        }

        stage('QA') 
        {
            steps {
                script {
                    withCredentials([string(credentialsId: 'jenkinsGithubToken', variable: 'GIT_TOKEN')]) {
                        try {
                            def qaActions = {
                                sh 'git config --global credential.helper "!f() { echo username=Maulopez23; echo password=$GIT_TOKEN; }; f"'
                                sh 'git checkout qa'
                                sh 'git fetch origin desarrollo:desarrollo'
                                sh 'git merge desarrollo'
                                sh 'git push origin qa'
                                sh 'git config --global --unset credential.helper'
                            }
                            qaActions.call()

                            def qaTests = {
                                //sh 'npx eslint'
                                sh 'npm test'
                            }
                            qaTests.call()
                        } catch (Exception e) {
                            echo "Error in QA stage: ${e.message}"
                            throw e
                        }
                    }
                }
            }
        }

        stage('Producción') 
        {
            steps {
                script {
                    withCredentials([string(credentialsId: 'jenkinsGithubToken', variable: 'GIT_TOKEN')]) {
                        try {
                            def produccionActions = {
                                sh 'git config --global credential.helper "!f() { echo username=Maulopez23; echo password=$GIT_TOKEN; }; f"'
                                sh 'git checkout produccion'
                                sh 'git fetch origin qa:qa'
                                sh 'git merge qa'
                                sh 'git push origin produccion'
                                sh 'git config --global --unset credential.helper'
                            }
                            produccionActions.call()

                            def produccionTests = {
                                sh 'npm run test'
                            }
                            produccionTests.call()
                            //definir funcion y agregar comandos de prod (smoke test?)
                        } catch (Exception e) {
                            echo "Error en producción: ${e.message}"
                            throw e
                        }
                    }
                }
            }
        }
    }
    
    post {
            always {
                sh 'git checkout main'
            }
        }
}