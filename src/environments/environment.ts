import {authconfig_dev as authconfig} from './auth_config';

export const environment = {
  production: true,
  auth: {
    domain: authconfig.domain,
    clientId: authconfig.clientId,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: authconfig.audience
    }
  },
  api: {
    serverUrl: authconfig.serverUrl
  },
  appVersion: require('../../package.json').version
};

