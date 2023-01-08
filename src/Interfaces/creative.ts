import { Contributor, User } from "./user";

interface Creative {
  id: string;
  lastModified: string;
  title: string;
  contributors: Contributor[];
  createdBy: User;
  formats: CreativeFormat[];
  enabled: boolean;
  description?: string;
  content?: string;
}

interface CreativeFormValues {
  title: string;
  description?: string;
  content?: string;
  enabled: boolean;
  formats: CreativeFormat[];
}

interface CreativeFormat {
  width: number;
  height: number;
}

export type { Creative, CreativeFormValues, CreativeFormat };
