declare global {
	namespace NodeJS {
		interface ProcessEnv {
			SESSION_SECRET: string
			PORT?: string
			NODE_ENV: 'development' | 'production'
		}
	}
}
export {}
