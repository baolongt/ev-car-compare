import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.-hBPCP8t.js","_app/immutable/chunks/BxJVYbMR.js","_app/immutable/chunks/EHX04ujX.js","_app/immutable/chunks/GwArbgj2.js","_app/immutable/chunks/Cg0_crmB.js","_app/immutable/chunks/D4YJWT4J.js","_app/immutable/chunks/Vt__04Is.js","_app/immutable/chunks/lHpPa_Kt.js","_app/immutable/chunks/Cf1UErGW.js","_app/immutable/chunks/FeYiXWpW.js","_app/immutable/chunks/gEGLIths.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/BKqL88mO.js","_app/immutable/chunks/BuG6y5PA.js"];
export const stylesheets = ["_app/immutable/assets/0.B_ZvwYlZ.css"];
export const fonts = [];
