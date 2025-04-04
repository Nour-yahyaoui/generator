export const generatePassword = (
  length: number,
  includeChars: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean
): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  let characters = '';
  if (includeChars) characters += chars;
  if (includeNumbers) characters += numbers;
  if (includeSymbols) characters += symbols;
  
  if (!characters) return ''; // Return empty if no character types selected
  
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  
  return password;
};