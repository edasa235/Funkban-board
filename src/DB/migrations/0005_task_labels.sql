CREATE TABLE task_labels (
                             task_id UUID NOT NULL
                                 REFERENCES tasks(id)
                                 ON DELETE CASCADE,

                             label_id UUID NOT NULL
                                 REFERENCES labels(id)
                                 ON DELETE CASCADE,

                             PRIMARY KEY (task_id, label_id)
);