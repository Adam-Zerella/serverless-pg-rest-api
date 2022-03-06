import type { AWS } from '@serverless/typescript';

export const dbResources: AWS['resources']['Resources'] = {
  RDSInstanceRotationSecret: {
    Type: 'AWS::SecretsManager::Secret',
    Properties: {
      Description: 'RDS database auto-generated credentials',
      GenerateSecretString: {
        PasswordLength: 30,
        SecretStringTemplate: '{ "username": "postgres" }',
        GenerateStringKey: 'password',
        ExcludeCharacters: `'"@/\\'`,
      },
    },
  },

  RDSInstance: {
    Type: 'AWS::RDS::DBInstance',
    Properties: {
      Engine: 'postgres',
      EngineVersion: '14.1',
      MasterUsername: {
        'Fn::Sub': '{{resolve:secretsmanager:${RDSInstanceRotationSecret}::username}}',
      },
      MasterUserPassword: {
        'Fn::Sub': '{{resolve:secretsmanager:${RDSInstanceRotationSecret}::password}}',
      },
      EnablePerformanceInsights: false,
      MultiAZ: false,
      PubliclyAccessible: false,
      StorageEncrypted: true,
      AllocatedStorage: '20', // 20GB
      DBInstanceClass: 'db.t4g.medium',
      BackupRetentionPeriod: 0,
    },
  },
};

export const dbOutputs: AWS['outputs'] = {
  DBClusterEndpoint: {
    Description: 'Aurora DB Cluster Endpoint Address',
    Value: `!GetAtt AuroraCluster.Endpoint.Address`,
  },
};
