import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchNotificationsRequest,
  markAsReadRequest,
  markAllAsReadRequest,
} from '@/sagas/notifications/notificationSlice'

const useNotifications = () => {
  const dispatch = useDispatch()
  const { notifications, loading, actionLoading, pagination, filters } =
    useSelector((state) => state.notifications)

  const [isShowAll, setIsShowAll] = useState(true)

  const fetchNotifications = async (newFilters) => {
    await dispatch(fetchNotificationsRequest({ params: newFilters || filters }))
  }

  const handleFilterChange = (name, value) => {
    const newFilters = {
      ...filters,
      [name]: value || undefined,
      page: 1,
    }
    fetchNotifications(newFilters)
  }

  const handlePaginationChange = (page, pageSize) => {
    const newFilters = {
      ...filters,
      page,
      limit: pageSize,
    }
    fetchNotifications(newFilters)
  }

  const handleMarkAsRead = async (notificationId) => {
    await dispatch(markAsReadRequest({ notificationId }))
  }

  const handleMarkAllAsRead = async () => {
    await dispatch(markAllAsReadRequest())
  }

  const refreshNotifications = () => {
    fetchNotifications()
  }

  const handleToggleShowAll = () => {
    setIsShowAll((prev) => !prev)
  }

  const stats = useMemo(() => {
    return {
      total: notifications.length,
      unread: notifications.filter((n) => !n.isRead).length,
      newOrder: notifications.filter((n) => n.type === 'new_order').length,
      orderNewDish: notifications.filter((n) => n.type === 'order_new_dish')
        .length,
      paymentRequest: notifications.filter((n) => n.type === 'payment_request')
        .length,
      staffCall: notifications.filter((n) => n.type === 'staff_call').length,
    }
  }, [notifications])

  return {
    isShowAll,
    notifications,
    loading,
    actionLoading,
    pagination,
    stats,
    filters,
    fetchNotifications,
    handleFilterChange,
    handlePaginationChange,
    handleMarkAsRead,
    handleMarkAllAsRead,
    refreshNotifications,
    handleToggleShowAll,
  }
}

export default useNotifications
