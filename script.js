document.getElementById('summarizeButton').addEventListener('click', function() {
  const inputText = document.getElementById('inputText').value;
  if (!inputText) {
      alert("Please enter some text to summarize.");
      return;
  }

  const summarizedText = summarizeText(inputText);
  document.getElementById('outputText').textContent = summarizedText;
});

function summarizeText(text) {
  // Simple example: Split text into sentences and return the first few sentences
  const sentences = text.split('. ');
  const summaryLength = Math.min(3, sentences.length); // Show the first 3 sentences
  return sentences.slice(0, summaryLength).join('. ') + (summaryLength < sentences.length ? '...' : '');
}


//api calling in javascript

async function summarizeTextWithAI(text) {
  const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
          'Authorization': `Bearer YOUR_API_KEY`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          model: "text-davinci-003",
          prompt: `Summarize this text: ${text}`,
          max_tokens: 150
      })
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}

document.getElementById('summarizeButton').addEventListener('click', async function() {
  const inputText = document.getElementById('inputText').value;
  if (!inputText) {
      alert("Please enter some text to summarize.");
      return;
  }

  const summarizedText = await summarizeTextWithAI(inputText);
  document.getElementById('outputText').textContent = summarizedText;
});
