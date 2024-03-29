import { Tag, TagCreateRequest, TagUpdateRequest } from "../types/tag.types";

import * as tagRepository from "../repository/tag.repository";

export const createTag = async (request: TagCreateRequest) => {
  const Tag: Partial<Tag> = request;
  const [ok, result, error] = await tagRepository.insertTag(Tag);
  return [ok, result, error];
};

export const editTag = async (request: TagUpdateRequest) => {
  const Tag: Partial<Tag> = request;
  return await tagRepository.updateTag(Tag);
};

export const listTag = async (request: { ids: number[] }) => {
  return await tagRepository.listTag(request.ids);
};
