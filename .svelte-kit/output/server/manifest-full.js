export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.4iFcXdR-.js",app:"_app/immutable/entry/app.ByfqXU20.js",imports:["_app/immutable/entry/start.4iFcXdR-.js","_app/immutable/chunks/B5QC1ZAz.js","_app/immutable/chunks/DR2pEaz2.js","_app/immutable/chunks/sBZwQUwX.js","_app/immutable/entry/app.ByfqXU20.js","_app/immutable/chunks/DR2pEaz2.js","_app/immutable/chunks/DgdudvrA.js","_app/immutable/chunks/xoBWTkKr.js","_app/immutable/chunks/sBZwQUwX.js","_app/immutable/chunks/D9LHccfq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/so-sanh",
				pattern: /^\/so-sanh\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/tinh-gia",
				pattern: /^\/tinh-gia\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/xe-dien",
				pattern: /^\/xe-dien\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
