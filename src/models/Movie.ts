import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";

@Entity("movies")
export class Movie {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  description?: string;

  @Column()
  duration?: number;

  @Column()
  category_id?: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category?: Category;

  @Column()
  created_at?: Date;
}
