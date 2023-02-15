export function filterListTeacherBySubjectId(subject?: number[]) {
  if (!subject || subject.length === 0) {
    return {};
  }

  const hia = subject.map((item) => {
    return {
      subject: {
        id: item,
      },
    };
  });

  const some = { some: { OR: hia } };

  return some;
}
