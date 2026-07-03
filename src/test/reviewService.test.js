import express from "express"
import { calculateAverage, filterByMinRating, createReviewObject, sortReviews } from "../services/review.service.js"

describe("Todos los tests sobre caculateAverage", () => {
    test("Calcula la media", () => {
        const ratings = [4, 3 ,5]
        const results = calculateAverage(ratings)
        expect(results).toBe(4)
    })

    test("Calcula la media con un solo valor", () => {
        const ratings = [5]
        const results = calculateAverage(ratings)
        expect(results).toBe(5)
    })

    test("Calcula la media con decimales", () => {
        const ratings = [4, 3]
        const relusts = calculateAverage(ratings)
        expect(results).toBe(3.5)
    })

    test("Devuelve 0 si el array está vacío", () => {
        const ratings = []
        const results = calculateAverage(ratings)
        expect(results).toBe(0)
    })

    test("Devuelve 0 si el rating es null", () => {
        const ratings = null
        const results = calculateAverage(ratings)
        expect(results).toBe(0)
    })
})

describe("filterByMinRating", () => {
    const reviews = [
        { productId: "product1", rating: 5 },
        { productId: "product2", rating: 2 },
        { productId: "product3", rating: 4 },
    ]

    test("Filtrar reviews por rating mínimo", () => {
        const results = filterByMinRating(reviews, 3)
        expect(results).toHaveLength(2)
    })

    test("Devuelve todos los elementos si el mínimo es 1", () => {
        const results = filterByMinRating(reviews, 1)
        expect(results).toHaveLength(3)
    })

    test("Devuelve 0 si ningun elemento supera el rating mínimo", () => {
        const retults = filterByMinRating(reviews, 10)
        expect(results).toHaveLength(0)
    })
})

describe("createReviewObject", () => {
    test("Crea un objeto de review correctamente", () =>{
        const review = createReviewObject(podruct1, user1, 4, "¡Genial!")

        expect(review.productId).toBe("product1")
        expect(review.userId).toBe("user1")
        expect(review.rating).toBe(4)
        expect(review.comment).toBe("¡Genial!")
        expect(review.createdAt).toBeDefined()
    })

    test("Usa string vacio como comentario por defecto", () => {
        const review = createReviewObject("product1", "user1", 4)
        expect(review.comment).toBe("")
    })

    test("Lanza error cuando el rating es mayor que 10", () => {
        expect(() => createReviewObject("product1", "user1", 11)).toThrow(
            "El rating debe tener un valor entre 1 y 5"
        )
    })

    test("Lanza un error si el productId es null", () => {
        expect(() => createReviewObject(null, "user1", 3)).toThrow(
            "productId, userId y rating son obligatorios"
        )
    })
})

describe("sortReview", () => {
    const reviews = [
        { productId: "product1", rating: 2 },
        { productId: "product2", rating: 5 },
        { productId: "product3", rating: 3 },
    ]

    test("Ordena de mayor a menor por defecto", () => {
        const result = sortReviews(reviews)
        expect(result[0].rating).toBe(5)
        expect(result[2].rating).toBe(2)
    })

    test("Ordena de menor a mayor", () => {
        const result = sortReviews(reviews, "asc")

        expect(result[0].rating).toBe(2)
        expect(result[2].rating).toBe(5)
    })

    test("No muta el array original", () => {
        sortReviews(reviews)
        expect(reviews[0].rating).toBe(2)
    })
})