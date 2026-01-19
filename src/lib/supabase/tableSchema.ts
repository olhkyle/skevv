import { Database } from './database.types';

type TableRowData = Archive | Project | File;

// {} => Record<string, never>, based on eslint ban-types
type ServiceDataType<T = TableRowData, D = Record<string, never>> = (T & D) | Partial<T & D> | null;

type Tables = Database['public']['Tables'];

type Archive = Tables['archive']['Row'];
type Project = Tables['project']['Row'];
type File = Tables['file']['Row'];

export type { TableRowData, ServiceDataType, Archive, Project, File };
