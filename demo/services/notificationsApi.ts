import { createActions } from '@prefecthq/vue-compositions'
import { MockedApi } from './MockedApi'
import { Notification } from '@/models/Notification'
import { NotificationFilter } from '@/models/NotificationFilter'
import { NotificationFormValues } from '@/models/NotificationFormValues'
import { mocker } from '@/services'

export class NotificationsApi extends MockedApi {
  public getNotification(id: string): Promise<Notification> {
    return this.promise(mocker.create('notification', [{ id: id }]))
  }

  public createNotification(notification: NotificationFormValues): Promise<Notification> {
    return this.promise(mocker.create('notification', [notification]))
  }

  public getNotifications(filter: NotificationFilter): Promise<Notification[]> {
    return this.promise(mocker.createMany('notification', mocker.create('number', [1, 10])))
  }

  public updateNotification(id: string, notification: NotificationFormValues): Promise<void> {
    return this.void()
  }

  public deleteNotification(id: string): Promise<void> {
    return this.void()
  }
}

export const notificationsApi = createActions(new NotificationsApi())