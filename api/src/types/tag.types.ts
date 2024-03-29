import { TagRow } from "./database.types";

export type Tag = TagRow;

export type TagCreateRequest = Partial<Omit<Tag, "id" | "is_active">>;

export type TagUpdateRequest = Partial<Tag> & Pick<Tag, "id">;
