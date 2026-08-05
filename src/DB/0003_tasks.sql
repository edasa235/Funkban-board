CREATE TABLE tasks
(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title varchar(255) NOT NULL,
    description text,
    priority varchar(20) DEFAULT 'Medium',
    column_id UUID NOT NULL REFERENCES columns(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_tasks_column_id
    ON tasks(column_id);