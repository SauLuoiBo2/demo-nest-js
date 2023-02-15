export function filterByListId(keyName: string, list?: { id: number }[]) {
  if (!list || list.length === 0) {
    return {};
  }

  const hia = list.map((item) => {
    return {
      [keyName]: {
        id: item.id,
      },
    };
  });

  const some = { some: { OR: hia } };

  return some;
}

export function filterByListOneId(list?: { id: number }[]) {
  if (!list || list.length === 0) {
    return {};
  }

  const hia = list.map((item) => {
    return {
      id: item.id,
    };
  });

  const some = { OR: hia };

  return some;
}

export function filterById(id?: number) {
  if (id) {
    return { id };
  } else {
    return {};
  }
}
