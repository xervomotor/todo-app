import React, { useState, useEffect } from 'react'

export const TipsBlock = () => {

    const [tips, setTips] = useState("");
    const API_KEY = "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";

    useEffect(() => {
        const getTips = async () => {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                  model: "gpt-3.5-turbo",
                  messages: [
                    { role: "system", content: 'You are a helpful assisstant.' },
                    { role: "user", content: 'give a sentence' },
                  ],
                  max_tokens: 500,
                  n: 1,
                  stop: "\n",
                  temperature: 0.8,
                }),
              });

              if (!response.ok) {
                throw new Error(`Server request failed with status ${response.status}`);
              }
          
              const data = await response.json();
              const messageContent = data.choices[0].message.content;

              setTips(messageContent);
        };

        getTips();
    }, []);

    return (
        <div className='TipsBlock'>
            <p>{tips}</p>
        </div>
    )
}
