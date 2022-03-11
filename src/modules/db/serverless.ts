import type { AWS } from '@serverless/typescript';

export const dbResources: AWS['resources']['Resources'] = {
  RDSClusterRotationalSecrets: {
    Type: 'AWS::SecretsManager::Secret',
    Properties: {
      Name: '${self:service}-${sls:stage}-rdscluster',
      Description: 'RDS database auto-generated credentials',
      GenerateSecretString: {
        GenerateStringKey: 'password',
        SecretStringTemplate: {
          'Fn::Sub': '{"password": "abc", "username": "postgres"}',
        },
        PasswordLength: 24,
        ExcludePunctuation: true,
        IncludeSpace: false,
        // ExcludeCharacters: `'"@/\\|,:!\`^~<>{}`,
      },
    },
  },

  RDSCluster: {
    Type: 'AWS::RDS::DBCluster',
    Properties: {
      Engine: 'aurora-postgresql',
      EngineVersion: '10.14',
      EngineMode: 'serverless',
      MasterUsername: {
        'Fn::Sub': '{{resolve:secretsmanager:${RDSClusterRotationalSecrets}::username}}',
      },
      MasterUserPassword: {
        'Fn::Sub': '{{resolve:secretsmanager:${RDSClusterRotationalSecrets}::password}}',
      },
      DatabaseName: '${self:service}',
      ScalingConfiguration: {
        AutoPause: true,
        MinCapacity: 2, // '2C | 4GB'
        MaxCapacity: 4,
        SecondsUntilAutoPause: 300, // 5 Minutes until scale down
      },
      VpcSecurityGroupIds: ['sg-0ac8e5494322c6a28'], // RDS open
    },
  },
};
