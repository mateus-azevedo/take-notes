// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebar from './src/plugins/starlight-sidebar/index';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Take Notes',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			plugins: [
				starlightSidebar({
					directory: 'books',
					label: 'Livros',
				})
			],
		}),
	],
});
