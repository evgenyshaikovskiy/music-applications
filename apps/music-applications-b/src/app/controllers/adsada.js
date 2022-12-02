async function query(data) {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/nlptown/bert-base-multilingual-uncased-sentiment',
    {
      headers: {
        Authorization: 'Bearer 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',
      },
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

query({ inputs: 'The answer to the universe is [MASK].' }).then((response) => {
  console.log(JSON.stringify(response));
});
