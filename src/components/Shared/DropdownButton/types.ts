export type DropdownButtonProps = {
  menuitems?: MenuItem[],
  bgcolor?: string;
  textcolor?: string;
  width?: string;
  height?: string;
  padding?: string;
  fontsize?: string
  borderradius?: string
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export class MenuItem {
  constructor(
    public value: string,
    public label: string
  ) { }
}