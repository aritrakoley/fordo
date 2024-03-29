import {
  Note,
  NoteCreateRequest,
  NoteUpdateRequest,
} from "../types/note.types";

import * as noteRepository from "../repository/note.repository";

export const createNote = async (request: NoteCreateRequest) => {
  const Note: Partial<Note> = request;
  const [ok, result, error] = await noteRepository.insertNote(Note);
  return [ok, result, error];
};

export const editNote = async (request: NoteUpdateRequest) => {
  const Note: Partial<Note> = request;
  return await noteRepository.updateNote(Note);
};

export const listNote = async (request: { ids: number[] }) => {
  return await noteRepository.listNote(request.ids);
};
