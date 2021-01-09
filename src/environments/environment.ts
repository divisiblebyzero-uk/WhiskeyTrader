import { domain, clientId, audience, serverUrl } from './auth_config.dev.json';

export const environment = {
  production: false,
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
