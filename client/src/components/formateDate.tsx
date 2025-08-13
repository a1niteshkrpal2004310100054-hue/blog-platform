export const FormateDate = (date: string): string => {
  const postDate = new Date(date);
  const now = new Date();

  const isToday =
    postDate.getDate() === now.getDate() &&
    postDate.getMonth() === now.getMonth() &&
    postDate.getFullYear() === now.getFullYear();

  if (isToday) {
    const difMs = now.getTime() - postDate.getTime();
    const diffHours = Math.floor(difMs / (1000 * 60 * 60));

    if (diffHours == 0) {
      const defMinute = Math.floor(difMs / (1000 * 60));
      return defMinute <= 1 ? "just now" : `${defMinute} minutes age`;
    }
    return `${diffHours} hours ${diffHours != 1 ? "s" : ""} ago `;
  }
  return postDate.toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
  });
};
