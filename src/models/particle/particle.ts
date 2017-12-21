import { Expense } from "../models";

export interface Particle {
  category: string,
  total: number,
  expenses: Expense[]
}