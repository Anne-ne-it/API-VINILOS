/**
 * @swagger
 * /users:
 *  get:
 *      summary: Obtener todos los ususarios
 *      responses:
 *          200:
 *              description: Lista de usuarios
 */

router.get("/", (req, res) => { res.json(users) })