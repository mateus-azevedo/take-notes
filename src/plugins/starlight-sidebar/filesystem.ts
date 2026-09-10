import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type {
  DirectoryEntry,
  Entry,
  FileEntry,
  SidebarFrontmatter,
} from "./types";

const MARKDOWN_EXTENSIONS = [".md", ".mdx"];

export function isMarkdownFile(filename: string): boolean {
  return MARKDOWN_EXTENSIONS.includes(path.extname(filename));
}

export function readFrontmatter(filePath: string): SidebarFrontmatter {
  const content = fs.readFileSync(filePath, "utf8");

  const { data } = matter(content);

  return data as SidebarFrontmatter;
}

export function normalizeSlug(value: string): string {
  return value
    .replaceAll(path.sep, "/")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
}

export function getSlug(baseSlug: string, relativePath: string): string {
  const normalizedPath = relativePath
    .replaceAll(path.sep, "/")
    .replace(/\.(md|mdx)$/, "")
    .replace(/\/index$/, "");

  const normalizedBase = normalizeSlug(baseSlug);

  if (!normalizedPath) {
    return normalizedBase;
  }

  return [normalizedBase, normalizedPath].filter(Boolean).join("/");
}

export function createFileEntry(
  filePath: string,
  relativePath: string,
  baseSlug: string,
): FileEntry {
  return {
    type: "file",
    name: path.basename(relativePath, path.extname(relativePath)),
    path: filePath,
    relativePath,
    slug: getSlug(baseSlug, relativePath),
    metadata: readFrontmatter(filePath),
  };
}

export function readDirectory(
  directoryPath: string,
  relativePath: string,
  baseSlug: string,
): DirectoryEntry {
  const entries = fs.readdirSync(directoryPath, {
    withFileTypes: true,
  });

  const indexEntry = entries.find(
    (entry) => entry.isFile() && /^index\.(md|mdx)$/.test(entry.name),
  );

  const index = indexEntry
    ? createFileEntry(
        path.join(directoryPath, indexEntry.name),
        path.join(relativePath, indexEntry.name),
        baseSlug,
      )
    : undefined;

  const children: Entry[] = [];

  for (const entry of entries) {
    /*
     * index.md pertence ao próprio diretório.
     *
     * Ele não deve aparecer como filho.
     */
    if (/^index\.(md|mdx)$/.test(entry.name)) {
      continue;
    }

    const entryPath = path.join(directoryPath, entry.name);

    const entryRelativePath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      children.push(readDirectory(entryPath, entryRelativePath, baseSlug));

      continue;
    }

    if (entry.isFile() && isMarkdownFile(entry.name)) {
      children.push(createFileEntry(entryPath, entryRelativePath, baseSlug));
    }
  }

  return {
    type: "directory",
    name: path.basename(directoryPath),
    path: directoryPath,
    relativePath,
    slug: getSlug(baseSlug, relativePath),
    index,
    children,
  };
}

export function readRootDirectory(
  directoryPath: string,
  baseSlug: string,
): Entry[] {
  const entries = fs.readdirSync(directoryPath, {
    withFileTypes: true,
  });

  return entries.flatMap((entry): Entry[] => {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      return [readDirectory(entryPath, entry.name, baseSlug)];
    }

    if (entry.isFile() && isMarkdownFile(entry.name)) {
      return [createFileEntry(entryPath, entry.name, baseSlug)];
    }

    return [];
  });
}
