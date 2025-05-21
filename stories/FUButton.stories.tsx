import type { Meta, StoryObj } from "@storybook/react";
import { FUButton } from "../src/components/atomic/interactive/FUButton/FUButton";

const meta: Meta<typeof FUButton> = {
  title: "Atomic/Interactie/Button",
  component: FUButton,
};

export default meta;
type Story = StoryObj<typeof FUButton>;

export const Basic: Story = {
  args: {},
};
