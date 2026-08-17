export type JournalEntry = {
  id: number;
  userId: number;
  date: string;
  humeur: number;
  energie: number;
  sommeil: number;
  anxiete: number;
  evenements?: string | null;
  gratitude?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Paginated<T> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};