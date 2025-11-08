USE cafe_table_booking;

-- Add end_time column to existing bookings table
ALTER TABLE bookings ADD COLUMN end_time TIME NOT NULL DEFAULT '22:00:00' AFTER booking_time;

-- Update existing bookings to have end_time 2 hours after booking_time
UPDATE bookings SET end_time = ADDTIME(booking_time, '02:00:00') WHERE end_time = '22:00:00';