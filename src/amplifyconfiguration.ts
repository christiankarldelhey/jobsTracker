// Este archivo contendrá la configuración de AWS Amplify
// Se completará cuando configures AWS Amplify CLI

// Por ahora está vacío, lo llenaremos después de ejecutar:
// amplify init
// amplify add auth
// amplify add api
// amplify push

export const amplifyConfig = {
    "aws_project_region": "us-east-1",
    "aws_cognito_identity_pool_id": "us-east-1:f7703fa1-241b-4048-8984-d9a5c05df28e",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_Hy9N6LICH",
    "aws_user_pools_web_client_id": "1edlemngekcceckfqufbfbd6q0",
    "oauth": {},
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ],
    "aws_appsync_graphqlEndpoint": "https://a2jgt7bsjzaclkd6lbgel2z624.appsync-api.us-east-1.amazonaws.com/graphql",
    "aws_appsync_region": "us-east-1",
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS"
};

export default amplifyConfig;
