CREATE TABLE task_labels (
                             task_id uuid NOT NULL REFERENCES tasks(id),
                             label_id uuid NOT NULL REFERENCES labels(id),

                             PRIMARY KEY(task_id, label_id)
);
CREATE INDEX idx_task_labels_label_id
    ON task_labels(label_id);