USE cafe_table_booking;

-- Clear existing menu items
DELETE FROM menu_items;

-- Reset auto increment
ALTER TABLE menu_items AUTO_INCREMENT = 1;

-- Insert updated menu items
INSERT INTO menu_items (name, description, price, category, image_url) VALUES 
-- South Indian (4 items)
('Idli Sambar', 'Steamed rice cakes with lentil curry', 40.00, 'South Indian', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400'),
('Medu Wada Sambar', 'Fried lentil donuts with sambar', 50.00, 'South Indian', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400'),
('Plain Dosa', 'Crispy rice and lentil crepe', 40.00, 'South Indian', 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400'),
('Butter Dosa', 'Crispy dosa with butter', 50.00, 'South Indian', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400'),
-- Tea (2 items)
('Lemon Tea', 'Refreshing tea with lemon', 15.00, 'Tea', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'),
('Special Tea', 'House special blend tea', 20.00, 'Tea', 'https://images.unsplash.com/photo-1594631661960-0e4c8d0b3d8f?w=400'),
-- Beverages (4 items)
('Cold Coffee', 'Chilled coffee drink', 30.00, 'Beverages', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400'),
('Special Cold Coffee', 'Premium cold coffee blend', 40.00, 'Beverages', 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400'),
('Cold Coffee with Crush', 'Cold coffee with ice crush', 50.00, 'Beverages', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
('Hot Chocolate', 'Rich hot chocolate drink', 30.00, 'Beverages', 'https://images.unsplash.com/photo-1542990253-0b8be2f7f5b8?w=400'),
-- Pav Bhaji (2 items)
('Pav Bhaji', 'Spiced vegetable curry with bread', 70.00, 'Pav Bhaji', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400'),
('Masala Cheese Dosa', 'Spiced dosa with cheese filling', 75.00, 'Pav Bhaji', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400'),
-- Pasta & Fries (4 items)
('Red Pasta', 'Pasta in tomato sauce', 80.00, 'Pasta & Fries', 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400'),
('Cheese Red Pasta', 'Red pasta with cheese', 90.00, 'Pasta & Fries', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400'),
('White Pasta', 'Pasta in white sauce', 80.00, 'Pasta & Fries', 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400'),
('Creamy White Pasta', 'Extra creamy white pasta', 90.00, 'Pasta & Fries', 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400'),
-- Pizza (3 items)
('Margherita Pizza', 'Classic tomato and cheese pizza', 130.00, 'Pizza', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400'),
('Farmhouse Pizza', 'Loaded vegetable pizza', 150.00, 'Pizza', 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400'),
('Paneer Tandoori Pizza', 'Pizza with tandoori paneer', 160.00, 'Pizza', 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400'),
-- Pizza & Burger (4 items)
('Cheese Corn Pizza', 'Small pizza with cheese and corn', 60.00, 'Pizza & Burger', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400'),
('Veggie Burger', 'Vegetarian burger with fresh veggies', 70.00, 'Pizza & Burger', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'),
('Aloo Tikki Burger', 'Burger with potato patty', 50.00, 'Pizza & Burger', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400'),
('Veggie Double Patty Burger', 'Double patty veggie burger', 80.00, 'Pizza & Burger', 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400'),
-- Sandwiches (4 items)
('Veg Sandwich', 'Fresh vegetable sandwich', 25.00, 'Sandwiches', 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400'),
('Veg Cheese Sandwich', 'Veggie sandwich with cheese', 35.00, 'Sandwiches', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400'),
('Corn Sandwich', 'Sweet corn sandwich', 40.00, 'Sandwiches', 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400'),
('Corn Cheese Sandwich', 'Corn sandwich with cheese', 50.00, 'Sandwiches', 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400'),
-- Grilled Sandwiches (4 items)
('Veg Grilled Sandwich', 'Grilled vegetable sandwich', 30.00, 'Grilled Sandwiches', 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400'),
('Veg Cheese Grilled Sandwich', 'Grilled veggie sandwich with cheese', 40.00, 'Grilled Sandwiches', 'https://images.unsplash.com/photo-1606755962773-d324e9a13086?w=400'),
('Corn Grilled Sandwich', 'Grilled corn sandwich', 50.00, 'Grilled Sandwiches', 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400'),
('Corn Cheese Grilled Sandwich', 'Grilled corn sandwich with cheese', 60.00, 'Grilled Sandwiches', 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400');