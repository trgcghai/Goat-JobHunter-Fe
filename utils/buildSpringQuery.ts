import { sfEqual, sfIn, sfLike } from "spring-filter-query-builder";

interface BuildQueryOptions {
  params: Record<string, string | number | boolean | Array<string | number>>;
  filterFields: string[];
  textSearchFields?: string[]; // Các field dùng LIKE search
  nestedArrayFields?: Record<string, string>; // Map field -> nested path, vd: { skills: "skills.name" }
  defaultSort?: string; // Default sort, vd: "updatedAt,desc"
  sortableFields?: string[]; // Các field có thể sort
}

interface BuildQueryResult {
  params: Record<string, string | number | boolean | Array<string | number>>;
  filterQuery: string;
}

/**
 * Build query params cho Spring Boot backend
 * @param options - Options để build query
 * @returns Object chứa params đã xử lý và filter query string
 */
export const buildSpringQuery = (
  options: BuildQueryOptions,
): BuildQueryResult => {
  const {
    params,
    filterFields,
    textSearchFields = [],
    nestedArrayFields = {},
    defaultSort = "updatedAt,desc",
    sortableFields = ["title", "salary", "createdAt", "updatedAt"],
  } = options;

  const clone = { ...params };
  const filterParts: string[] = [];

  // Build filter query
  for (const field of filterFields) {
    const value = clone[field];

    if (value === undefined || value === null || value === "") {
      continue;
    }

    // Nếu là array và có phần tử, dùng sfIn
    if (Array.isArray(value) && value.length > 0) {
      filterParts.push(sfIn(field, value).toString());
    }
    // Nếu là string và field nằm trong textSearchFields, dùng sfLike
    else if (typeof value === "string" && textSearchFields.includes(field)) {
      filterParts.push(sfLike(field, value).toString());
    }
    // Các trường hợp còn lại dùng sfEqual
    else if (!Array.isArray(value)) {
      const normalizedValue =
        typeof value === "boolean" ? (value ? "true" : "false") : value;
      filterParts.push(sfEqual(field, normalizedValue).toString());
    }

    // Xóa field đã xử lý
    delete clone[field];
  }

  // Xử lý nested array fields (vd: skills -> skills.name)
  for (const [field, nestedPath] of Object.entries(nestedArrayFields)) {
    const value = clone[field];

    if (value && Array.isArray(value) && value.length > 0) {
      filterParts.push(sfIn(nestedPath, value).toString());
      delete clone[field];
    }
  }

  // Combine filters với AND
  const filterQuery = filterParts.length > 0 ? filterParts.join(" and ") : "";

  if (filterQuery) {
    clone.filter = filterQuery;
  }

  // Xử lý pagination
  if (clone.page !== undefined) {
    clone.page = Number(clone.page);
  }

  if (clone.limit !== undefined) {
    clone.size = clone.limit;
    delete clone.limit;
  }

  // Xử lý sort
  let sortParam = "";

  if (clone.sort && typeof clone.sort === "object") {
    for (const field of sortableFields) {
      if (clone.sort[field as keyof typeof clone.sort]) {
        sortParam = `${field},${clone.sort[field as keyof typeof clone.sort] === "ascend" ? "asc" : "desc"}`;
        break;
      }
    }
    delete clone.sort;
  }

  // Default sort nếu không có
  if (!sortParam) {
    sortParam = defaultSort;
  }

  clone.sort = sortParam;

  console.log("Built query:", { params: clone, filterQuery });

  return {
    params: clone,
    filterQuery,
  };
};
