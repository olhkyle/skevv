const route = {
	HOME: '/landing',
	AUTH: {
		ROOT: '/auth',
		LOGIN: '/auth/login',
		SIGNUP: '/auth/signup',
		FORGOT_PASSWORD: '/auth/forgot-password',
	},
	SERVICE: {
		ROOT: '/',
		WRITE: '/new',
		STATEMENTS: '/statements',
		GET_DATA_FROM_EXCEL: '/from-excel',
		SETTINGS: {
			ROOT: '/settings',
			MYACCOUNT_PROFILE: '/settings/myaccount/profile',
		},
		NOT_FOUND: '/*',
	},
};

export default route;
