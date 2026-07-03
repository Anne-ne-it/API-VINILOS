import { ExplainVerbosity } from "mongodb"
import { addProductToWishlist, removeProductFromWishlist, isProductInWishlist, } from "../services/wishlist.service.js"

describe("addProductToWishlist", () => {
    test("Añade un producto nuevo a la lista", () => {
        const list = ["product1"]
        const result = addProductToWishlist(list, "product2")

        expect(result).toHaveLength(2)
        expect(result).toContain("product2")
    })

    test("No añade duplicados a la lista", () => {
        const list = ["product1"]
        const result = addProductToWishlist(list, "product1")
        expect(result).toHaveLength(1)
    })

    test("No muta la lista original", () => {
        const originalList = ["product1"]
        addProductToWishlist(originalList, "product2")

        expect(originalList).toHaveLength(1)
    })
})

describe("removeProductFromWishlist", ()=> {
    test("Elimina un producto de la lista", () => {
        const list = ["product1", "product2", "product3"]
        const result = removeProductFromWishlist(list, "product2")

        expect(result).not.toContain("product2")
        expect(result).toHaveLength(2)
    })

    test("Devuelve la misma lista si el producto no estaba", () => {
        const list = ["product1", "product2", "product3"]
        const result = removeProductFromWishlist(list, "product4")

        expect(result).toHaveLength(3)
    })

    test("Devuelve un array vacío si la lista tenía solo ese producto", () => {
        const list = ["product1"]
        const result = removeProductFromWishlist(list, "product1")

        expect(result).toHaveLength(0)
    })

    test("No muta la lista original", () => {
        const originalList = ["product1", "product2", "product3"]
        removeProductFromWishlist(originalList, "product3")

        expect(originalList).toHaveLength(3)
    })
})

describe("isProductInWishlist", () => {
    test("Devuelve true si el producto está en la lista", () => {
        const list = ["product1", "product2", "product3"]
        const result = isProductInWishlist(list, "product2")

        expect(result).toBe(true)
    })

    test("Devuelve false si el producto no está en la lista", () => {
        const list = ["product1", "product2", "product3"]
        const result = isProductInWishlist(list, "product4")

        expect(result).toBe(false)
    })

    test("Devuelve false si la lista está vacía", () => {
        const list = []
        const result = isProductInWishlist(list, "product1")

        expect(result).toBe(false)
    })
})