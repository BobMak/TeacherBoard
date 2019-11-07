const HOST = "http://52.15.223.49:5000/"
// const HOST = "http://localhost:5000/"

export async function post (addr, data) {
  const options = {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    mode:   'cors',
    body:   JSON.stringify(data)
  };
  const res = await fetch(HOST+addr, options);
  return await res.json();
}

export async function get (addr) {
  const res = await fetch(HOST+addr, { mode: "cors" });
  const bod = await res.json();
  return bod;
}