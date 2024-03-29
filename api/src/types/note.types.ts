import { NoteRow } from "./database.types";

export type Note = NoteRow;

export type NoteCreateRequest = Partial<Omit<Note, "id" | "is_active">> &
  Pick<Note, "recipe_id">;

export type NoteUpdateRequest = Partial<Note> & Pick<Note, "id">;
