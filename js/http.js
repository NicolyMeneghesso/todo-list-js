// Função genérica para requisições HTTP usando fetch + async/await
export async function request(method, url, data = null) {
    // Configuração base da requisição
  const options = {
    method,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  }
  // Se houver dados (POST/PUT), adiciona no body
  if (data) {
    options.body = JSON.stringify(data)
  }

  // Executa a requisição e aguarda a resposta
  const response = await fetch(url, options)

  // Se a resposta não for sucesso (status 2xx), lança erro
  if (!response.ok) {
    throw new Error(`Erro ${response.status}: ${response.statusText}`)
  }

  // DELETE pode não retornar corpo
  // Então verificamos se existe conteúdo antes de converter
  if (response.status === 204) {
    return null
  }

  return await response.json()
}