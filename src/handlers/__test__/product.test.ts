import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
	test("should display validation errors", async () => {
		const response = await request(server).post("/api/products").send({});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(4);

		expect(response.status).not.toBe(404);
		expect(response.body.errors).not.toHaveLength(2);
	});

	test("should validate the price is greater than 0", async () => {
		const response = await request(server).post("/api/products").send({
			name: "Monitor curvo",
			price: 0,
		});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(1);

		expect(response.status).not.toBe(404);
		expect(response.body.errors).not.toHaveLength(2);
	});

	test("should validate the price is a number and greater than 0", async () => {
		const response = await request(server).post("/api/products").send({
			name: "Monitor curvo",
			price: "hola",
		});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(2);

		expect(response.status).not.toBe(404);
		expect(response.body.errors).not.toHaveLength(4);
	});

	test("should create a new product", async () => {
		const response = await request(server).post("/api/products").send({
			name: "Mousepad - testing",
			price: 35,
		});
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("data");

		expect(response.status).not.toBe(404);
		expect(response.status).not.toBe(200);
		expect(response.body).not.toHaveProperty("errors");
	});
});

describe("GET /api/products", () => {
	test("Should check id api/products url exist", async () => {
		const response = await request(server).get("/api/products");
		expect(response.status).not.toBe(404);
	});

	test("GET a JSON response with products", async () => {
		const response = await request(server).get("/api/products");

		expect(response.status).toBe(200);
		expect(response.header["content-type"]).toMatch(/json/);
		expect(response.body).toHaveProperty("data");

		expect(response.status).not.toHaveProperty("errors");
	});
});

describe("GET /api/products/:id", () => {
	test("should return 404 response for a non-existing product", async () => {
		const productId = 2000;
		const response = await request(server).get(`/api/products/${productId}`);

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error).toBe("Producto no encontrado");
	});

	test("Should check a valid ID in the url", async () => {
		const response = await request(server).get("/api/products/not-valid-url");

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors[0].msg).toBe("ID no válido");
	});

	test("GET a JSON response for a single product", async () => {
		const response = await request(server).get("/api/products/1");

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("data");
	});
});

describe("PUT /api/products/:id", () => {
	test("Should check a valid ID in the url", async () => {
		const response = await request(server)
			.put("/api/products/not-valid-url")
			.send({ name: "Monitor curvo", price: 300, availability: true });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors[0].msg).toBe("ID no válido");
	});

	test("Should display validation error messages when updating a new product", async () => {
		const response = await request(server).put("/api/products/1").send({});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(5);

		expect(response.status).not.toBe(200);
		expect(response.body).not.toHaveProperty("data");
	});

	test("Should validate the price is greater than 0", async () => {
		const response = await request(server).put("/api/products/1").send({
			name: "Monitor curvo",
			price: 0,
			availability: true,
		});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("errors");
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors[0].msg).toBe("Precio no válido");

		expect(response.status).not.toBe(200);
		expect(response.body).not.toHaveProperty("data");
	});

  test("Should return a 404 response for a non-existing product", async () => {
    const productId = 2000
		const response = await request(server).put(`/api/products/${productId}`).send({
			name: "Monitor curvo",
			price: 100,
			availability: true,
		});

		expect(response.status).toBe(404);
		expect(response.body.error).toBe("Producto no encontrado");

		expect(response.status).not.toBe(200);
		expect(response.body).not.toHaveProperty("data");
	});

  test("Should update an existing product with valid data", async () => {
		const response = await request(server).put(`/api/products/1`).send({
			name: "Monitor curvo",
			price: 100,
			availability: true,
		});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("data");

		expect(response.status).not.toBe(400);
		expect(response.body).not.toHaveProperty("errors");
	});

});

describe("PATCH /api/products/:id", () => {
  test("Should return a 404 response for a non-existing product", async ()=> {
    const productId = 2000
    const response = await request(server).patch(`/api/products/${productId}`)

    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Producto no encontrado')

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })
  
  test("Should update de product availability", async ()=> {
    const response = await request(server).patch(`/api/products/1`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data.availability).toBe(false)

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty('error')
  })
})


describe("DELETE /api/products", () => {
  test("Should validate a valid id", async () => {
    const response = await request(server).delete('/api/products/not-valid')

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors[0].msg).toBe('ID no válido')
  })

  test("Should return a 404 response for a non-existent product", async () => {
    const productId = 2000
    const response = await request(server).delete(`/api/products/${productId}`)

    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Producto no encontrado')

    expect(response.status).not.toBe(200)
  })

  test("Should delete a product", async () => {
    const response = await request(server).delete(`/api/products/1`)

    expect(response.status).toBe(200)
    expect(response.body.data).toBe('Producto eliminado')

    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(404)
  })
})

