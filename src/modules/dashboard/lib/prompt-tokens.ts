export function countChars(text: string) {
  return text.length;
}

/** Rough heuristic (~4 chars/token) until a real tokenizer is wired up. */
export function countApproxTokens(text: string) {
  return Math.ceil(text.length / 4);
}
