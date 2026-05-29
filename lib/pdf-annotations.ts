import { openDB, type IDBPDatabase } from 'idb';
import type { PdfAnnotation, ReadingProgress } from '@/types';

const DB_NAME = 'nebians-db';
const DB_VERSION = 1;

async function getDB(): Promise<IDBPDatabase> {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('annotations')) {
        const annotationStore = db.createObjectStore('annotations', { keyPath: 'id' });
        annotationStore.createIndex('by-pdfId', 'pdfId');
        annotationStore.createIndex('by-page', 'pageNumber');
      }
      if (!db.objectStoreNames.contains('reading-progress')) {
        db.createObjectStore('reading-progress', { keyPath: 'pdfId' });
      }
      if (!db.objectStoreNames.contains('bookmarks')) {
        const bookmarkStore = db.createObjectStore('bookmarks', { keyPath: 'id' });
        bookmarkStore.createIndex('by-userId', 'userId');
        bookmarkStore.createIndex('by-resourceId', 'resourceId');
      }
      if (!db.objectStoreNames.contains('cached-resources')) {
        db.createObjectStore('cached-resources', { keyPath: 'id' });
      }
    },
  });
}

export async function getAnnotations(pdfId: string): Promise<PdfAnnotation[]> {
  const db = await getDB();
  const index = db.transaction('annotations').store.index('by-pdfId');
  return index.getAll(pdfId);
}

export async function addAnnotation(annotation: PdfAnnotation): Promise<void> {
  const db = await getDB();
  await db.put('annotations', annotation);
}

export async function updateAnnotation(annotation: PdfAnnotation): Promise<void> {
  const db = await getDB();
  await db.put('annotations', annotation);
}

export async function deleteAnnotation(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('annotations', id);
}

export async function deleteAnnotationsByPdfId(pdfId: string): Promise<void> {
  const db = await getDB();
  const annotations = await getAnnotations(pdfId);
  const tx = db.transaction('annotations', 'readwrite');
  for (const ann of annotations) {
    await tx.store.delete(ann.id);
  }
  await tx.done;
}

export async function getReadingProgress(pdfId: string): Promise<ReadingProgress | undefined> {
  const db = await getDB();
  return db.get('reading-progress', pdfId);
}

export async function saveReadingProgress(progress: ReadingProgress): Promise<void> {
  const db = await getDB();
  await db.put('reading-progress', { ...progress, lastReadAt: Date.now() });
}

export async function getBookmarks(userId: string): Promise<string[]> {
  const db = await getDB();
  const index = db.transaction('bookmarks').store.index('by-userId');
  const bookmarks = await index.getAll(userId);
  return bookmarks.map((b: { resourceId: string }) => b.resourceId);
}

export async function addBookmark(id: string, userId: string, resourceId: string): Promise<void> {
  const db = await getDB();
  await db.put('bookmarks', { id, userId, resourceId, createdAt: new Date().toISOString() });
}

export async function removeBookmark(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('bookmarks', id);
}