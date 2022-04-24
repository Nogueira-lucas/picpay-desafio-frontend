export class ButtonConfig {
    label: string = 'Salvar';
    type?: string | ButtonType = ButtonType.Default;
}

enum ButtonType {
    Default = 'default',
    Primary = 'primary',
    Danger = 'default'
}