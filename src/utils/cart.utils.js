/**
 * Calcula el precio total de un carrito.
 * @param {Array} items - Array de objetos con price y quantity
 * @returns {number} Total del carrito
 */
export const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}