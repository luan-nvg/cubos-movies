import { Meta, StoryObj } from "@storybook/react";
import DropdownButton from "./index";
import { DropdownButtonProps, MenuItem } from "./types";

const meta: Meta<typeof DropdownButton> = {
  title: "Design System/DropdownButton",
  component: DropdownButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DropdownButton>;

const menuitems: MenuItem[] = [
  { label: 'Opção 1', value: 'opcao1' },
  { label: 'Opção 2', value: 'opcao2' },
  { label: 'Opção 3', value: 'opcao3' },
]

export const Primary: Story = {
  args: {
    menuitems: menuitems,
    bgcolor: 'primary',
  } as DropdownButtonProps,
}