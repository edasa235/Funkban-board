CREATE TABLE columns (
                         id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                         board_id UUID NOT NULL REFERENCES boards(id),
                         name VARCHAR(50),
                         position INT
);
CREATE INDEX idx_columns_board_position
    ON columns(board_id, position);