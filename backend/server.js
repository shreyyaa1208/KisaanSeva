import fetch from "node-fetch";

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Client } from "@gradio/client";
import diseaseRoutes from "./disease.js";


dotenv.config({ path: "./backend/.env" });
console.log("HF token:", process.env.HF_API_TOKEN?.slice(0, 8) + "…");

console.log("🤖 Chatbot ID:", process.env.CHATBASE_BOT_ID);

const app = express();
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://kisaan-seva.vercel.app",
        "https://kisaan-seva-6rbl1w0tn-shreyyaa1208s-projects.vercel.app"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true
}));

app.use(express.json());


app.use("/api", diseaseRoutes);

// 🔹 Fertilizer Prediction Endpoint
app.post("/predict-fertilizer", async (req, res) => {
    const { temp, humidity, moisture, soil, crop, N, P, K } = req.body;
    console.log("HF API Token exists:", !!process.env.HF_API_TOKEN);

    try {
        const client = await Client.connect("Trisita/crop_and_fertilizer_recommendation_system", {
            hf_token: process.env.HF_API_TOKEN
        });

        const result = await client.predict("/predict_1", {
            temp: Number(temp),
            humidity: Number(humidity),
            moisture: Number(moisture),
            soil,
            crop,
            N: Number(N),
            P: Number(P),
            K: Number(K),
        });

        console.log("Fertilizer Result:", result);
        res.json({ prediction: result.data[0] });
    } catch (error) {
        console.error("Crop prediction error:", error.message);
        if (error.response) {
            console.error("🔴 Hugging Face API response:", await error.response.text());
        }
        res.status(500).json({ error: "Crop prediction failed" });
    }
});

// 🔹 Crop Recommendation Endpoint
app.post("/predict-crop", async (req, res) => {
    console.log("📥 /predict-crop endpoint hit", req.body);

    const { temp, humidity, ph, rainfall, N, P, K } = req.body;

    try {
        const client = await Client.connect("Trisita/crop_and_fertilizer_recommendation_system");
        const result = await client.predict("/predict", {
            temp: Number(temp),
            humidity: Number(humidity),
            ph: Number(ph),
            rainfall: Number(rainfall),
            N: Number(N),
            P: Number(P),
            K: Number(K),
        });

        console.log("Crop Prediction Result:", result);
        res.json({ recommendedCrop: result.data[0] });
    } catch (err) {
        console.error("Crop prediction error:", err);
        res.status(500).json({ error: "Crop prediction failed" });
    }
});

// 🔹 Chatbase chatbot route
app.post("/chatbase", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await fetch("https://www.chatbase.co/api/v1/chat", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.CHATBASE_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chatbotId: process.env.CHATBASE_BOT_ID,
                messages: [{ role: "user", content: message }],
            }),
        });

        const data = await response.json();
        console.log("🔁 Chatbase Response:", data);

        res.status(200).json(data);
    } catch (err) {
        console.error("❌ Chatbase API error:", err);
        res.status(500).json({ error: "Chatbase response failed" });
    }
});

app.get("/chatbase-test", (req, res) => {
    res.send("Chatbase route is reachable ✅");
});

const PORT = process.env.PORT || 5001;
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`🚀 Local server running at http://localhost:${PORT}`);
    });
}






app.get("/", (req, res) => {
    res.send("✅ KisaanSeva backend is running locally!");
});


export default app;

