import { Meta, StoryObj } from "@storybook/react";

import Avatar from "./index";
import { AvatarProps } from "./types";

const meta: Meta<typeof Avatar> = {
  title: "Design System/Avatar",
  component: Avatar,
  argTypes: {
    onClick: { action: "clicked" },
    size: {
      type: "string",
    },
    src: {
      type: "string",
    },
    alt: {
      type: "string",
    },
    border: {
      type: "boolean",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {
  args: {} as AvatarProps,
};

export const ImageAvatar: Story = {
  args: {
    src: "https://img.freepik.com/fotos-gratis/foto-de-grande-angular-de-uma-unica-arvore-crescendo-sob-um-ceu-nublado-durante-um-por-do-sol-cercado-por-grama_181624-22807.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711411200&semt=ais",
    alt: "paisagem",
  } as AvatarProps,
};

export const HasOutlined: Story = {
  args: {
    border: true,
    src: "https://img.freepik.com/fotos-gratis/foto-de-grande-angular-de-uma-unica-arvore-crescendo-sob-um-ceu-nublado-durante-um-por-do-sol-cercado-por-grama_181624-22807.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711411200&semt=ais",
    alt: "paisagem",
  } as AvatarProps,
};
