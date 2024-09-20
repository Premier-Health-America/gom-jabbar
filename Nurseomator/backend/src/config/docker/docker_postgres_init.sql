CREATE TABLE nurses (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE nurse_status AS ENUM (
    'Patient care',
    'In motion',
    'At rest',
    'SOS'
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    nurse_id INTEGER REFERENCES nurses(id) ON DELETE CASCADE,
    latitude DECIMAL(9, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    status nurse_status,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_nurse_location UNIQUE (nurse_id)
);


CREATE TABLE supplies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO supplies (name) VALUES
    ('Marshmallows'),
    ('Needles (Extra Large)'),
    ('Hot Cocoa Mix'),
    ('Thermal Blankets'),
    ('Snow Boots'),
    ('Igloo Repair Kit'),
    ('Arctic Survival Guide'),
    ('Emergency Snow Shovels'),
    ('Yeti Repellent Spray'),
    ('Polar Bear Friendly Food'),
    ('Frostbite Cream'),
    ('Snow Goggles'),
    ('Reindeer Food'),
    ('Ice Fishing Gear'),
    ('Snowmobile Fuel');

CREATE TABLE nurse_supplies (
    id SERIAL PRIMARY KEY,
    nurse_id INTEGER REFERENCES nurses(id) ON DELETE CASCADE,
    supply_id INTEGER REFERENCES supplies(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    restocking_in_progress BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE supplies_history (
    id SERIAL PRIMARY KEY,
    nurse_supply_id INTEGER REFERENCES nurse_supplies(id) ON DELETE CASCADE,
    type VARCHAR(20) CHECK (type IN ('consumption', 'restock')) NOT NULL,
    quantity INTEGER NOT NULL,
    delivery_date TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE facilities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    latitude DECIMAL(9, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO facilities (name, latitude, longitude) VALUES
('Frostbite General Hospital', 45.4931, -73.5872),
('Snowfall Medical Center', 45.4961, -73.6294),
('Glacier Point Health Clinic', 45.5111, -73.5587),
('Blizzard Bay Recovery', 45.5715, -73.5634),
('Arctic Breeze Health Hub', 45.4547, -73.8114),
('Icecap Urgent Care', 45.4260, -73.6353),
('Polar Vortex Wellness', 45.4892, -73.6253),
('Shiver Peak Children’s Hospital', 45.4944, -73.5851),
('Frosty Pines Rehabilitation', 45.5031, -73.6177),
('Frozen Lake Medical Pavilion', 45.4579, -73.5697);

CREATE TABLE patient_records (
    id SERIAL PRIMARY KEY,
    facility_id INTEGER REFERENCES facilities(id) ON DELETE SET NULL,
    patient_name VARCHAR(100),
    record TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);