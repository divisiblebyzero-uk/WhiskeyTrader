export interface AuthConfig {
    domain: string,
    clientId: string,
    audience: string,
    serverUrl: string
}

export const authconfig_dev: AuthConfig = 
{
    "domain": "dev-dby0.auth0.com",
    "clientId": "VeOBHSLmQFfhmqkSqH4xy59oRtSHZOsj",
    "audience": "https://whiskey-api.webster-smalley.co.uk",
    "serverUrl": "http://localhost:8000"
}

export const authconfig_prod: AuthConfig = 
{
    "domain": "dev-dby0.auth0.com",
    "clientId": "VeOBHSLmQFfhmqkSqH4xy59oRtSHZOsj",
    "audience": "https://whiskey-api.webster-smalley.co.uk",
    "serverUrl": "https://whiskey-api.webster-smalley.co.uk"
}