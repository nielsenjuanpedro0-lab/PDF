export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = Buffer.concat(chunks);

    console.log('body size:', body.length);
    console.log('content-type:', req.headers['content-type']);

    try {
        const response = await fetch('https://ascia-project-n8n.nsfvmr.easypanel.host/webhook/cupones', {
            method: 'POST',
            headers: { 'Content-Type': req.headers['content-type'] },
            body,
        });

        console.log('n8n status:', response.status);
        const text = await response.text();
        console.log('n8n response:', text.slice(0, 200));

        res.status(200).json({ status: response.status, body: text });

    } catch (err) {
        console.log('fetch error:', err.message);
        res.status(500).json({ error: err.message });
    }
}