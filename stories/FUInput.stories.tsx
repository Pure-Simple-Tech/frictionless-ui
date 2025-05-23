import type { Meta, StoryObj } from "@storybook/react";
import { FUInput } from "../src/components/atomic/interactive/FUInput/FUInput";

const meta: Meta<typeof FUInput> = {
  title: "Atomic/Interactie/FuInput",
  component: FUInput,
};

export default meta;
type Story = StoryObj<typeof FUInput>;

export const Basic: Story = {
  args: {},
};
