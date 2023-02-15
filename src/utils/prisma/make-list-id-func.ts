import { BasicListIdInput } from '@common/input/basic-list-id.input';

export function makeIdCreateList(
  keyName: string,
  listFirstTags?: BasicListIdInput[],
) {
  const datas = [];
  listFirstTags?.forEach((item) => {
    datas.push({ [keyName]: { connect: { id: item.id } } });
  });

  return datas;
}

export function makeIdUpdateList(
  keyName: string,
  listFirstTags?: BasicListIdInput[],
) {
  if (!listFirstTags) {
    return {};
  } else {
    const data = makeIdCreateList(keyName, listFirstTags);
    return { deleteMany: {}, create: data };
  }
}
