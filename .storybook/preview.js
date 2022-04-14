import { componentWrapperDecorator } from '@storybook/angular';
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

export const decorators = [
  componentWrapperDecorator((story) => `<div>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    ${story}
  </div>`),
];