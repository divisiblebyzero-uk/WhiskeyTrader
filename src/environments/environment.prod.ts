import { domain, clientId, audience, serverUrl } from './auth_config.prod.json';

export const environment = {
  production: true,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin,
    audience
  },
  api: {
    serverUrl
  }
};
