export class Service {
  private apiUrl = import.meta.env.VITE_API_URL;;

  protected async fetch<T>(path: string = '', init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.apiUrl}${path}`, init);

    if (response.status === 204) return undefined as unknown as T;

    const text = await response.text();

    if (!response.ok) {
      try {
        const parsed = JSON.parse(text) as { message?: string | string[] };
        const message = Array.isArray(parsed.message)
          ? parsed.message[0]
          : parsed.message;
        if (message) throw new Error(message);
      } catch (e) {
        if (e instanceof Error && e.message !== text) throw e;
      }
      throw new Error(text || `HTTP ${response.status}`);
    }

    return JSON.parse(text) as T;
  }
}
