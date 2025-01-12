"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"

export function NotificationsDrawer() {
  const notifications = useStore((state) => state.notifications)
  const markNotificationAsRead = useStore((state) => state.markNotificationAsRead)
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            Stay updated with patient alerts and system notifications
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <p className="text-center text-muted-foreground">No notifications</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${
                    notification.read ? 'bg-muted/50' : 'bg-background'
                  }`}
                  onClick={() => !notification.read && markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{notification.title}</h4>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  {!notification.read && (
                    <Badge variant="secondary" className="mt-2">New</Badge>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

