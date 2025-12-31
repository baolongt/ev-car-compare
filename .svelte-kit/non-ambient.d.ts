
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/so-sanh" | "/tinh-gia" | "/xe-dien";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/so-sanh": Record<string, never>;
			"/tinh-gia": Record<string, never>;
			"/xe-dien": Record<string, never>
		};
		Pathname(): "/" | "/so-sanh" | "/so-sanh/" | "/tinh-gia" | "/tinh-gia/" | "/xe-dien" | "/xe-dien/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.png" | string & {};
	}
}