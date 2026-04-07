// Script to generate amplifyconfiguration.ts during build
const fs = require('fs');
const path = require('path');

// Read the amplify configuration from backend
const teamProviderInfo = require('./amplify/team-provider-info.json');
const backendConfig = require('./amplify/backend/backend-config.json');

const env = process.env.AWS_BRANCH || 'dev';
const envConfig = teamProviderInfo[env];

if (!envConfig) {
  console.error(`Environment ${env} not found in team-provider-info.json`);
  process.exit(1);
}

const awsRegion = envConfig.awscloudformation.Region;
const apiConfig = backendConfig.api?.jobtracker;

if (!apiConfig) {
  console.error('API configuration not found');
  process.exit(1);
}

const config = {
  aws_project_region: awsRegion,
  aws_cognito_region: awsRegion,
  aws_user_pools_id: envConfig.categories.auth.jobtracker12ce443c.userPoolId,
  aws_user_pools_web_client_id: envConfig.categories.auth.jobtracker12ce443c.appClientId,
  oauth: {},
  aws_cognito_username_attributes: ['EMAIL'],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: ['EMAIL'],
  aws_cognito_mfa_configuration: 'OFF',
  aws_cognito_mfa_types: ['SMS'],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: []
  },
  aws_cognito_verification_mechanisms: ['EMAIL'],
  aws_appsync_graphqlEndpoint: envConfig.categories.api.jobtracker.GraphQLAPIEndpointOutput,
  aws_appsync_region: awsRegion,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS'
};

const configContent = `const amplifyConfig = ${JSON.stringify(config, null, 2)};\n\nexport default amplifyConfig;\n`;

fs.writeFileSync(
  path.join(__dirname, 'src', 'amplifyconfiguration.ts'),
  configContent
);

console.log('✅ amplifyconfiguration.ts generated successfully');
