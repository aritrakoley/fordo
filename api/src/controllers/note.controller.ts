import { Request, Response } from "express";
import { validate } from "typia";
import { NoteCreateRequest, NoteUpdateRequest } from "../types/note.types";
import * as noteService from "../services/note.service";

export const createNote = async (req: Request, res: Response) => {
  const validation = validate<NoteCreateRequest>(req.body);

  if (!validation.success) {
    res.status(400).json({ validationErrors: validation.errors });
    return;
  }

  const [ok, _result, error] = await noteService.createNote(req.body);

  if (!ok) {
    res.status(500).json({ serverError: error });
    return;
  }

  res.status(200).json({ message: "Note created successfully" });
};

export const editNote = async (req: Request, res: Response) => {
  const validation = validate<NoteUpdateRequest>(req.body);

  if (!validation.success) {
    res.status(400).json({ validationErrors: validation.errors });
    return;
  }

  const [ok, _result, error] = await noteService.editNote(req.body);

  if (!ok) {
    res.status(500).json({ serverError: error });
    return;
  }

  res.status(200).json({ message: "Note updated successfully" });
};

export const listNote = async (req: Request, res: Response) => {
  console.log({ body: req.body, type: typeof req.body });
  const validation = validate<{ ids: number[] } | {}>(req.body);

  if (!validation.success) {
    res.status(400).json({ validationErrors: validation.errors });
    return;
  }

  const [ok, result, error] = await noteService.listNote(req.body);

  if (!ok) {
    res.status(500).json({ serverError: error });
    return;
  }

  res.status(200).json({
    message: "Note(s) fetched successfully",
    Notes: result,
  });
};
