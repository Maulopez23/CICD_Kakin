pipeline {
    agent any
    
    environment{
        REPO_URL="https://github.com/Maulopez23/CICD_Kakin.git"
    }
    
    stages 
    {
        stage('PRODUCTION') 
        {
            steps 
            {
                script 
                {
                    withCredentials([string(credentialsId: 'jenkinsGitHubToken', variable: 'GIT_TOKEN')]) 
                    {
                        try 
                        {
                            def desarrolloActions = 
                            {
                            sh 'git config --global credential.helper "!f() { echo username=Maulopez23; echo password=$GIT_TOKEN; }; f"'
                            sh 'git checkout PRODUCTION'
                            sh 'git fetch origin master:master'
                            sh 'git merge master'
                            sh 'git push origin PRODUCTION'
                            // Reset the credential helper configuration after use
                            sh 'git config --global --unset credential.helper'
                            }
                            desarrolloActions.call()

                        def developmentTests = 
                        {
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
    }
}