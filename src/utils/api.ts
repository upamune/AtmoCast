export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export async function fetchAPI<T>(url: string): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new APIError(
      `API request failed: ${response.statusText}`,
      response.status,
      url
    );
  }
  return response.json();
}
