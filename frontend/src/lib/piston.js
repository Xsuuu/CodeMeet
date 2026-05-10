const JUDGE0_API = 'https://ce.judge0.com/submissions?base64_encoded=false&wait=true'
const LANGUAGE_ID = {
  javascript: 63, // Node.js 18
  python: 71,     // Python 3.10
  java: 62,       // Java 15
};

export async function executeCode(language, code) {
  try {
    const languageId = LANGUAGE_ID[language];
    if (!languageId) return { success: false, error: `Unsupported language: ${language}` };

    const response = await fetch(JUDGE0_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: '',
      }),
    });

    if (!response.ok) return { success: false, error: `HTTP error: ${response.status}` };

    const data = await response.json();

    const output = data.stdout || '';
    const stderr = data.stderr || data.compile_output || '';

    if (stderr) return { success: false, output, error: stderr };

    return { success: true, output: output || 'No output' };
  } catch (err) {
    return { success: false, error: `Execution failed: ${err.message}` };
  }
}