export const get = async <Response>(url: string): Promise<Response> => {
  try {
    const response = await fetch(url);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json);
    }

    return json;
  } catch (error) {
    throw error;
  }
};

export const post = async <Response, Data = Record<string, unknown>>(
  url: string,
  data: Data
): Promise<Response> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json);
    }

    return json;
  } catch (error) {
    throw error;
  }
};
