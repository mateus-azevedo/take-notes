import type {
	DirectoryEntry,
	Entry,
	FileEntry,
	SidebarGeneratorOptions,
	SidebarItem,
} from './types';

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
) {
	return entry.type === 'directory'
		? entry.index?.metadata
		: entry.metadata;
}

function getLabel(
	entry: Entry,
): string {
	const metadata = getMetadata(entry);

	return (
		metadata?.sidebar?.label ??
		metadata?.title ??
		prettifyName(entry.name)
	);
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

function createFileItem(
	entry: FileEntry,
): SidebarItem | null {
	if (isHidden(entry)) {
		return null;
	}

	return {
		slug: entry.slug,
		label: getLabel(entry),
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

		return {
			slug: entry.index.slug,
			label: getLabel(entry),
		};
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
	if (entry.index) {
		return {
			label: getLabel(entry),
			items: children,
			collapsed: false,
		};
	}

	/*
	 * Diretório sem index.md.
	 *
	 * Nesse caso o diretório continua
	 * sendo apenas um grupo.
	 */
	if (children.length > 0) {
		return {
			label: getLabel(entry),
			items: children,
			collapsed: false,
		};
	}

	return null;
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

	if (isHidden(entry)) {
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