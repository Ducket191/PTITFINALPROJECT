const express = require('express');
const router = express.Router();
const DataModel = require('./model');

router.post('/infor/add', async (req, res) => {
  try {
    const { temperature, humidity, brightness, moisture } = req.body;

    const newInfor = new DataModel({ temperature, humidity, brightness, moisture });
    const savedInfor = await newInfor.save();
    res.status(201).json(savedInfor);
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

router.get('/infor', async (req, res) => {
  try {
    const inforItems = await DataModel.find();
    res.status(200).json(inforItems);
  } catch (err) {
    console.error('Error retrieving data:', err);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

router.delete('/infor/:id', async (req, res) => {
  try {
    const deleted = await DataModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error deleting data:', err);
    res.status(500).json({ error: 'Failed to delete data' });
  }
});

module.exports = router;