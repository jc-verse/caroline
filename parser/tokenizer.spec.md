(As a temporary substitution for the BNF, which I was too lazy to define)

- `[0-9]+` is always a separate token, even immediately after letters
- `[A-Za-z]+` is a token
- `{{(\n| ).*?(\n| )}}` is a token
- `[(){};]` is a token
