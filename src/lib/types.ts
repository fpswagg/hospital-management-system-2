export type ElementField =
    | {
          name: string;
          keyName: string;
          type: 'string' | 'phone' | 'email';
          defaultValue: string;
          required?: boolean;
          placeholder?: string;
      }
    | {
          name: string;
          keyName: string;
          type: 'number' | 'float';
          min?: number;
          max?: number;
          step?: number;
          defaultValue: number;
          required?: boolean;
          placeholder?: string;
      }
    | {
          name: string;
          keyName: string;
          type: 'date' | 'datetime' | 'time';
          min?: number;
          max?: number;
          defaultValue?: Date | string | number;
          required?: boolean;
          placeholder?: string;
      }
    | {
          name: string;
          keyName: string;
          type: 'choice';
          choices: string[];
          defaultValue?: string;
          required?: boolean;
          placeholder?: string;
      }
    | {
          name: string;
          keyName: string;
          type: 'check';
          defaultValue?: boolean;
      }
    | {
          name: string;
          keyName: string;
          type: 'entity';
          entity: string;
          labelField?: string;
          defaultValue?: boolean;
          required?: boolean;
          placeholder?: string;
      };
