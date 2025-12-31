export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","images/placeholder-car.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.DO3bWX_w.js",app:"_app/immutable/entry/app.DwQEaCuC.js",imports:["_app/immutable/entry/start.DO3bWX_w.js","_app/immutable/chunks/gEGLIths.js","_app/immutable/chunks/EHX04ujX.js","_app/immutable/chunks/FeYiXWpW.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/BKqL88mO.js","_app/immutable/entry/app.DwQEaCuC.js","_app/immutable/chunks/EHX04ujX.js","_app/immutable/chunks/D4YJWT4J.js","_app/immutable/chunks/BxJVYbMR.js","_app/immutable/chunks/BKqL88mO.js","_app/immutable/chunks/GwArbgj2.js","_app/immutable/chunks/Cf1UErGW.js","_app/immutable/chunks/FeYiXWpW.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
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
			},
			{
				id: "/xe-dien/[slug]",
				pattern: /^\/xe-dien\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
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
