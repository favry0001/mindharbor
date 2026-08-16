export type User = {
  id: number;
  email: string;
  pseudonyme: string;
  role: "UTILISATEUR" | "ADMINISTRATEUR";
};