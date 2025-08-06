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
