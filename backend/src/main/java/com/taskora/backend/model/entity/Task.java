package com.taskora.backend.model.entity;

import jakarta.persistence.*;
import org.springframework.lang.NonNull;

/**
 * Сущность задачи в базе данных.
 */
@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

//* priority (Enum)
//* created_at / date (Date)
//* deadline / due date (Date)
//* status (Enum)
//* start_date (Date)
//* completed_at (Date)
//* duration in days (Long)
//* tags (???)
//* parent_task (Task)
//* sub_tasks (Task)
//* attachments (???)
//* reminders (???)

    protected Task() { }

    public Task(@NonNull String title, String description) {
        this.title = title;
        this.description = description;
    }


    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
