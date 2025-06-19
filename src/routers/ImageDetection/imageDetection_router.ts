import * as fss from 'fs';
import fs from 'fs/promises';

import z from 'zod';
import { FastifyTypedInstance } from "../../utils/types";

import * as tf from '@tensorflow/tfjs';

import ollama from 'ollama';
import { pipeline } from 'stream';
import util from 'util';

const pump = util.promisify(pipeline)


let model: any;

async function loadModel() {
	model = await tf.loadGraphModel('../../remote_control_320_web_model/model.json');
	console.log('Model loaded successfully');
}

function preprocess(img: tf.PixelData | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap) {
  return tf.tidy(() => {
    return tf.browser.fromPixels(img)
      .resizeBilinear([320, 320])
      .toFloat()
      .div(255)
      .expandDims(0); // [1, 640 | 320, 640 | 320, 3]
  });
}


export async function imageDetectionRouter(app: FastifyTypedInstance) {
	app.post('/', {
		schema: {
			tags: ['Image Detection'],
			description: 'Image Detection',
			body: z.any()
		},
	}, async (req, reply) => {
			const data = await req.file();
			// console.log('File:', data);

		  // const fileStream = fs.createWriteStream(path.join(__dirname, 'uploads', data!.filename));
			
			console.log('file name: ', data!.filename)

			// const fileStream = fs.createWriteStream(path.join(__dirname, 'uploadss', data!.filename));
			await pump(data!.file, fss.createWriteStream(`./uploads/${data!.filename}`))
			.then((data) => {
				console.log(`File uploaded successfully: ${data}`);
			}).catch((error) => {
				console.error('Error uploading file:', error);
			})

			// console.log('File:', fileStream);
			
			// await data!.pipe(fileStream).on('finish', () => {
			// 	console.log(`File uploaded successfully: ${data.filename}`);
			// 	reply.code(200).send({ message: 'File uploaded successfully', filename: data.filename });
			// });

		// const uploadFiles = await req.body
		

		// const data = await req.file()

		// console.log('Files:', data);
		// console.log('Files:', uploadFiles);
		const imageName = data!.filename

		const src = __dirname.replace("src\\routers\\ImageDetection", '')

		console.log('Current directory:', `${src}uploads/05.jpg`);
		console.log(__filename)

		async function imageToBase64(): Promise<string | null> {
			try {
				const imageBuffer = await fs.readFile(`${src}uploads/${imageName}`);
				const imageBase64 = imageBuffer.toString('base64');
				return imageBase64;
			} catch (error) {
				console.error('Error converting image to base64:', error);
				return null;
			}
		}

		const image = await imageToBase64()

		if(image === null) {
			return reply.status(500).send({error: 'Error converting image to base64'})
		}

		const response = await ollama.generate({
			model: 'marketModel',
			prompt: 'Analisando essa imagem de uma etiqueta de produto de mercado, extraia as informações do produto, como peso, marca, nome do produto, preço e se há diferença entre venda por kilo e por pacote individual (pc). Retorne um JSON com as informações extraídas.',
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
						name: {
							type: "string"
						},
						prices: {
							type: "array",
							price: {
								type: "string",
								value: "number" ,
								unit: "string"
							}
						},
						currency: {
							type: "string"
						}
					},
					required: ['brand', 'productName', 'prices', 'currency', 'weight']
				}
		})

		console.log(response.response)

		reply.send(response.response)

	// 	try {
	// 	const image = req.body!.image

	// 	console.log('Image:', image);

	// 	const normalizedImage = preprocess(image);

	// 	const predictions = await model.executeAsync(normalizedImage);

	// 	const boxes = await predictions[0].array();
	// 	const scores = await predictions[1].array();
	// 	const classes = await predictions[2].array();
	// 	const numDetections = await predictions[3].array();

	// 	reply.send(({boxes: boxes[0], scores: scores[0], classes: classes[0], numDetections: numDetections[0]}));
	// } catch (error) {
	// 		console.error('Error during detection:', error);
	// 		reply.status(500).send({error: 'Detection failed'});
	// }

	// 	return reply.send('deu certo')
	})
}