export const deepseekChat = async (prompt: string) => {
    const response = await fetch('http://localhost:3001/api/deepseek/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    return await response.json();
  };