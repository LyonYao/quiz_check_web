export interface Activity {
    id: string;
    name: string;
    start_time: string;
    end_time: string;
    status: string;
    location: string;
    description: string;
    fee: string;
    can_reg: boolean;
    can_check: boolean;
    can_preview_q:boolean;
  }