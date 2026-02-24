// Função para fazer requisições HTTP (GET, POST, PUT, DELETE)
export function createFetch(method, url, data = null) {
  function heandleError(response) {
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`)
    }
    return response.json()
  }
  
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: data ? JSON.stringify(data) : null
  })
  .then(response => handleError(response))
}
