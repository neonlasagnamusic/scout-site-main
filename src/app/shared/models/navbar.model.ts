export interface NavItem {
  label: string;
  path: string;
  children?: { label: string; path: string; fragment?: string }[];
}
