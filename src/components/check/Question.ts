
import { Option } from './Option';

export interface Question {
    id: string;
    content: string;
    options: Option[];
    type: 'S' | 'M';
    idx: number;
    result: string[];
    answer: string[];
}