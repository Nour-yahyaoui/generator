import { useState, ChangeEvent, SetStateAction, Dispatch } from 'react';
import { generatePassword } from './passwordGenerator';
import './Form.css';

function Form() {
  const [charsChecked, setCharsChecked] = useState<boolean>(false);
  const [numChecked, setNumChecked] = useState<boolean>(false);
  const [symChecked, setSymChecked] = useState<boolean>(false);
  const [length, setLength] = useState<number>(20);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCheckboxChange = (setter: Dispatch<SetStateAction<boolean>>) => 
    (event: ChangeEvent<HTMLInputElement>) => {
      setter(event.target.checked);
    };

  const handleGeneratePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const password = generatePassword(
      length,
      charsChecked,
      numChecked,
      symChecked
    );
    setGeneratedPassword(password);
    setCopied(false);
  };

  const handleCopyPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(generatedPassword)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };

  const handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setLength(Math.max(20, Math.min(60, value))); // Clamp between 20-60
    }
  };

  return (
    <form className="password-form">
      <h1>password generator</h1>
      <h3>Check your parameters:</h3>
      <label htmlFor="chars">Contain characters:</label>
      <input
        type="checkbox"
        name="chk"
        id="chars"
        checked={charsChecked}
        onChange={handleCheckboxChange(setCharsChecked)}
      />{' '}
      <br />
      <label htmlFor="num">Contain numbers:</label>
      <input
        type="checkbox"
        name="chk"
        id="num"
        checked={numChecked}
        onChange={handleCheckboxChange(setNumChecked)}
      />{' '}
      <br />
      <label htmlFor="sym">Contain symbols:</label>
      <input
        type="checkbox"
        name="chk"
        id="sym"
        checked={symChecked}
        onChange={handleCheckboxChange(setSymChecked)}
      />
      <hr />
      <br />
      <label htmlFor="length">Password length:</label>
      <input
        type="number"
        name="lgth"
        id="length"
        value={length}
        onChange={handleLengthChange}
        placeholder="min: 20..."
        min="20"
        max="60"
      />
      {!(charsChecked || numChecked || symChecked) ? (
        <button type="button">Select parameters to generate!</button>
      ) : (
        <button type="button" onClick={handleGeneratePassword}>
          Generate!
        </button>
      )}
      {generatedPassword && (
        <div className="password-result">
          <div className="password-header">
            <h4>Generated Password:</h4>
            <button
              type="button"
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopyPassword}
              aria-label="Copy password"
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          <p>{generatedPassword}</p>
        </div>
      )}
    </form>
  );
}

export default Form;