import axios from "axios";
import ollama from 'ollama'
import fs from 'fs/promises';
import { FastifyTypedInstance } from "../../utils/types";
import path from "path";
import z from "zod";

const api = axios.create({
	baseURL: 'http://127.0.0.1:11434/api/chat/'
	// baseURL: 'http://localhost:3000/'
});

export async function textExtractionRouter(app: FastifyTypedInstance) {
	app.post('/', {
		// schema: {
		// 	body: z.object({
		// 		imageName: z.string()
		// 	})
		// }
	}, async (req, reply) => {
		const imageName = '05.jpg'

		const src = __dirname.replace("src\\routers\\TextExtraction", '')

		console.log('Current directory:', `${src}uploads/05.jpg`);
		console.log(__filename)

		async function imageToBase64(imageName: string): Promise<string | null> {
			try {
				const imageBuffer = await fs.readFile(`${src}uploads/${imageName}`);
				const imageBase64 = imageBuffer.toString('base64');
				return imageBase64;
			} catch (error) {
				console.error('Error converting image to base64:', error);
				return null;
			}
		}

		const image = await imageToBase64(imageName)

		if(image === null) {
			return reply.status(500).send({error: 'Error converting image to base64'})
		}

		const response = await ollama.generate({
			model: 'marketModel',
			prompt: 'Analisando essa imagem de uma etiqueta de produto de mercado, extraia as informações do produto, como peso, marca, nome do produto e preço. Retorne um JSON com as informações extraídas.',
			images: [image],
			format: {
					type: "object",
					properties: {
						weight: {
							type: "string"
						},
						brand: {
							type: "string",

						},
						productName: {
							type: "string"
						},
						prices: {
							type: "array",
							price: {
								type: "string",
								value: "number" 
							}
						},
						currency: {
							type: "string"
						}
					},
					required: ['brand', 'productName', 'price', 'currency', 'weight']
				}
		})

		console.log(response.response)

		reply.send(response.response)
	})
}