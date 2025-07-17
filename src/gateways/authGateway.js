export function toUserObject(apiResponse) {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    permissions: apiResponse.permissions || [],
  };
}
