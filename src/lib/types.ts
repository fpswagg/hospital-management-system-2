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
          type: 'number';
          defaultValue: number;
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
      };
