CREATE TABLE tasks(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title varchar(255) NOT NULL,
    description text,
    priority varchar(20) NOT NULL DEFAULT 'Medium'
        CHECK(priority IN ('Low','Medium','High')),    column_id UUID NOT NULL REFERENCES columns(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_tasks_column_id
    ON tasks(column_id);