CREATE TABLE task_label (
    task_id uuid REFRENCES task(id),
    label_id uuid REFRENCES labels(id)
)