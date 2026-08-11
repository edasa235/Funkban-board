CREATE TABLE task_labels (
                             task_id uuid NOT NULL REFERENCES tasks(id),
                             label_id uuid NOT NULL REFERENCES labels(id),

                             PRIMARY KEY(task_id, label_id)
);
CREATE INDEX idx_task_labels_id
    ON task_labels(label_id);
ALTER TABLE task_labels
    DROP CONSTRAINT task_labels_task_id_fkey;

ALTER TABLE task_labels
    ADD CONSTRAINT task_labels_task_id_fkey
        FOREIGN KEY (task_id)
            REFERENCES tasks(id)
            ON DELETE CASCADE;