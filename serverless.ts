import { dbResources } from './src/modules/db/serverless';
import { todoHandlers } from './src/handlers/todo/serverless';

import type { AWS } from '@serverless/typescript';

const isProd = process.env.NODE_ENV === 'production';

const serverlessConfiguration: AWS = {
  service: 'contango',
  frameworkVersion: '3',

  custom: {
    esbuild: {
      bundle: true,
      minify: isProd,
      sourcemap: !isProd,
      exclude: ['aws-sdk'],
      external: ['knex', 'pg'],
      target: 'node14',
      platform: 'node',
    },

    'serverless-offline': {
      httpPort: 5004,
      lambdaPort: 3004,
    },

    domainBase: '${sls:stage}.azerel.la',

    customDomain: {
      domainName: '${self:service}-${sls:stage}.azerel.la',
      // stage: '${sls:stage}',
      certificateName: '*.azerel.la',
      // apiType: 'rest',
      createRoute53Record: true,
      // endpointType: 'regional',
    },
  },

  plugins: [
    'serverless-dotenv-plugin',
    'serverless-esbuild',
    'serverless-offline',
    // 'serverless-domain-manager',
    // 'serverless-secrets',
  ],

  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'ap-southeast-2', // Sydney
    logRetentionInDays: 14,
    timeout: 30,
    lambdaHashingVersion: '20201221',
    memorySize: 128,

    // logs: {
    //   restApi: {
    //     accessLogging: false,
    //   },
    // },

    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },

    environment: {
      ...(isProd && { NODE_ENV: 'production' }),
      DB_URI: {
        'Fn::Sub': [
          'postgres://${DBUser}:${DBPass}@${DBHost}:5432/${DBName}',
          {
            DBUser: {
              'Fn::Sub': '{{resolve:secretsmanager:${RDSClusterRotationalSecrets}::username}}',
            },
            DBPass: {
              'Fn::Sub': '{{resolve:secretsmanager:${RDSClusterRotationalSecrets}::password}}',
            },
            DBHost: {
              'Fn::GetAtt': ['RDSCluster', 'Endpoint.Address'],
            },
            DBName: '${self:service}',
          },
        ],
      },
      // STAGE: '${sls:stage}',
      // AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      // NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },

    deploymentBucket: {
      /** @TODO Trim stage here */
      name: 'sls-deployment-${self:service}-${sls:stage}',
    },

    vpc: {
      securityGroupIds: ['sg-6243e91b'],
      subnetIds: ['subnet-bf6397e7', 'subnet-dbbadf92', 'subnet-263f5441'],
    },
  },

  resources: {
    Resources: {
      ...dbResources,
    },
  },

  functions: {
    ...todoHandlers,
  },
};

module.exports = serverlessConfiguration;
