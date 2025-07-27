/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Auth routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SendOTP:
 *       type: object
 *       required:
 *         - mobile
 *       properties:
 *         mobile:
 *           type: string
 *           example: "09123456789"
 *     CheckOTP:
 *       type: object
 *       required:
 *         - mobile
 *         - code
 *       properties:
 *         mobile:
 *           type: string
 *           example: "09123456789"
 *         code:
 *           type: string
 *           example: "12345"
 */

/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: Login with OTP
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/SendOTP'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendOTP'
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /auth/check-otp:
 *   post:
 *     summary: Check OTP code
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/CheckOTP'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CheckOTP'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Access denied
 */
