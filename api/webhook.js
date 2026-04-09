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

    const response = await fetch('https://ascia-project-n8n.nsfvmr.easypanel.host/webhook/cupones', {
        method: 'POST',
        headers: { 'Content-Type': req.headers['content-type'] },
        body,
    });

    const data = await response.json();
    res.status(200).json(data);
}