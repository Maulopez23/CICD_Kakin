pipeline {
    agent any

    environment {
        //DIGITALOCEAN_ACCESS_TOKEN=credentials('do-api-token')
        REPO_URL = "https://github.com/Maulopez23/CICD_Kakin.git"
    }

    stages {
        stage('Desarrollo') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'jenkinsGitHubToken', variable: 'GIT_TOKEN')]) {
                        try {
                            def desarrolloActions = {
                            sh 'git checkout main'
                            sh 'git config --global credential.helper "!f() { echo username=Maulopez23; echo password=$GIT_TOKEN; }; f"'
                            sh 'git checkout desarrollo'
                            sh 'git fetch origin main:main'
                            sh 'git merge main'
                            sh 'git push origin desarrollo'
                            // Reset the credential helper configuration after use
                            sh 'git config --global --unset credential.helper'
                            }
                            desarrolloActions.call()

                        def developmentTests = {
                            sh 'npm install'
                           //sh 'firebase emulators:start --only firestore'
                            //sh 'npm test'
                            sh 'npm run build'
                            // Ensure to stop the Firebase emulator
                           // sh 'firebase emulators:stop'
                          // Add this input step
                        input(id: 'ProceedToQA', message: 'Approve proceeding to QA?', ok: 'Yes')
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

        stage('QA') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'jenkinsGitHubToken', variable: 'GIT_TOKEN')]) {
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
                                sh 'npx eslint'
                                sh 'npx jest'
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

        stage('Producción') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'jenkinsGitHubToken', variable: 'GIT_TOKEN')]) {
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
                                sh 'npm run test-file -- Login.test.js'
                            }
                            produccionTests.call()
                            //definir funcion y agregar comandos de prod (smoke test?)
                        } catch (Exception e) {
                            echo "Error in Producción stage: ${e.message}"
                            throw e
                        }
                    }
                }
            }
        }

        stage('Deploy to DigitalOcean') {
            when {
                expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
            }
            steps {
                script {
                    try {
                        //deploy in digital ocean
                    } catch (Exception e) {
                        echo "Error in Deploy stage: ${e.message}"
                        throw e
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