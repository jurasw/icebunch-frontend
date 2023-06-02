export enum Path {
    HOME = '/',
    LOGIN = '/login',
    REGISTER = '/register',
    CONFIRM = 'confirm/:token',
    FORGOT_PASSWORD = 'forgot-password',
    RESET_PASSWORD = 'reset-password/:token',
    SETTINGS = '/settings',
    PROFILE = '/profile/:viewedUserId',
    MY_PROFILE = '/my-profile',
    ICE_CREAM= '/:name/:id'
  }
  