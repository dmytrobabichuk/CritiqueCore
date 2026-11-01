const base = import.meta.env.VITE_API_URL || '/api';
export async function request(path, { body, ...options } = {}) {
  const response = await fetch(`${base}${path}`, {
    ...options,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : {},
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || `������� HTTP ${response.status}`);
  return data;
}
