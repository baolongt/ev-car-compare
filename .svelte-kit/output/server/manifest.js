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
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/so-sanh","/tinh-gia","/xe-dien"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
