export const DEFAULT_LIVE_TIME = '14 days';

export const VERIFICATION_LIVE_TIME = '30m';

export const AUTH_COOKIE_KEY = 'jid';

export const GRANTS = {
  viewer: {
    account: {
      'read:own': ['*'],
      'update:own': ['*'],
    },
  },
  user: {
    account: {
      'read:own': ['*'],
      'update:own': ['*'],
    },
  },
  admin: {
    account: {
      'read:own': ['*'],
      'update:own': ['*'],
    },
  },
  superadmin: {
    account: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
  },
};
