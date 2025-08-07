

export interface Vehicle {
  id: string;
  registration: string;
  make: string;
  model: string;
  type: string;
  status: 'Compliant' | 'At Risk' | 'Non-Compliant';
  licenseExpiry: string;
  fines: number;
}

export interface OwnerStats {
  totalVehicles: number;
  compliantVehicles: number;
  totalFines: number;
  demeritPoints: number;
}

export interface Alert {
  id: string;
  vehicle: string;
  type: string;
  severity: 'High' | 'Medium' | 'Low';
  date: string;
  message: string;
}

export interface DriverProfile {
  name: string;
  initials: string;
  idStatus: 'Verified' | 'Pending' | 'Rejected';
  licenseStatus: 'Valid' | 'Expired' | 'Suspended';
  demeritPoints: number;
  outstandingFines: number;
  vehicles: string[];
  employmentStatus: string;
  lmsProgress: number;
  referralEarnings: number;
  complianceScore: number;
  qrCodeUrl: string;
}

export interface Appointment {
  id: string;
  date: Date;
  time: string;
  type: string;
  status: 'Confirmed' | 'Pending';
}

export interface Consultation {
    id: string;
    patientName: string;
    date: string;
    time: string;
    status: 'Upcoming' | 'Completed' | 'Cancelled';
}

export interface Document {
  id: string;
  name: string;
  status: 'Verified' | 'Expiring Soon' | 'Missing' | 'Expired' | 'Pending' | 'Flagged';
  expiryDate?: string;
  uploadDate?: string;
  details?: string;
  adminActions?: ('Approve' | 'Flag' | 'Suspend')[];
}
