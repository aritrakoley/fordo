import { Request, Response } from "express";
import { validate } from "typia";
import { TagCreateRequest, TagUpdateRequest } from "../types/tag.types";
import * as tagService from "../services/tag.service";

export const createTag = async (req: Request, res: Response) => {
  const validation = validate<TagCreateRequest>(req.body);

  if (!validation.success) {
    res.status(400).json({ validationErrors: validation.errors });
    return;
  }

  const [ok, _result, error] = await tagService.createTag(req.body);

  if (!ok) {
    res.status(500).json({ serverError: error });
    return;
  }

  res.status(200).json({ message: "Tag created successfully" });
};

export const editTag = async (req: Request, res: Response) => {
  const validation = validate<TagUpdateRequest>(req.body);

  if (!validation.success) {
    res.status(400).json({ validationErrors: validation.errors });
    return;
  }

  const [ok, _result, error] = await tagService.editTag(req.body);

  if (!ok) {
    res.status(500).json({ serverError: error });
    return;
  }

  res.status(200).json({ message: "Tag updated successfully" });
};

export const listTag = async (req: Request, res: Response) => {
  console.log({ body: req.body, type: typeof req.body });
  const validation = validate<{ ids: number[] } | {}>(req.body);

  if (!validation.success) {
    res.status(400).json({ validationErrors: validation.errors });
    return;
  }

  const [ok, result, error] = await tagService.listTag(req.body);

  if (!ok) {
    res.status(500).json({ serverError: error });
    return;
  }

  res.status(200).json({
    message: "Tag(s) fetched successfully",
    tags: result,
  });
};
