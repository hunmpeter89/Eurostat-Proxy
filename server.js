import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/comext", async (req, res) => {
  const query = new URLSearchParams(req.query).toString();
  const target = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/DS-059322?" + query;
  console.log("Fetching:", target);
  try {
    const eurostat = await fetch(target);
    const text = await eurostat.text();
    res.set("Content-Type", eurostat.headers.get("content-type") || "text/csv");
    res.send(text);
  } catch (e) {
    res.status(500).send("Proxy error: " + e.toString());
  }
});

app.get("/", (req, res) => res.send("✅ Eurostat proxy online"));

app.listen(3000, () => console.log("Server running on port 3000"));
