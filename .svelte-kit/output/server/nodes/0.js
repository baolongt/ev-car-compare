import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.C83phUgs.js","_app/immutable/chunks/xoBWTkKr.js","_app/immutable/chunks/DR2pEaz2.js","_app/immutable/chunks/D9LHccfq.js","_app/immutable/chunks/sBZwQUwX.js","_app/immutable/chunks/SGNisuqe.js","_app/immutable/chunks/DgdudvrA.js","_app/immutable/chunks/B5QC1ZAz.js","_app/immutable/chunks/BoKmrbW_.js"];
export const stylesheets = ["_app/immutable/assets/0.B2DMaxkK.css"];
export const fonts = [];
