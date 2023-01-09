interface User {
  firstName: string;
  lastName: string;
}

interface Contributor extends User {
  id: string;
}

export type { User, Contributor };
