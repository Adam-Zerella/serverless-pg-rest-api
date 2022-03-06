import { dbResources, dbOutputs } from './src/modules/db/serverless';
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
      external: ['pg'],
      target: 'node14',
      //   define: { 'require.resolve': undefined },
      platform: 'node',
    },

    'serverless-offline': {
      httpPort: 5004,
      lambdaPort: 3004,
    },

    // customDomain: {
    //   domainName: '${self:service}.${sls:stage}.azerel.la',
    //   certificateName: '*.${sls:stage}.azerel.la',
    //   createRoute53Record: true,
    // },
  },

  plugins: [
    'serverless-dotenv-plugin',
    'serverless-esbuild',
    'serverless-offline',
    // 'serverless-secrets',
    // 'serverless-domain-manager',
  ],

  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'ap-southeast-2', // Sydney
    role: 'arn:aws:iam::453470842717:role/IamRoleLambdaExecution',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },

    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      // NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      // STAGE: '${sls:stage}',
    },

    lambdaHashingVersion: '20201221',
    deploymentBucket: {
      name: 'sls-deployment-${self:service}-${sls:stage}',
    },

    logRetentionInDays: 14,
  },

  resources: {
    Resources: {
      ...dbResources,
    },
  },

  functions: {
    ...todoHandlers,
  },

  outputs: {
    ...dbOutputs,
  },
};

module.exports = serverlessConfiguration;
