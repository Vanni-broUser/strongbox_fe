const hostname = import.meta.env.VITE_HOSTNAME;


const postRequest = (endpoint, body, func) => {
  fetch(`${hostname}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }).then(response => {
    if (!response.ok)
      throw new Error(`Errore nella risposta del server: ${response.status} - ${response.statusText}`);
    return response.json();
  }).then(data => {
    func(data);
  }).catch(error => {
    console.error('Errore nella richiesta:', error);
  });
};


const getRequest = (endpoint, params, func) => {
  const url = new URL(`${hostname}${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => {
    if (!response.ok)
      throw new Error(`Errore nella risposta del server: ${response.status} - ${response.statusText}`);
    return response.json();
  }).then(data => {
    func(data);
  }).catch(error => {
    console.error('Errore nella richiesta:', error);
  });
};


export default {
  postRequest,
  getRequest
};
