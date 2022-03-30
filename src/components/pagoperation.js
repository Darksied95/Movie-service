import _ from "lodash";

export function paginate(items, pageCount, pagesize) {
  const startIndex = (pageCount - 1) * pagesize;
  return _(items).slice(startIndex).take(pagesize).value();
}
