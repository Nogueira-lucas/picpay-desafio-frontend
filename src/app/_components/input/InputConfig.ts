export class InputConfig {
    label: string;
    controlName: string;
    type: string | InputTypes = InputTypes.Text;
    placeholder?: string;
}

enum InputTypes {
    Text = "text",
    Password = "password"
}