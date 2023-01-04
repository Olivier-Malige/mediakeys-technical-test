type Creative = {
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
  formats: {
    width: number;
    height: number;
  }[];
  enabled: boolean;
  description?: string;
  content?: string;
};

interface CreativeFormValues {
  title: string;
  description?: string;
  content?: string;
  enabled: boolean;
}

export type { Creative, CreativeFormValues };
