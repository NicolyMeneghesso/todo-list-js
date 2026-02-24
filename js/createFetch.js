// Função para fazer requisições HTTP (GET, POST, PUT, DELETE)
export function createFetch(method, url, data = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }
      return response.json()
    })
}