export interface AllUserData {
  id: number;
  phone: null;
  email: string;
  username: string;
  secretName: string;
  password: string;
  orgName: null;
  orgInn: null;
  isActive: boolean;
  firstname: string;
  lastname: string;
  balance: number;
  isRegGoogle: null;
  type: null;
  status: string;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Role {
  id: number;
  name: string;
  createdAt: Date;
}

export interface NotificationMessage {
  id: string;
  userId: string;
  title: string;
  body: string;
  createdAt: string;
}

export interface FieldType {
  title: string,
  body: string,
  userId: string
}

export interface AllNotificationData {
  id:        number;
  title:     string;
  body:      string;
  userId:    number;
  createdAt: Date;
}