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
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/so-sanh","/tinh-gia","/xe-dien","/xe-dien/vinfast-vf3","/xe-dien/vinfast-vf5","/xe-dien/vinfast-vf6","/xe-dien/vinfast-vf7","/xe-dien/vinfast-vf8","/xe-dien/vinfast-vf9","/xe-dien/byd-dolphin","/xe-dien/byd-atto3","/xe-dien/byd-seal","/xe-dien/tesla-model3","/xe-dien/tesla-modely","/xe-dien/hyundai-ioniq5","/xe-dien/hyundai-ioniq6","/xe-dien/mercedes-eqa","/xe-dien/mercedes-eqb","/xe-dien/mercedes-eqe-suv","/xe-dien/bmw-ix1","/xe-dien/bmw-ix3","/xe-dien/bmw-i4","/xe-dien/bmw-ix"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
