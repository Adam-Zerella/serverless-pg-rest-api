export interface Todo {
  id: string;
  label: string;
  is_enabled: boolean;
  created_at: string;
  deleted_at: string;
}

export interface TodoHistory {
  created_at: string;
  deleted_at: string;
}
