import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { HookParameters } from '@astrojs/starlight/types';

import {
	readRootDirectory,
} from './filesystem';

import {
	generateSidebar,
} from './generator';

import type {
	SidebarGeneratorOptions,
} from './types';

export interface StarlightSidebarOptions
	extends Omit<
		SidebarGeneratorOptions,
		'directory'
	> {
	/**
	 * Diretório relativo a:
	 *
	 * src/content/docs/
	 *
	 * Exemplo:
	 *
	 * books
	 */
	directory: string;
}

function resolveDocsDirectory(
	root: URL,
	directory: string,
): string {
	return path.join(
		fileURLToPath(root),
		'src',
		'content',
		'docs',
		directory,
	);
}

export default function starlightSidebar(
	options: StarlightSidebarOptions,
) {
	return {
		name: 'take-notes-starlight-sidebar',

		hooks: {
			'config:setup': ({
				config,
				updateConfig,
				astroConfig,
				command,
				logger,
			}: HookParameters<'config:setup'>) => {
				const docsDirectory =
					resolveDocsDirectory(
						astroConfig.root,
						options.directory,
					);

				if (
					!fs.existsSync(docsDirectory)
				) {
					logger.warn(
						`Directory not found: ${docsDirectory}`,
					);

					return;
				}

				const entries =
					readRootDirectory(
						docsDirectory,
					);

				const sidebarGroup =
					generateSidebar(
						entries,
						{
							...options,
							includeDrafts:
								options.includeDrafts ??
								command === 'dev',
						},
					);

				updateConfig({
					sidebar: [
						...(config.sidebar ?? []),
						sidebarGroup,
					],
				});
			},
		},
	};
}

export { generateSidebar };
export { readRootDirectory };
export type * from './types';