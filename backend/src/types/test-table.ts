export interface TestTable {
  id: number;
  name: string;
  created_at: string;
}

export type TestTableInsert = Omit<TestTable, 'id' | 'created_at'>;
