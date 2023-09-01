// import express from "express";
// import * as dotenv from "dotenv";
// import OpenAI from "openai";

// dotenv.config();

// const app = express();

// const router = express.Router();

// const config = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAI(config);

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// router.route("/").get((req, res) => {
//   res.status(200).json({ message: "Hello from DALL.E ROUTES" });
// });

// router.route("/").post(async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const response = await openai.images.generate({
//       prompt,
//       n: 1,
//       size: "1024x1024",
//       response_format: "b64_json",
//     });

//     console.log("OpenAI API Response:", response.data);
//     console.log("Received prompt:", prompt);

//     const image = response.data.data[0].b64_json;

//     res.status(200).json({ photo: image });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });

// export default router;

import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const config = new OpenAI(openai);

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await config.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    // for openAI version 3
    // const image = response.data.data[0].b64_json;

    // for openAI version 4
    console.log("API Response:", response);
    const image = response.data.media[0].data;
    console.log("Image Data:", image);

    // openAI v3
    // res.status(200).json({ photo: image });

    // openAI v4
    res.status(200).json({
      id: response.id,
      object: "image",
      media: [{ type: "image", data: { base64: image }}],
    });
  } catch (error) {
    console.log("API error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
