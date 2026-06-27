export interface ModalEntry {
  label: string;
  name: string;
  notes: string;
}

export interface ModalData {
  title: string;
  isDenLeader: boolean;
  entries: ModalEntry[];
}

export interface RoleCard {
  title: string;
  type: string;
  icon: string;
  description: string;
  isDenLeader: boolean;
  modal: ModalData;
}
