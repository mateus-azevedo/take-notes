import type { StarlightUserConfig } from '@astrojs/starlight/types';

export type SidebarItem =
	NonNullable<StarlightUserConfig['sidebar']>[number];

export interface SidebarFrontmatter {
	title?: string;

	draft?: boolean;

	sidebar?: {
		label?: string;
		order?: number;
		hidden?: boolean;
		badge?: string | {
			text: string;
			variant?: 'note' | 'danger' | 'success' | 'caution' | 'tip' | 'default';
		};
		attrs?: Record<
			string,
			string | number | boolean | undefined
		>;
	};
}

export interface FileEntry {
	type: 'file';

	name: string;

	/**
	 * Caminho absoluto do arquivo.
	 */
	path: string;

	/**
	 * Caminho relativo à raiz de documentação.
	 */
	relativePath: string;

	/**
	 * Slug utilizado pelo Starlight.
	 */
	slug: string;

	metadata: SidebarFrontmatter;
}

export interface DirectoryEntry {
	type: 'directory';

	name: string;

	/**
	 * Caminho absoluto do diretório.
	 */
	path: string;

	/**
	 * Caminho relativo à raiz de documentação.
	 */
	relativePath: string;

	/**
	 * Slug do diretório.
	 */
	slug: string;

	/**
	 * index.md ou index.mdx do diretório.
	 */
	index?: FileEntry;

	/**
	 * Arquivos e subdiretórios.
	 */
	children: Entry[];
}

export type Entry = FileEntry | DirectoryEntry;

export interface SidebarGeneratorOptions {
	/**
	 * Diretório raiz utilizado para gerar a árvore.
	 *
	 * Exemplo:
	 * src/content/docs/books
	 */
	directory: string;

	/**
	 * Nome exibido no grupo principal.
	 *
	 * Exemplo:
	 * Livros
	 */
	label: string;

	/**
	 * Estado inicial do grupo.
	 */
	collapsed?: boolean;

	/**
	 * Se deve incluir páginas draft durante o build.
	 */
	includeDrafts?: boolean;
}