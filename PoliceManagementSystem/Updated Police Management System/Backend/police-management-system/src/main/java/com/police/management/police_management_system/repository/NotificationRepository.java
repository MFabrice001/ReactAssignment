package com.police.management.police_management_system.repository;

import com.police.management.police_management_system.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Retrieve unread notifications for a specific user
    List<Notification> findByUserIdAndIsReadFalse(Long userId);

    // Mark all notifications as read for a specific user
    @Modifying
    @Transactional
    @Query("UPDATE Notification n SET n.isRead = true WHERE n.isRead = false")
    void markAllAsRead();

    List<Notification> findByIsReadFalse();
}
