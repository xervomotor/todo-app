import React, { useState, useEffect } from 'react';

export const TipsBlock = ({todos}) => {
  const [tips, setTips] = useState("");
  const [displayIndex, setDisplayIndex] = useState(0);
  const [messageContent, setMessageContent] = useState("");
  const API_KEY = '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';

  useEffect(() => {

    const getTips = async (taskList) => {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: 'You are a helpful assistant.' },
            { role: "user", content: `You must give constructive suggestions on the todo list I provide,
                                      taking about priority, guidance on how to achieve them, and some 
                                      encouragement.
                                      Your words should be no more than 50 words in the format of casual chat.
                                      Don't use dot points.
                                      I have these tasks to complete: ${taskList.join(', ')}.`  },
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
      setMessageContent(data.choices[0].message.content);
      setTips('');
      setDisplayIndex(0);
    };

    const taskList = todos.map(todo => todo.task);
    if (taskList.length > 0) {
      getTips(taskList);
    }
    
  }, [todos]);

  useEffect(() => {
    if (displayIndex < messageContent.length) {
      const timer = setTimeout(() => {
        setTips((prevTips) => prevTips + messageContent[displayIndex]);
        setDisplayIndex((prevDisplayIndex) => prevDisplayIndex + 1);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [messageContent, displayIndex]);

  return (
    <div className='TipsBlock'>
      <p>{tips}</p>
    </div>
  )
}