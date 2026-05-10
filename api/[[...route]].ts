import type { VercelRequest, VercelResponse } from '@vercel/node';

// Dynamically import the server entry
const getServerEntry = async () => {
  const { default: serverEntry } = await import('../dist/server/server.js');
  return serverEntry;
};

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const serverEntry = await getServerEntry();
    
    // Convert Vercel request to Fetch API Request
    const url = new URL(req.url || '', `https://${req.headers.host}`);
    const fetchRequest = new Request(url, {
      method: req.method,
      headers: req.headers as Record<string, string>,
      body: req.method !== 'GET' && req.method !== 'HEAD' && req.body ? 
        JSON.stringify(req.body) : undefined,
    });

    // Call the server entry fetch handler
    const response = await serverEntry.fetch(fetchRequest, {}, {});

    // Convert Fetch API Response to Vercel response
    res.statusCode = response.status;
    
    // Copy headers
    response.headers.forEach((value, name) => {
      res.setHeader(name, value);
    });

    // Send response body
    const body = await response.text();
    res.send(body);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
