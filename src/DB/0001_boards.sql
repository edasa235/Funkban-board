CREATE TABLE boards (
                        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                        name VARCHAR(100),
                        created_at TIMESTAMP DEFAULT NOW()
);