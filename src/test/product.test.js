import request from 'supertest';
import app from '../app.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('API de Productos (Vinilos)', () => {
    let createdProductId;

    test("GET /health devuelve status ok", async () => {
        const res = await request(app).get("/health");
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("ok");
    });

    describe('POST /api/products', () => {
        it('Debería subir una imagen a Cloudinary y crear el producto en la DB', async () => {
        const response = await request(app)
        .post('/api/products')
        .field('title', 'Vinilo de Prueba Supertest')
        .field('price', '29.99')
        .attach('image', path.resolve(__dirname, './test-image.jpg'));

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Vinilo de Prueba Supertest');
      
        createdProductId = response.body.id;
    });

    it('Debería devolver error si no se envía una imagen', async () => {
        const response = await request(app)
        .post('/api/products')
        .field('title', 'Sin Imagen')
        .field('price', '10');
      
        expect(response.statusCode).not.toBe(200);
    });
  });

    describe('GET /api/products', () => {
        it('Debería obtener la lista de todos los productos', async () => {
        const response = await request(app).get('/api/products');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Debería obtener el detalle del producto creado anteriormente', async () => {
        if (!createdProductId) return;

        const response = await request(app).get(`/api/products/${createdProductId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(createdProductId);
        expect(response.body.title).toBe('Vinilo de Prueba Supertest');
    });

    it('Debería devolver 404 para un producto que no existe', async () => {
        const response = await request(app).get('/api/products/id-inexistente');
        expect(response.statusCode).toBe(404);
    });
  });
});
