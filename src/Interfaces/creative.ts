interface Creative {
  id: string;
  lastModified: string;
  title: string;
  contributors: {
    id: string;
    firstName: string;
    lastName: string;
  }[];
  createdBy: {
    firstName: string;
    lastName: string;
  };
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
