import {
  pgTable,
  text,
  real,
  timestamp,
  serial,
  integer,
} from "drizzle-orm/pg-core";

import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import z from "zod";

export const productTable = pgTable("product", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull().default(0),
  category: text("category"),
  type: text("type"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()), // Automatically update on row modification
});

export const productImageTable = pgTable("product_image", {
  id: text("id").primaryKey(),
  url: text("url").notNull(),
  productId: integer("product_id")
    .references(() => productTable.id)
    .notNull(),
});

const ProductSelectSchema = createSelectSchema(productTable);

const ProductInsertSchema = createInsertSchema(productTable).omit({
  createdAt: true,
  updatedAt: true,
  id: true,
});

export const ProductSchemas = {
  select: ProductSelectSchema,
  insert: ProductInsertSchema,
};

export type ProductSelectType = z.infer<typeof ProductSelectSchema>;
export type ProductInsertType = z.infer<typeof ProductInsertSchema>;
