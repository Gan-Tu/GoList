// If GOLIST_DISABLE_AUTH is set to 'false', will enable
// resource level authentication checks
export function enableAuth(): boolean {
  if (process.env.GOLIST_DISABLE_AUTH) {
    return process.env.GOLIST_DISABLE_AUTH === "false";
  }
  return true;
}
