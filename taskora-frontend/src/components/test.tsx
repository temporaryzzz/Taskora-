import { useState } from 'react';

function TestBuild() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState({id: 0, content: 'undifiend'});

  const fetchGreeting = async () => {
    try {
      const response = await fetch(`http://localhost:8080/greeting?name=${name}`, {
        mode: "no-cors",
        method: "GET",
        headers: {
                 "Access-Control-Allow-Origin": "*"
            },
      });
      const data = await response.json();
      setGreeting(data);
      console.log("data:", data, "greeting:", greeting)
    } 
    catch (error) {
      console.error('Ошибка при получении приветствия:', error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Greeting App</h1>
      <input
        type="text"
        placeholder="Введите content"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => fetchGreeting()}>Отправить</button>

      {greeting && (
        <div style={{ marginTop: 20 }}>
          <p><strong>ID:</strong> {greeting.id}</p>
          <p><strong>Content:</strong> {greeting.content}</p>
        </div>
      )}
    </div>
  );
}

export default TestBuild;
