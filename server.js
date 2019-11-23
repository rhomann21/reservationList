// Dependencies
// ===========================================================
const express = require("express");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
// set up the express app to handle data parsing
app.use(express.urlencoded({ extend: true }));
app.use(express.json());
// Data
// ===========================================================
const rsvp = [];
const waitlist = [];
// Routes
// ===========================================================
// general route
/** HTML ROUTES */
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, './public/tables.html'));
});
app.get("/form", function(req, res) {
  res.sendFile(path.join(__dirname, './public/form.html'));
});
/** API ROUTES */
app.get('/api/rsvp', (req, res) => {
  return res.json(rsvp);
});
app.get('/api/waitlist', (req, res) => {
  return res.json(waitlist);
});
app.post('/api/tables', (req, res) => {
  /* getting the raw data from client */
  /* format for my database */
  if (rsvp.length < 5) {
    rsvp.push(req.body);
    res.json(true);
  } else {
    waitlist.push(req.body);
    res.json(false);
  }
});
app.post('/api/clear', (req, res) => {
  rsvp.length = 0;
  waitlist.length = 0;
  res.json(true);
});
// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});