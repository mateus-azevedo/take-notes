import type {
	DirectoryEntry,
	Entry,
	FileEntry,
	SidebarGeneratorOptions,
	SidebarFrontmatter,
} from './types';

import type { SidebarItem } from './types';

function prettifyName(name: string): string {
	return name
		.replace(/[-_]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/\b\w/g, (character) =>
			character.toUpperCase(),
		);
}

function getMetadata(
	entry: Entry,
): SidebarFrontmatter | undefined {
	if (entry.type === 'directory') {
		return entry.index?.metadata;
	}

	return entry.metadata;
}

function getLabel(
	entry: Entry,
): string {
	const metadata = getMetadata(entry);

	if (
		metadata?.sidebar?.label
	) {
		return metadata.sidebar.label;
	}

	if (metadata?.title) {
		return metadata.title;
	}

	return prettifyName(entry.name);
}

function getOrder(
	entry: Entry,
): number {
	return (
		getMetadata(entry)?.sidebar?.order ??
		Number.MAX_SAFE_INTEGER
	);
}

function isHidden(
	entry: Entry,
): boolean {
	return (
		getMetadata(entry)?.sidebar?.hidden === true
	);
}

function isDraft(
	entry: Entry,
): boolean {
	return getMetadata(entry)?.draft === true;
}

function sortEntries(
	entries: Entry[],
): Entry[] {
	return [...entries].sort((a, b) => {
		const orderDifference =
			getOrder(a) - getOrder(b);

		if (orderDifference !== 0) {
			return orderDifference;
		}

		return getLabel(a).localeCompare(
			getLabel(b),
			'pt-BR',
			{
				sensitivity: 'base',
			},
		);
	});
}

function getSidebarMetadata(
	entry: Entry,
) {
	return getMetadata(entry)?.sidebar;
}

function createFileItem(
	entry: FileEntry,
): SidebarItem | null {
	if (isHidden(entry)) {
		return null;
	}

	const sidebar =
		getSidebarMetadata(entry);

	return {
		slug: entry.slug,
		label: getLabel(entry),
		...(sidebar?.badge
			? { badge: sidebar.badge }
			: {}),
		...(sidebar?.attrs
			? { attrs: sidebar.attrs }
			: {}),
	};
}

function createDirectoryItem(
	entry: DirectoryEntry,
	options: SidebarGeneratorOptions,
): SidebarItem | null {
	const children = generateEntries(
		entry.children,
		options,
	);

	const hasIndex = Boolean(entry.index);

	/*
	 * Diretório sem conteúdo.
	 */
	if (!entry.index && children.length === 0) {
		return null;
	}

	/*
	 * Diretório possui somente index.md.
	 *
	 * Exemplo:
	 *
	 * seja-homem/
	 * └── index.md
	 *
	 * Resultado:
	 *
	 * Seja Homem
	 */
	if (
		entry.index &&
		children.length === 0
	) {
		if (isHidden(entry)) {
			return null;
		}

		return createFileItem(entry.index);
	}

	/*
	 * Diretório possui index.md + filhos.
	 *
	 * Exemplo:
	 *
	 * telmo-martinello/
	 * ├── index.md
	 * └── seja-homem/
	 *
	 * Resultado:
	 *
	 * Telmo Martinello
	 * └── Seja Homem
	 */
	if (hasIndex) {
		const sidebar =
			entry.index?.metadata.sidebar;

		return {
			label: getLabel(entry),
			items: children,
			collapsed:
				options.collapsed ?? false,
			...(sidebar?.badge
				? { badge: sidebar.badge }
				: {}),
		};
	}

	/*
	 * Diretório sem index.md.
	 *
	 * Exemplo:
	 *
	 * fundamentos/
	 * ├── javascript.md
	 * └── typescript.md
	 *
	 * Resultado:
	 *
	 * fundamentos
	 * ├── Javascript
	 * └── Typescript
	 */
	return {
		label: getLabel(entry),
		items: children,
		collapsed:
			options.collapsed ?? false,
	};
}

function generateEntry(
	entry: Entry,
	options: SidebarGeneratorOptions,
): SidebarItem | null {
	if (
		!options.includeDrafts &&
		isDraft(entry)
	) {
		return null;
	}

	if (entry.type === 'file') {
		return createFileItem(entry);
	}

	return createDirectoryItem(
		entry,
		options,
	);
}

function generateEntries(
	entries: Entry[],
	options: SidebarGeneratorOptions,
): SidebarItem[] {
	return sortEntries(entries)
		.map((entry) =>
			generateEntry(entry, options),
		)
		.filter(
			(item): item is SidebarItem =>
				item !== null,
		);
}

export function generateSidebar(
	entries: Entry[],
	options: SidebarGeneratorOptions,
): SidebarItem {
	return {
		label: options.label,
		items: generateEntries(
			entries,
			options,
		),
		collapsed:
			options.collapsed ?? false,
	};
}