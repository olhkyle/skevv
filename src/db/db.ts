const DB_NAME = 'pdf-editor-db';
const DB_VERSION = 1;

export const TEMP_FILE_STORE = 'temp_files';

export function openDB(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onupgradeneeded = () => {
			const db = request.result;

			if (!db.objectStoreNames.contains(TEMP_FILE_STORE)) {
				db.createObjectStore(TEMP_FILE_STORE, {
					keyPath: 'id',
				});
			}
		};

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export async function saveTempFile(data: { id: string; blob: Blob; pageCount: number; pages: { id: string; order: number }[] }) {
	const db = await openDB();

	return new Promise<void>((resolve, reject) => {
		const tx = db.transaction(TEMP_FILE_STORE, 'readwrite');
		const store = tx.objectStore(TEMP_FILE_STORE);

		store.put({
			...data,
			updatedAt: Date.now(),
		});

		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
	});
}
