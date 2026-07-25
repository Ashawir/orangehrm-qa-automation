const { test, expect } = require('@playwright/test')

const BASE_URL = 'https://jsonplaceholder.typicode.com'

test('API - Récupérer un utilisateur existant', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`)

    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body.id).toBe(1)
    expect(body.email).toContain('@')
    expect(body.name).toBeTruthy()
})

test('API - Utilisateur inexistant retourne 404', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/999`)
    expect(response.status()).toBe(404)
})

test('API - Créer un utilisateur', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users`, {
        data: {
            name: 'QA Tester',
            email: 'qa.tester@test.com',
            username: 'qa_tester'
        }
    })

    expect(response.status()).toBe(201)
    const body = await response.json()
    expect(body.id).toBeTruthy()
    expect(body.name).toBe('QA Tester')
})

test('API - Modifier un utilisateur', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/users/1`, {
        data: {
            name: 'QA Tester Updated',
            email: 'updated@test.com'
        }
    })

    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body.name).toBe('QA Tester Updated')
})

test('API - Supprimer un utilisateur', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/users/1`)
    expect(response.status()).toBe(200)
})