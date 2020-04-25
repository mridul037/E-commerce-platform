pipeline {
    agent any
    options {
        timeout(time: 15, unit: 'MINUTES')
    }
    triggers {
        bitbucketPush()
    }
    parameters {
        gitParameter branchFilter: 'origin/(.*)', defaultValue: 'master', name: 'BRANCH', type: 'PT_BRANCH'
        choice choices: ['dev', 'stage', 'prod'], description: '', name: 'ENVIRONMENT'
    }
    environment {
        AWS_DEFAULT_REGION = "ap-southeast-1"
        REPO = 'git@bitbucket.org:daily-objects/do-frontend-ng7.git'
        BRANCH = "${params.BRANCH}"

        COMPRESSED_BUILD = 'do-angular.tar.gz'
        ssh_identity = credentials("do-${params.ENVIRONMENT}")
    }
    stages {
        stage('clone-and-build') {
            agent { docker { image 'node:10-alpine' } }
            steps {
                cleanWs()
                checkout([
                        $class                           : 'GitSCM', branches: [[name: env.BRANCH]],
                        doGenerateSubmoduleConfigurations: false,
                        extensions                       : [[$class: 'CloneOption', noTags: false, reference: '', shallow: true]],
                        submoduleCfg                     : [],
                        userRemoteConfigs                : [[credentialsId: 'do-git', url: env.REPO]]
                ])
                sh "npm install --no-audit --loglevel warn"
                sh "npm run build:${params.ENVIRONMENT}"
                compress()
                stash includes: "${env.COMPRESSED_BUILD}", name: 'dist'
                buildName "#${BUILD_NUMBER}-${params.ENVIRONMENT}-${env.BRANCH}"
            }
        }
        stage('deployment') {
            agent { docker { image 'xueshanf/awscli' } }
            stages {
                stage('clean-and-load') {
                    steps {
                        cleanWs()
                        unstash 'dist'
                    }
                }
                stage('non-production') {
                    when {
                        expression { params.ENVIRONMENT != 'prod' }
                    }
                    environment {
                        DEV_IP = "172.31.13.172"
                        STAGE_IP = "172.31.15.240"

                        TMP_DEPLOYMENT_DIR = "/tmp/${params.ENVIRONMENT}.dailyobjects.com/"
                        DEPLOYMENT_DIR = "/var/www/${params.ENVIRONMENT}.dailyobjects.com/"
                    }
                    steps {
                        script {
                            def ip = env.(env.ENVIRONMENT.toUpperCase() + '_IP')
                            deploy_to_server(ip)
                        }
                    }
                }
                stage('production') {
                    when {
                        expression { params.ENVIRONMENT == 'prod' }
                    }
                    environment {
                        AS_GROUP = "do-prod"

                        TMP_DEPLOYMENT_DIR = "/tmp/www.dailyobjects.com/"
                        DEPLOYMENT_DIR = "/var/www/www.dailyobjects.com/"
                    }
                    steps {
                        script{
                            if ( env.BRANCH != 'master' ) {
                                return error("Only master branch can be deployed on Production")
                            }
                        }
                            withCredentials([
                                    [
                                            $class           : 'AmazonWebServicesCredentialsBinding',
                                            credentialsId    : 'aws-web-creds-ec2-full-access',
                                            accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                                            secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                                    ]
                            ]) {
                                
                                sh "echo 'Pausing AutoScaling' && aws autoscaling suspend-processes --auto-scaling-group-name=$AS_GROUP"
                                sh """
                                    > server.txt
                                    for i in `aws autoscaling describe-auto-scaling-groups --auto-scaling-group-name ${
                                    AS_GROUP
                                } | grep -i instanceid  | awk '{ print \$2}' | cut -d',' -f1| sed -e 's/"//g'`;
                                    do
                                        aws ec2 describe-instances --instance-ids \$i | grep -i PrivateIpAddress | awk '{ print \$2 }' | head -1 | cut -d"," -f1 | sed -e 's/^"//' -e 's/"\$//' >> server.txt;
                                    done;
                                """
                                script {
                                    
                                        def ips = readFile 'server.txt'
                                        println 'Private IPs to deploy to : \n' + ips.toString()
                                        for (ip in ips.split()) {
                                            deploy_to_server(ip)
                                        }
                                }
                                sh "echo 'Resuming AutoScaling' && aws autoscaling resume-processes --auto-scaling-group-name=$AS_GROUP"
                            }
                        }
                    }
                stage('s3') {
                    steps {
                        script {
                            String path_in_bucket = params.ENVIRONMENT
                            if (params.ENVIRONMENT == "prod")
                                path_in_bucket = "production"
                            withCredentials([
                                    [
                                            $class           : 'AmazonWebServicesCredentialsBinding',
                                            credentialsId    : 'aws-web-creds-ec2-full-access',
                                            accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                                            secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                                    ]
                            ]) {
                                s3Upload acl: 'Private',
                                        bucket: 'do-deployments',
                                        file: "${env.COMPRESSED_BUILD}",
                                        path: "$path_in_bucket/${env.COMPRESSED_BUILD}"
                            }
                        }
                    }
                }
            }
        }
        stage('clean') {
            steps { cleanWs() }
        }
    }
}

def deploy_to_server(ip) {
    LinkedHashMap remote = new LinkedHashMap(
            name: "do-${params.ENVIRONMENT}",
            host: ip,
            user: env.ssh_identity_USR,
            identityFile: env.ssh_identity,
            allowAnyHosts: true
    )
    def current_dir = pwd()
    sshRemove remote: remote, path: "${env.TMP_DEPLOYMENT_DIR}", failOnError: false
    sshRemove remote: remote, path: "/tmp/${env.COMPRESSED_BUILD}", failOnError: false
    sshCommand remote: remote, command: "mkdir -p ${env.TMP_DEPLOYMENT_DIR}"
    sshPut remote: remote, from: current_dir + "/${env.COMPRESSED_BUILD}", into: "/tmp/"
    sshCommand remote: remote, command: "tar -xzf /tmp/${env.COMPRESSED_BUILD} -C ${env.TMP_DEPLOYMENT_DIR}"
    sshCommand remote: remote, command: "rsync -r ${env.TMP_DEPLOYMENT_DIR}* ${env.DEPLOYMENT_DIR} --delete-after", sudo: true
    sshCommand remote: remote, command: "chown -R www-data:www-data ${env.DEPLOYMENT_DIR}", sudo: true
    sshCommand remote: remote, command: "chmod 755 -R ${env.DEPLOYMENT_DIR}", sudo: true
}

def compress() {
    sh """cd dist/ && tar -czf ../${env.COMPRESSED_BUILD} * --exclude='.git' --exclude='${env.COMPRESSED_BUILD}'"""
}
