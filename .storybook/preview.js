import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
setCompodocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
  backgrounds: {
    default: 'default',
    values: [
      {
        name: 'black',
        value: '#333',
      },
      {
        name: 'default',
        value: '#f1f1f1',
      },
    ],
  },
}