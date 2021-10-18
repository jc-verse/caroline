type TokenType = {
  name: string;
};

type Token = {
  type?: TokenType;
  value: string;
};

export function split(input: string): string[] {
  const commentStripped = input.replace(/{{(\n| ).*?(\n| )}}/gs, ' ');
  return commentStripped.split(/([0-9]+|[A-Za-z]+|[(){}]| |\n)/gs).filter(s => s.trim() !== '');
}
