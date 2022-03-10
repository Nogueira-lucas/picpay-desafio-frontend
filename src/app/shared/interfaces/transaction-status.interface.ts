export enum BackgroundTemplateTypes { success = 'success', warning = 'warning', error = 'error'}

export enum TemplateIcons {
    success = 'check',
    warning = 'report',
    error = 'error'
}

export interface ITransactionTemplateMessage {
    type: BackgroundTemplateTypes;
    message: string;
    displayMessage: boolean;
}
