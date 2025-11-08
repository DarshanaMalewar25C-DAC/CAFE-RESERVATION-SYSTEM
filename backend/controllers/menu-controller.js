//This file lets admin add, update, delete menu items, and lets both user + admin fetch all menu items.

import pool from '../config/database.js';

/*
Fetch all menu items
Sorted by category → name
Used in:
User side (show menu)
Admin side (manage menu)
*/
export const getMenuItems = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM menu_items ORDER BY category, name');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image_url } = req.body;
    
    const [result] = await pool.execute(
      'INSERT INTO menu_items (name, description, price, category, image_url) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, category, image_url]
    );
    
    res.status(201).json({ message: 'Menu item added successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, image_url } = req.body;
    
    await pool.execute(
      'UPDATE menu_items SET name = ?, description = ?, price = ?, category = ?, image_url = ? WHERE id = ?',
      [name, description, price, category, image_url, id]
    );
    
    res.json({ message: 'Menu item updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute('DELETE FROM menu_items WHERE id = ?', [id]);
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};