export default function createActionTypes(type: string) {
  return [type, `${type}_SUCCESS`, `${type}_FAILURE`];
}
