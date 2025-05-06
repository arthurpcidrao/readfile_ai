'use client';

import { useState } from 'react';

export default function Chat() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/api/deepseek/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!res.ok) {
      setResponse('Erro ao se comunicar com a IA.');
      return;
    }

    const data = await res.json();
    setResponse(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          placeholder="Digite sua mensagem" 
          className="p-2 border"
        />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white">Enviar</button>
      </form>
      <div className="mt-4 p-4 bg-gray-100">
        <strong>Resposta:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}
